import React, { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { fetchModels } from '../../utils/openrouter';
import { AIModel } from '../../types';
import { useAppContext } from '../../context/AppContext';

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
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  useEffect(() => {
    const getModels = async () => {
      try {
        setIsLoading(true);
        const apiModels = await fetchModels();
        
        const transformedModels: AIModel[] = apiModels.map((model: any) => {
          // Controlla se il modello è gratuito dal pricing o se ha "free" nel nome
          const isFree = model.pricing?.hourly === 0 || 
                        (model.name && model.name.toLowerCase().includes('free')) ||
                        false;
          
          return {
            id: model.id,
            name: model.name,
            provider: model.provider,
            description: model.description || 'Nessuna descrizione disponibile',
            strengths: model.strengths || ['Modello AI per uso generale'],
            capabilities: model.capabilities || ['Generazione di testo'],
            free: isFree
          };
        });
        
        setModels(transformedModels);
        setFilteredModels(transformedModels);
      } catch (err) {
        setError('Impossibile caricare i modelli AI. Riprova più tardi.');
        console.error('Errore nel caricamento dei modelli:', err);
      } finally {
        setIsLoading(false);
      }
    };

    getModels();
  }, []);

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
            <div className="text-center text-red-500 py-6">{error}</div>
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
                    {model.free && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        Gratuito
                      </span>
                    )}
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
