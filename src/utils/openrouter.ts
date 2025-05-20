// Utility functions for interacting with OpenRouter API

// Elenco di modelli consigliati (non sostitutivi)
const RECOMMENDED_MODELS = [
  'openai/gpt-3.5-turbo',
  'anthropic/claude-instant-1.2',
  'google/gemini-pro',
  'mistralai/mistral-7b-instruct'
];

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
    const models = data.data || [];
    
    // Trasforma i modelli ma non filtrare - questo verrà fatto dall'interfaccia
    return models;
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
  const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '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';

  try {
    // Limitiamo la lunghezza del prompt per maggiore stabilità, ma manteniamo più contenuti
    const truncatedPrompt = prompt.length > 2000 ? prompt.substring(0, 2000) + "..." : prompt;
    
    console.log(`Generating response with model: ${modelId}`);
    
    const payload = {
      model: modelId,
      messages: [
        {
          role: 'system',
          content: 'Sei un esperto assistente di nutrizione e fitness. Rispondi in italiano con dettagli utili e pratici.'
        },
        {
          role: 'user',
          content: truncatedPrompt
        }
      ],
      temperature: 0.7,  // Valore originale
      max_tokens: 1200   // Aumentato per consentire piani più dettagliati
    };

    console.log('Sending request with payload', { model: modelId, promptLength: truncatedPrompt.length });
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'HTTP-Referer': window.location.href,
        'X-Title': 'BenessereNutri',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    console.log('API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error:', response.status, errorText);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response received successfully');
    
    return data.choices[0]?.message?.content || 'Non è stato possibile generare una risposta.';
  } catch (error) {
    console.error('Error generating AI response:', error);
    return 'Si è verificato un errore durante la generazione della risposta. Riprova con un altro modello o più tardi.';
  }
};

export const generateNutritionPlan = async (
  modelId: string,
  userProfile: any,
  seasonalFoods: any[]
): Promise<string> => {
  // Ripristino di un prompt più dettagliato ma non eccessivo
  const prompt = `
    Genera un piano nutrizionale personalizzato basato su queste informazioni:
    - Età: ${userProfile.age}
    - Livello di Attività: ${userProfile.activityLevel}
    - Restrizioni Alimentari: ${userProfile.dietaryRestrictions.join(', ') || 'Nessuna'}
    - Obiettivo Fitness: ${userProfile.fitnessGoal}
    
    Include questi alimenti stagionali nel piano:
    ${seasonalFoods.map(food => `- ${food.name}`).join('\n')}
    
    Crea un piano alimentare di 3 giorni con colazione, pranzo e cena.
    Includi una breve descrizione per ogni pasto.
    
    Formatta la risposta usando:
    # Piano Nutrizionale Personalizzato
    ## Giorno 1
    ### Colazione
    ### Pranzo
    ### Cena
    
    (Ripeti per ogni giorno)
  `;
  
  return generateAIResponse(modelId, prompt);
};

export const generateFitnessPlan = async (
  modelId: string,
  userProfile: any
): Promise<string> => {
  // Ripristino di un prompt più dettagliato ma non eccessivo
  const prompt = `
    Crea un piano fitness da fare a casa basato su queste informazioni:
    - Età: ${userProfile.age}
    - Livello di Attività: ${userProfile.activityLevel}
    - Obiettivo Fitness: ${userProfile.fitnessGoal}
    
    Fornisci un piano di allenamento di 3 giorni che includa:
    - Esercizi quotidiani (senza attrezzatura speciale)
    - Serie e ripetizioni suggerite
    - Una breve descrizione di come eseguire ogni esercizio correttamente
    
    Formatta la risposta usando:
    # Piano di Allenamento Personalizzato
    ## Giorno 1
    ### Riscaldamento
    ### Allenamento Principale
    ### Defaticamento
    
    (Ripeti per ogni giorno)
  `;
  
  return generateAIResponse(modelId, prompt);
};
