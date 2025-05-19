import React from 'react';
import { Link } from 'react-router-dom';
import { Apple, Dumbbell, Award, Sparkles } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import QRCodeDisplay from './QRCodeDisplay';

const HomePage: React.FC = () => {
  const { selectedModel, setIsModelSelectorOpen } = useAppContext();
  const isDesktop = window.innerWidth >= 768;

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 dark:text-white">Nutri 4.0</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Il tuo assistente AI per piani personalizzati di nutrizione e fitness.
        </p>
        
        {!selectedModel && (
          <button
            onClick={() => setIsModelSelectorOpen(true)}
            className="mt-6 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Scegli un Modello AI per Iniziare
          </button>
        )}
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/seasonal-foods" className="group">
          <div className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <Apple size={24} className="text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2 group-hover:text-emerald-600 transition-colors dark:text-white">Alimenti Stagionali</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Scopri alimenti stagionali nutrienti con informazioni dettagliate sui valori nutrizionali e benefici per la salute.
            </p>
          </div>
        </Link>
        
        <Link to="/nutrition-plan" className="group">
          <div className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
              <Award size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2 group-hover:text-emerald-600 transition-colors dark:text-white">Piano Nutrizionale</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Ottieni un piano alimentare personalizzato in base al tuo livello di attività, età e requisiti dietetici.
            </p>
          </div>
        </Link>
        
        <Link to="/fitness-plan" className="group">
          <div className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
              <Dumbbell size={24} className="text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2 group-hover:text-emerald-600 transition-colors dark:text-white">Piano Fitness</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Crea una routine di allenamento domestico personalizzata in base ai tuoi obiettivi di fitness e livello di attività.
            </p>
          </div>
        </Link>
      </section>
      
      <section className="bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-700 dark:to-teal-800 text-white rounded-xl p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">Guida alla Salute con AI</h2>
            <p className="mb-6">
              Nutri 4.0 utilizza modelli AI avanzati per fornire consigli personalizzati su nutrizione e fitness. 
              Scegli tra una gamma di modelli quello che meglio si adatta alle tue esigenze.
            </p>
            <button
              onClick={() => setIsModelSelectorOpen(true)}
              className="px-5 py-2 bg-white text-emerald-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <Sparkles size={18} className="mr-2" />
                {selectedModel ? 'Cambia Modello AI' : 'Seleziona Modello AI'}
              </div>
            </button>
          </div>
          
          {isDesktop && (
            <div className="md:w-1/3 flex justify-center">
              <QRCodeDisplay />
            </div>
          )}
        </div>
      </section>
      
      <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Come Funziona</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">1</span>
            </div>
            <h3 className="font-medium mb-2 dark:text-white">Scegli un Modello AI</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Seleziona tra vari modelli AI con diverse specialità e punti di forza.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">2</span>
            </div>
            <h3 className="font-medium mb-2 dark:text-white">Inserisci i Tuoi Dati</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Fornisci informazioni sulla tua età, livello di attività e obiettivi di salute.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">3</span>
            </div>
            <h3 className="font-medium mb-2 dark:text-white">Ottieni Piani Personalizzati</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Ricevi piani di nutrizione e fitness personalizzati in base alle tue esigenze specifiche.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
