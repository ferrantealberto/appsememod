// Utility functions for interacting with OpenRouter API
const OPENROUTER_API_KEY = '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';

export const fetchModels = async (): Promise<any[]> => {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': window.location.href,
        'X-Title': 'BenessereNutri',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch models: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
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
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
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
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Non è stato possibile generare una risposta.';
  } catch (error) {
    console.error('Error generating AI response:', error);
    return 'Si è verificato un errore. Riprova più tardi.';
  }
};

export const generateNutritionPlan = async (
  modelId: string,
  userProfile: any,
  seasonalFoods: any[]
): Promise<string> => {
  const prompt = `
    Genera un piano nutrizionale personalizzato basato su queste informazioni:
    - Età: ${userProfile.age}
    - Livello di Attività: ${userProfile.activityLevel}
    - Restrizioni Alimentari: ${userProfile.dietaryRestrictions.join(', ')}
    - Obiettivo Fitness: ${userProfile.fitnessGoal}
    
    Considera questi alimenti stagionali nel piano:
    ${seasonalFoods.map(food => `- ${food.name}`).join('\n')}
    
    Fornisci un piano alimentare di 7 giorni con colazione, pranzo, cena e spuntini.
    Includi i macronutrienti stimati per ogni giorno.
    
    Formatta la risposta in modo chiaro usando i seguenti titoli:
    # Piano Nutrizionale Personalizzato
    ## Giorno 1
    ### Colazione
    ### Pranzo
    ### Cena
    ### Spuntini
    ### Macronutrienti Giornalieri
    
    (Ripeti per ogni giorno della settimana)
  `;
  
  return generateAIResponse(modelId, prompt);
};

export const generateFitnessPlan = async (
  modelId: string,
  userProfile: any
): Promise<string> => {
  const prompt = `
    Crea un piano fitness da fare a casa basato su queste informazioni:
    - Età: ${userProfile.age}
    - Livello di Attività: ${userProfile.activityLevel}
    - Obiettivo Fitness: ${userProfile.fitnessGoal}
    
    Fornisci un piano di allenamento di 7 giorni che includa:
    - Esercizi quotidiani (senza attrezzatura speciale)
    - Periodi di riposo
    - Durata di ogni esercizio
    - Livello di difficoltà
    - Istruzioni per la corretta esecuzione
    
    Formatta la risposta in modo chiaro usando i seguenti titoli:
    # Piano di Allenamento Personalizzato
    ## Giorno 1
    ### Riscaldamento
    ### Allenamento Principale
    ### Defaticamento
    ### Note
    
    (Ripeti per ogni giorno della settimana)
  `;
  
  return generateAIResponse(modelId, prompt);
};
