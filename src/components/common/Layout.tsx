import React, { ReactNode, useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import ModelSelector from '../aiSelector/ModelSelector';
import Popup from './Popup';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDarkMode, setIsDarkMode, isModelSelectorOpen, setIsModelSelectorOpen } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const location = useLocation();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Alimenti Stagionali', path: '/seasonal-foods' },
    { name: 'Piano Nutrizionale', path: '/nutrition-plan' },
    { name: 'Piano Fitness', path: '/fitness-plan' },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <header className="bg-emerald-600 dark:bg-emerald-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link to="/" className="font-bold text-xl">Nutri 4.0</Link>
          </div>
          
          <div className="hidden md:flex space-x-6">
            {navigation.map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                className={`hover:text-emerald-200 transition-colors ${
                  location.pathname === item.path ? 'font-semibold' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full hover:bg-emerald-700 transition-colors"
              aria-label={isDarkMode ? 'Passa alla modalità chiara' : 'Passa alla modalità scura'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button
              onClick={() => setIsModelSelectorOpen(true)}
              className="hidden md:block bg-emerald-700 hover:bg-emerald-800 px-3 py-1.5 rounded-lg transition-colors"
            >
              Modelli AI
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="md:hidden px-4 py-3 bg-emerald-700 dark:bg-emerald-900">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path}
                  className="hover:text-emerald-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsModelSelectorOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="text-left hover:text-emerald-200"
              >
                Modelli AI
              </button>
            </div>
          </div>
        )}
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      
      <footer className="bg-emerald-600 dark:bg-emerald-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">© 2025 Nutri 4.0. Tutti i diritti riservati. - Powered by Ferrante Alberto</p>
            <div className="flex space-x-6">
              <button onClick={() => setIsPopupOpen(true)} className="hover:text-emerald-200 transition-colors">Privacy</button>
              <button onClick={() => setIsPopupOpen(true)} className="hover:text-emerald-200 transition-colors">Termini di Servizio</button>
              <button onClick={() => setIsPopupOpen(true)} className="hover:text-emerald-200 transition-colors">Contatti</button>
            </div>
          </div>
        </div>
      </footer>
      
      {isModelSelectorOpen && (
        <ModelSelector onClose={() => setIsModelSelectorOpen(false)} />
      )}

      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
};

export default Layout;
