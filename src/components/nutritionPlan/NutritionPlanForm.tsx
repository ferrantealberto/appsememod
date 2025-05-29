import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { ActivityLevel, FitnessGoal } from '../../types';
import { generateNutritionPlan } from '../../utils/openrouter';
import NutritionPlanDisplay from './NutritionPlanDisplay';

const NutritionPlanForm: React.FC = () => {
  const { selectedModel } = useAppContext();
  const [age, setAge] = useState<number>(30);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(ActivityLevel.ACTIVE);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [goal, setGoal] = useState<FitnessGoal>(FitnessGoal.GENERAL_FITNESS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [nutritionPlan, setNutritionPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [customRestriction, setCustomRestriction] = useState<string>('');

  const commonDietaryRestrictions = [
    'Vegetariano',
    'Vegano',
    'Senza Glutine',
    'Senza Lattosio',
    'Senza Frutta Secca',
    'Low-Carb',
    'Low-Fat'
  ];

  const toggleRestriction = (restriction: string) => {
    if (dietaryRestrictions.includes(restriction)) {
      setDietaryRestrictions(dietaryRestrictions.filter(r => r !== restriction));
    } else {
      setDietaryRestrictions([...dietaryRestrictions, restriction]);
    }
  };

  const handleAddCustomRestriction = () => {
    const trimmed = customRestriction.trim();
    if (trimmed && !dietaryRestrictions.includes(trimmed)) {
      setDietaryRestrictions([...dietaryRestrictions, trimmed]);
      setCustomRestriction('');
    }
  };

  const handleRemoveRestriction = (restriction: string) => {
    setDietaryRestrictions(dietaryRestrictions.filter(r => r !== restriction));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedModel) {
      setError('Seleziona prima un modello AI');
      return;
    }

    try {
      setIsGenerating(true);
      setError(null);

      const userProfile = {
        age,
        activityLevel,
        dietaryRestrictions,
        fitnessGoal: goal
      };

      const seasonalFoods = [
        { name: 'Spinaci' },
        { name: 'Cavolo' },
        { name: 'Mele' },
        { name: 'Carote' },
        { name: 'Quinoa' }
      ];

      const plan = await generateNutritionPlan(selectedModel.id, userProfile, seasonalFoods);
      setNutritionPlan(plan);
    } catch (err) {
      console.error('Errore nella generazione del piano nutrizionale:', err);
      setError('Impossibile generare il piano nutrizionale. Riprova più tardi.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (nutritionPlan) {
    return (
      <NutritionPlanDisplay
        plan={nutritionPlan}
        onReset={() => setNutritionPlan(null)}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Crea il Tuo Piano Nutrizionale Personalizzato</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg dark:bg-red-900 dark:text-red-300">
          {error}
        </div>
      )}

      {!selectedModel && (
        <div className="mb-4 p-3 bg-yellow-100 text-yellow-700 rounded-lg dark:bg-yellow-900 dark:text-yellow-300">
          Seleziona un modello AI dal menu Modelli AI prima di creare un piano nutrizionale.
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
            Restrizioni Alimentari
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {commonDietaryRestrictions.map((restriction) => (
              <div key={restriction} className="flex items-center">
                <input
                  type="checkbox"
                  id={`restriction-${restriction}`}
                  checked={dietaryRestrictions.includes(restriction)}
                  onChange={() => toggleRestriction(restriction)}
                  className="mr-2"
                />
                <label htmlFor={`restriction-${restriction}`} className="text-sm dark:text-gray-300">
                  {restriction}
                </label>
              </div>
            ))}
          </div>
          {/* Input per aggiunta manuale */}
          <div className="flex items-center mt-4 space-x-2">
            <input
              type="text"
              placeholder="Aggiungi alimento da escludere..."
              value={customRestriction}
              onChange={(e) => setCustomRestriction(e.target.value)}
              className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              type="button"
              className="py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              disabled={!customRestriction.trim()}
              onClick={handleAddCustomRestriction}
            >
              Aggiungi
            </button>
          </div>
          {/* Lista di tutte le restrizioni (predefinite o personalizzate) */}
          {dietaryRestrictions.length > 0 && (
            <div className="mt-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Restrizioni attuali:</span>
              <ul className="flex flex-wrap gap-2 mt-1">
                {dietaryRestrictions.map((restriction) => (
                  <li
                    key={restriction}
                    className="flex items-center bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm"
                  >
                    {restriction}
                    <button
                      type="button"
                      onClick={() => handleRemoveRestriction(restriction)}
                      className="ml-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      aria-label={`Rimuovi ${restriction}`}
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Obiettivo
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
              <p className="text-xs text-gray-500 dark:text-gray-400">Nutrizione bilanciata per la salute</p>
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
              <p className="text-xs text-gray-500 dark:text-gray-400">Deficit calorico con nutrizione adeguata</p>
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
              <p className="text-xs text-gray-500 dark:text-gray-400">Più proteine per lo sviluppo muscolare</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isGenerating || !selectedModel}
          className="w-full py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              Generazione...
            </span>
          ) : (
            'Genera Piano'
          )}
        </button>
      </form>
    </div>
  );
};

export default NutritionPlanForm;
