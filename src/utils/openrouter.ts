// Utility functions for interacting with OpenRouter API

export const fetchModels = async (): Promise<any[]> => {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY || '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'}`,
        'HTTP-Referer': window.location.href,
        'X-Title': 'BenessereNutri',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch models: ${response.status}`);
    }

    const data = await response.json();
    // Filtra solo modelli gratuiti
    const freeModels = (data.data || []).filter((model: any) => 
      model.pricing?.hourly === 0 || 
      (model.name && model.name.toLowerCase().includes('free'))
    );
    return freeModels;
  } catch (error) {
    console.error('Error fetching models:', error);
    return [];
  }
};

export const generateAIResponse = async (
  modelId: string, 
  prompt: string, 
  context: Record<string, any> = {}
): Promise<string> => {
  try {
    // Limitiamo la lunghezza del prompt per evitare errori
    const truncatedPrompt = prompt.length > 4000 ? prompt.substring(0, 4000) + "..." : prompt;
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY || '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'}`,
        'HTTP-Referer': window.location.href,
        'X-Title': 'BenessereNutri',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: modelId,
        messages: [
          {
            role: 'system',
            content: 'Sei un esperto assistente di nutrizione e fitness. Rispondi in italiano.'
          },
          {
            role: 'user',
            content: truncatedPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error Details:', errorData);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Non è stato possibile generare una risposta.';
  } catch (error) {
    console.error('Error generating AI response:', error);
    return 'Si è verificato un errore durante la generazione della risposta. Assicurati di selezionare un modello gratuito e riprova più tardi.';
  }
};

export const generateNutritionPlan = async (
  modelId: string,
  userProfile: any,
  seasonalFoods: any[]
): Promise<string> => {
  // Riduciamo la complessità del prompt
  const prompt = `
    Crea un piano nutrizionale semplice per 3 giorni considerando:
    - Età: ${userProfile.age}
    - Livello di Attività: ${userProfile.activityLevel}
    - Restrizioni: ${userProfile.dietaryRestrictions.join(', ') || 'Nessuna'}
    - Obiettivo: ${userProfile.fitnessGoal}
    
    Usa un formato semplice con:
    # Piano Nutrizionale
    ## Giorno 1
    ### Colazione
    ### Pranzo
    ### Cena
  `;
  
  return generateAIResponse(modelId, prompt);
};

export const generateFitnessPlan = async (
  modelId: string,
  userProfile: any
): Promise<string> => {
  // Riduciamo la complessità del prompt
  const prompt = `
    Crea un piano fitness semplice da casa per 3 giorni considerando:
    - Età: ${userProfile.age}
    - Livello di Attività: ${userProfile.activityLevel}
    - Obiettivo: ${userProfile.fitnessGoal}
    
    Usa un formato semplice con:
    # Piano Fitness
    ## Giorno 1
    ### Esercizi
    ### Note
  `;
  
  return generateAIResponse(modelId, prompt);
};
