import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { Food, FoodCategory, Season } from '../../types';
import { useAppContext } from '../../context/AppContext';
import FoodCard from './FoodCard';
import seasonalFoodsData from '../../data/seasonalFoods';

const SeasonalFoodsList: React.FC = () => {
  const { currentSeason, setCurrentSeason } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'all'>('all');
  const [foods, setFoods] = useState<Food[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // Filter foods based on season, search term, and category
    let filteredFoods = seasonalFoodsData.filter(
      food => food.season === currentSeason
    );

    if (searchTerm) {
      filteredFoods = filteredFoods.filter(
        food => food.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filteredFoods = filteredFoods.filter(
        food => food.category === selectedCategory
      );
    }

    setFoods(filteredFoods);
  }, [currentSeason, searchTerm, selectedCategory]);

  const seasonOptions = [
    { value: Season.SPRING, label: 'Primavera' },
    { value: Season.SUMMER, label: 'Estate' },
    { value: Season.FALL, label: 'Autunno' },
    { value: Season.WINTER, label: 'Inverno' },
  ];

  const categoryOptions = [
    { value: 'all', label: 'Tutte le Categorie' },
    { value: FoodCategory.FRUITS, label: 'Frutta' },
    { value: FoodCategory.VEGETABLES, label: 'Verdura' },
    { value: FoodCategory.GRAINS, label: 'Cereali' },
    { value: FoodCategory.PROTEINS, label: 'Proteine' },
    { value: FoodCategory.DAIRY, label: 'Latticini' },
    { value: FoodCategory.NUTS, label: 'Frutta Secca' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold dark:text-white">Alimenti Stagionali</h1>
        
        <div className="flex flex-wrap gap-2">
          <select
            value={currentSeason}
            onChange={(e) => setCurrentSeason(e.target.value as Season)}
            className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {seasonOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-1 px-3 py-2 border rounded-lg dark:border-gray-600 dark:text-white"
          >
            <Filter size={16} />
            Filtri
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Cerca alimenti..."
            className="w-full p-2 pl-10 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {isFilterOpen && (
          <div className="sm:max-w-xs">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as FoodCategory | 'all')}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {categoryOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {foods.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods.map(food => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">Nessun alimento trovato con i criteri selezionati.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="mt-2 text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Reimposta filtri
          </button>
        </div>
      )}
    </div>
  );
};

export default SeasonalFoodsList;