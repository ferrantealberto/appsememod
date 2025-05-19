import React, { useState } from 'react';
import { Food } from '../../types';
import { Info } from 'lucide-react';

interface FoodCardProps {
  food: Food;
}

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Default image if none is provided
  const imageUrl = food.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg';

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      fruits: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      vegetables: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      grains: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
      proteins: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      dairy: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
      nuts: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    };
    
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={food.name} 
          className="w-full h-full object-cover"
        />
        <span className={`absolute top-2 right-2 text-xs font-medium px-2.5 py-0.5 rounded ${getCategoryColor(food.category)}`}>
          {food.category}
        </span>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 dark:text-white">{food.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{food.description}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-2">
            <span className="text-sm bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded dark:bg-emerald-900 dark:text-emerald-300">
              {food.nutrition.calories} cal
            </span>
          </div>
          
          <button
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            className="flex items-center text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            <Info size={16} className="mr-1" />
            {isDetailsOpen ? 'Less info' : 'More info'}
          </button>
        </div>
      </div>
      
      {isDetailsOpen && (
        <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <h4 className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Protein</h4>
              <p className="font-medium dark:text-white">{food.nutrition.protein}g</p>
            </div>
            <div>
              <h4 className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Carbs</h4>
              <p className="font-medium dark:text-white">{food.nutrition.carbs}g</p>
            </div>
            <div>
              <h4 className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Fat</h4>
              <p className="font-medium dark:text-white">{food.nutrition.fat}g</p>
            </div>
            <div>
              <h4 className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Fiber</h4>
              <p className="font-medium dark:text-white">{food.nutrition.fiber}g</p>
            </div>
          </div>
          
          <h4 className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400 mb-1">Health Benefits</h4>
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
            {food.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FoodCard;