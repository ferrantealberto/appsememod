import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { ActivityLevel, FitnessGoal } from '../../types';
import { generateFitnessPlan } from '../../utils/openrouter';
import FitnessPlanDisplay from './FitnessPlanDisplay';

const FitnessPlanForm: React.FC = () => {
  const { selectedModel } = useAppContext();
  const [age, setAge] = useState<number>(30);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(ActivityLevel.ACTIVE);
  const [goal, setGoal] = useState<FitnessGoal>(FitnessGoal.GENERAL_FITNESS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [fitnessPlan, setFitnessPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedModel) {
      setError('Seleziona prima un modello AI');
      return;
    }

    // Verifica che il modello selezionato sia gratuito
    if (!selectedModel.free) {
      setError('È possibile generare piani solo con modelli gratuiti. Seleziona un modello gratuito.');
      return;
    }

    try {
      setIsGenerating(true);
      setError(null);
      
      const userProfile = {
        age,
        activityLevel,
        fitnessGoal: goal
      };
      
      const plan = await generateFitnessPlan(selectedModel.id, userProfile);
      
      if (plan.includes('Si è verificato un errore')) {
        throw new Error('Errore API');
      }
      
      setFitnessPlan(plan);
    } catch (err) {
      console.error('Errore nella generazione del piano fitness:', err);
      setError('Impossibile generare il piano fitness. Assicurati di utilizzare un modello gratuito e riprova più tardi.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (fitnessPlan) {
    return (
      <FitnessPlanDisplay 
        plan={fitnessPlan} 
        onReset={() => setFitnessPlan(null)} 
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Crea il Tuo Piano Fitness</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg dark:bg-red-900 dark:text-red-300">
          {error}
        </div>
      )}
      
      {!selectedModel && (
        <div className="mb-4 p-3 bg-yellow-100 text-yellow-700 rounded-lg dark:bg-yellow-900 dark:text-yellow-300">
          Seleziona un modello AI dal menu Modelli AI prima di creare un piano fitness.
        </div>
      )}
      
      {selectedModel && !selectedModel.free && (
        <div className="mb-4 p-3 bg-yellow-100 text-yellow-700 rounded-lg dark:bg-yellow-900 dark:text-yellow-300">
          Solo i modelli gratuiti possono essere utilizzati. Seleziona un modello gratuito.
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Età
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            min="1"
            max="120"
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Livello di Attività
          </label>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          >
            <option value={ActivityLevel.SEDENTARY}>Sedentario (poco o nessun esercizio)</option>
            <option value={ActivityLevel.LIGHTLY_ACTIVE}>Leggermente Attivo (esercizio leggero 1-3 giorni/settimana)</option>
            <option value={ActivityLevel.ACTIVE}>Attivo (esercizio moderato 3-5 giorni/settimana)</option>
            <option value={ActivityLevel.VERY_ACTIVE}>Molto Attivo (esercizio intenso 6-7 giorni/settimana)</option>
            <option value={ActivityLevel.ATHLETE}>Atleta (allenamento 2x/giorno)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Obiettivo Fitness
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div 
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                goal === FitnessGoal.GENERAL_FITNESS 
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
              onClick={() => setGoal(FitnessGoal.GENERAL_FITNESS)}
            >
              <h3 className="font-medium dark:text-white">Benessere Generale</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Salute e mobilità generale</p>
            </div>
            
            <div 
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                goal === FitnessGoal.WEIGHT_LOSS 
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
              onClick={() => setGoal(FitnessGoal.WEIGHT_LOSS)}
            >
              <h3 className="font-medium dark:text-white">Perdita Peso</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Bruciare calorie e perdere grasso</p>
            </div>
            
            <div 
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                goal === FitnessGoal.STRENGTH 
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
              onClick={() => setGoal(FitnessGoal.STRENGTH)}
            >
              <h3 className="font-medium dark:text-white">Forza</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Sviluppo muscolare e forza</p>
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isGenerating || !selectedModel || !selectedModel.free}
          className="w-full py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generazione Piano in Corso...
            </span>
          ) : (
            'Genera Piano Fitness'
          )}
        </button>
      </form>
    </div>
  );
};

export default FitnessPlanForm;
