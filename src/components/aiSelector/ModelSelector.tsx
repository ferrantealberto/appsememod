import React, { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { fetchModels } from '../../utils/openrouter';
import { AIModel } from '../../types';
import { useAppContext } from '../../context/AppContext';

interface ModelSelectorProps {
  onClose: () => void;
}

// Modello di fallback predefinito (Anthropic Claude 3 Haiku)
const DEFAULT_MODEL: AIModel = {
  id: 'anthropic/claude-3-haiku-20240307',
  name: 'Claude 3 Haiku',
  provider: 'Anthropic',
  description: 'Un modello veloce e affidabile per assistenza nutrizionale e fitness, ottimizzato per l\'utilizzo in questa app.',
  strengths: ['Veloce', 'Affidabile', 'Specializzato in nutrizione e fitness'],
  capabilities: ['Generazione di testo', 'Piani personalizzati'],
  free: true
};

// Lista di ID di modelli noti per essere gratuiti
const KNOWN_FREE_MODELS = [
  'anthropic/claude-3-haiku-20240307',
  'anthropic/claude-instant-1.2',
  'google/gemini-pro',
  'mistralai/mistral-7b-instruct'
];

const ModelSelector: React.FC<ModelSelectorProps> = ({ onClose }) => {
  const { selectedModel, setSelectedModel } = useAppContext();
  const [models, setModels] = useState<AIModel[]>([]);
  const [filteredModels, setFilteredModels] = useState<AIModel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFreeOnly, setShowFreeOnly] = useState(true); // Inizia mostrando solo i modelli gratuiti

  useEffect(() => {
    // Se non c'è un modello selezionato, imposta il modello predefinito
    if (!selectedModel) {
      setSelectedModel(DEFAULT_MODEL);
    }
    
    const getModels = async () => {
      try {
        setIsLoading(true);
        const apiModels = await fetchModels();
        
        if (apiModels.length === 0) {
          // Se non ci sono modelli dall'API, usa almeno il modello predefinito
          const fallbackModels = [DEFAULT_MODEL];
          setModels(fallbackModels);
          setFilteredModels(fallbackModels);
          return;
        }
        
        const transformedModels: AIModel[] = apiModels.map((model: any) => {
          // Miglioramento della logica per determinare se un modello è gratuito
          const isFree = 
            (model.pricing?.input === 0 && model.pricing?.output === 0) || 
            (model.pricing?.hourly === 0) ||
            model.id.toLowerCase().includes('free') ||
            KNOWN_FREE_MODELS.includes(model.id);
          
          return {
            id: model.id,
            name: model.name || model.id.split('/').pop(),
            provider: model.provider || model.id.split('/')[0],
            description: model.description || 'Modello AI disponibile tramite OpenRouter.',
            strengths: model.strengths || ['Modello AI per uso generale'],
            capabilities: model.capabilities || ['Generazione di testo'],
            free: isFree
          };
        });
        
        // Aggiungi il modello predefinito se non è già presente
        if (!transformedModels.some(m => m.id === DEFAULT_MODEL.id)) {
          transformedModels.push(DEFAULT_MODEL);
        }
        
        // Aggiungi un log per debug
        console.log('Modelli disponibili:', transformedModels);
        console.log('Modelli gratuiti:', transformedModels.filter(m => m.free));
        
        setModels(transformedModels);
        // Applica immediatamente il filtro per i modelli gratuiti
        const freeModels = showFreeOnly 
          ? transformedModels.filter(model => model.free)
          : transformedModels;
        setFilteredModels(freeModels);
      } catch (err) {
        console.error('Errore nel caricamento dei modelli:', err);
        setError('Impossibile caricare i modelli AI. Utilizzando un modello predefinito.');
        // In caso di errore, usa almeno il modello predefinito
        const fallbackModels = [DEFAULT_MODEL];
        setModels(fallbackModels);
        setFilteredModels(fallbackModels);
      } finally {
        setIsLoading(false);
      }
    };

    getModels();
  }, [showFreeOnly, setSelectedModel, selectedModel]);

  useEffect(() => {
    let result = models;
    
    if (searchQuery) {
      result = models.filter(model => 
        (model.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
        (model.provider || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (showFreeOnly) {
      result = result.filter(model => model.free);
    }
    
    // Se non ci sono risultati, mostra almeno il modello predefinito
    if (result.length === 0 && showFreeOnly) {
      result = [DEFAULT_MODEL];
    }
    
    setFilteredModels(result);
  }, [searchQuery, showFreeOnly, models]);

  const handleSelectModel = (model: AIModel) => {
    setSelectedModel(model);
    onClose();
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
          <div className="mt-2 flex items-center">
            <input
              type="checkbox"
              id="free-only"
              checked={showFreeOnly}
              onChange={() => setShowFreeOnly(!showFreeOnly)}
              className="mr-2"
            />
            <label htmlFor="free-only" className="text-sm dark:text-gray-300">Mostra solo modelli gratuiti</label>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[60vh] p-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-6">
              <p className="text-red-500 mb-4">{error}</p>
              <div className="border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500"
                   onClick={() => handleSelectModel(DEFAULT_MODEL)}>
                <h3 className="font-medium dark:text-white">{DEFAULT_MODEL.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{DEFAULT_MODEL.provider}</p>
                <span className="mt-2 inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                  Modello predefinito
                </span>
              </div>
            </div>
          ) : filteredModels.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-6">
              Nessun modello trovato con i criteri selezionati
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredModels.map((model) => (
                <div 
                  key={model.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedModel?.id === model.id 
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                  onClick={() => handleSelectModel(model)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium dark:text-white">{model.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{model.provider}</p>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      {model.free && (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                          Gratuito
                        </span>
                      )}
                      {model.id === DEFAULT_MODEL.id && (
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                          Consigliato
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{model.description}</p>
                  
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
            {filteredModels.length} modelli disponibili
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
