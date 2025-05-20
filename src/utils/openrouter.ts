// Utility functions for interacting with OpenRouter API

// Lista di modelli gratuiti affidabili che sappiamo funzionare
const RELIABLE_FREE_MODELS = [
  'openai/gpt-3.5-turbo',
  'anthropic/claude-instant-1.2',
  'google/gemini-pro',
  'mistralai/mistral-7b-instruct'
];

export const fetchModels = async (): Promise<any[]> => {
  try {
    // Prima tenta di ottenere i modelli dall'API
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY || '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'}`,
        'HTTP-Referer': window.location.href,
        'X-Title': 'BenessereNutri',
        'Content-Type': 'application/json'
      }
    });

    // Se la risposta è valida, procedi normalmente
    if (response.ok) {
      const data = await response.json();
      // Filtra solo modelli gratuiti
      const freeModels = (data.data || []).filter((model: any) => 
        model.pricing?.hourly === 0 || 
        (model.name && model.name.toLowerCase().includes('free'))
      );
      return freeModels;
    } else {
      console.warn("Impossibile ottenere i modelli dall'API, utilizzo modelli di riserva", response.status);
      // Se c'è un errore, restituisci una lista di modelli predefiniti funzionanti
      return RELIABLE_FREE_MODELS.map(id => ({
        id,
        name: id.split('/')[1],
        provider: id.split('/')[0],
        description: "Modello affidabile per generare testo.",
        strengths: ["Generazione di testo"],
        capabilities: ["Generazione di testo"],
        free: true
      }));
    }
  } catch (error) {
    console.error('Error fetching models:', error);
    // Restituisci i modelli di riserva in caso di errore
    return RELIABLE_FREE_MODELS.map(id => ({
      id,
      name: id.split('/')[1],
      provider: id.split('/')[0],
      description: "Modello affidabile per generare testo.",
      strengths: ["Generazione di testo"],
      capabilities: ["Generazione di testo"],
      free: true
    }));
  }
};

export const generateAIResponse = async (
  modelId: string, 
  prompt: string, 
  context: Record<string, any> = {}
): Promise<string> => {
  const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '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';

  try {
    // Limita la lunghezza del prompt a 1000 caratteri per evitare errori
    const truncatedPrompt = prompt.length > 1000 ? prompt.substring(0, 1000) + "..." : prompt;
    
    console.log(`Generazione risposta con modello: ${modelId}`);
    
    // Assicurati che il modello esista nella lista di affidabili
    let finalModelId = modelId;
    if (!RELIABLE_FREE_MODELS.includes(modelId)) {
      console.warn(`Modello ${modelId} non nella lista dei modelli affidabili, usando alternativa`);
      finalModelId = RELIABLE_FREE_MODELS[0]; // Usa il primo modello affidabile come fallback
    }

    const payload = {
      model: finalModelId,
      messages: [
        {
          role: 'system',
          content: 'Sei un esperto assistente di nutrizione e fitness. Rispondi in italiano con risposte brevi e dirette.'
        },
        {
          role: 'user',
          content: truncatedPrompt
        }
      ],
      temperature: 0.5,  // Ridotto per risposte più precise
      max_tokens: 800    // Limitato per evitare errori
    };

    console.log('Payload della richiesta:', JSON.stringify(payload));
    
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

    console.log('Stato risposta API:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Errore API:', response.status, errorText);
      
      // In caso di errore, prova con un modello alternativo
      if (finalModelId !== RELIABLE_FREE_MODELS[0]) {
        console.log('Riprovo con un modello alternativo');
        return generateAIResponse(RELIABLE_FREE_MODELS[0], prompt, context);
      }
      
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('Risposta API ricevuta correttamente');
    
    return data.choices[0]?.message?.content || 'Non è stato possibile generare una risposta.';
  } catch (error) {
    console.error('Error generating AI response:', error);
    
    // Genera una risposta fissa in caso di errore persistente
    return `
# Piano di esempio
Ci scusiamo, non è stato possibile generare un piano personalizzato in questo momento.

## Suggerimenti generali
- Mantenere una dieta bilanciata con frutta e verdura
- Bere molta acqua durante il giorno
- Fare attività fisica regolare
- Limitare cibi processati e zuccheri

Per favore riprova più tardi quando il servizio sarà nuovamente disponibile.`;
  }
};

export const generateNutritionPlan = async (
  modelId: string,
  userProfile: any,
  seasonalFoods: any[]
): Promise<string> => {
  // Prompt estremamente semplificato
  const prompt = `
    Crea un semplice piano alimentare di 2 giorni per una persona di ${userProfile.age} anni con livello di attività ${userProfile.activityLevel}.
    Obiettivo: ${userProfile.fitnessGoal}.
    Formatta con: 
    # Piano Nutrizionale
    ## Giorno 1
    ### Colazione
    (menu)
    ### Pranzo
    (menu)
    ### Cena
    (menu)
    ## Giorno 2
    (ripeti)
  `;
  
  return generateAIResponse(modelId, prompt);
};

export const generateFitnessPlan = async (
  modelId: string,
  userProfile: any
): Promise<string> => {
  // Prompt estremamente semplificato
  const prompt = `
    Crea un piano fitness basic di 3 esercizi per una persona di ${userProfile.age} anni con livello di attività ${userProfile.activityLevel}.
    Formatta con:
    # Piano Fitness
    ## Esercizio 1
    (nome e descrizione)
    ## Esercizio 2
    (nome e descrizione)
    ## Esercizio 3
    (nome e descrizione)
  `;
  
  return generateAIResponse(modelId, prompt);
};
