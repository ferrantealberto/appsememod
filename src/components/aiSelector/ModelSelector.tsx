import React, { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { fetchModels } from '../../utils/openrouter';
import { AIModel } from '../../types';
import { useAppContext } from '../../context/AppContext';

// Lista di modelli affidabili che sappiamo funzionare
const RELIABLE_FREE_MODELS = [
  'openai/gpt-3.5-turbo',
  'anthropic/claude-instant-1.2',
  'google/gemini-pro',
  'mistralai/mistral-7b-instruct'
];

interface ModelSelectorProps {
  onClose: () => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ onClose }) => {
  const { selectedModel, setSelectedModel } = useAppContext();
  const [models, setModels] = useState<AIModel[]>([]);
  const [filteredModels, setFilteredModels] = useState<AIModel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFreeOnly, setShowFreeOnly] = useState(true); // Impostato a true di default

  useEffect(() => {
    const getModels = async () => {
      try {
        setIsLoading(true);
        const apiModels = await fetchModels();
        
        // Assicuriamoci che almeno i modelli affidabili siano sempre presenti
        const reliableModels = RELIABLE_FREE_MODELS.map(id => ({
          id,
          name: id.split('/')[1],
          provider: id.split('/')[0],
          description: "Modello affidabile per generare testo.",
          strengths: ["Generazione di testo"],
          capabilities: ["Generazione di testo"],
          free: true
        }));
        
        // Combina i modelli dall'API con quelli affidabili, evitando duplicati
        const apiModelIds = apiModels.map((m: any) => m.id);
        const uniqueReliableModels = reliableModels.filter(m => !apiModelIds.includes(m.id));
        
        const allModels = [...apiModels, ...uniqueReliableModels];
        
        setModels(allModels);
        setFilteredModels(allModels.filter(model => model.free));
        
        // Se non c'è un modello selezionato, seleziona il primo modello affidabile
        if (!selectedModel) {
          const defaultModel = allModels.find(m => m.id === RELIABLE_FREE_MODELS[0]);
          if (defaultModel) {
            setSelectedModel(defaultModel);
          }
        }
      } catch (err) {
        console.error('Errore nel caricamento dei modelli:', err);
        
        // In caso di errore, carica almeno i modelli affidabili
        const fallbackModels = RELIABLE_FREE_MODELS.map(id => ({
          id,
          name: id.split('/')[1],
          provider: id.split('/')[0],
          description: "Modello affidabile per generare testo.",
          strengths: ["Generazione di testo"],
          capabilities: ["Generazione di testo"],
          free: true
        }));
        
        setModels(fallbackModels);
        setFilteredModels(fallbackModels);
        
        // Se non c'è un modello selezionato, seleziona il primo modello affidabile
        if (!selectedModel) {
          setSelectedModel(fallbackModels[0]);
        }
        
        setError('Impossibile caricare tutti i modelli AI. Vengono mostrati solo i modelli predefiniti.');
      } finally {
        setIsLoading(false);
      }
    };

    getModels();
  }, [selectedModel, setSelectedModel]);

  useEffect(() => {
    let result = models;
    
    if (searchQuery) {
      result = models.filter(model => 
        (model.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
        (model.provider || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Mostra sempre e solo modelli gratuiti
    result = result.filter(model => model.free);
    
    // Evidenzia modelli affidabili mettendoli in cima
    result.sort((a, b) => {
      const aIsReliable = RELIABLE_FREE_MODELS.includes(a.id);
      const bIsReliable = RELIABLE_FREE_MODELS.includes(b.id);
      
      if (aIsReliable && !bIsReliable) return -1;
      if (!aIsReliable && bIsReliable) return 1;
      return 0;
    });
    
    setFilteredModels(result);
  }, [searchQuery, models]);

  const handleSelectModel = (model: AIModel) => {
    setSelectedModel(model);
    onClose();
  };

  const isReliableModel = (modelId: string) => {
    return RELIABLE_FREE_MODELS.includes(modelId);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-xl">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold dark:text-white">Seleziona Modello AI</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Chiudi"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4 border-b dark:border-gray-700">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cerca modelli..."
              className="w-full p-2 pl-10 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
              Vengono mostrati solo modelli gratuiti
            </p>
            {error && (
              <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="overflow-y-auto max-h-[60vh] p-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
          ) : filteredModels.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-6">
              Nessun modello gratuito trovato. Riprova più tardi.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredModels.map((model) => (
                <div 
                  key={model.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedModel?.id === model.id 
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' 
                      : isReliableModel(model.id)
                        ? 'border-blue-200 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-800'
                        : 'border-gray-200 dark:border-gray-700'
                  }`}
                  onClick={() => handleSelectModel(model)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium dark:text-white">{model.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{model.provider}</p>
                    </div>
                    <div className="flex gap-1">
                      {isReliableModel(model.id) && (
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                          Consigliato
                        </span>
                      )}
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        Gratuito
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{model.description}</p>
                  
                  {isReliableModel(model.id) && (
                    <div className="mt-2">
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        Questo modello è stato testato e funziona bene con l'applicazione.
                      </p>
                    </div>
                  )}
                  
                  {model.strengths?.length > 0 && (
                    <div className="mt-3">
                      <h4 className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Punti di Forza</h4>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {model.strengths.map((strength, index) => (
                          <span 
                            key={index} 
                            className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
                          >
                            {strength}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t flex justify-between items-center dark:border-gray-700">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filteredModels.length} modelli gratuiti disponibili
          </span>
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white"
            >
              Annulla
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50"
              disabled={!selectedModel}
            >
              {selectedModel ? 'Conferma Selezione' : 'Seleziona un Modello'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelSelector;
