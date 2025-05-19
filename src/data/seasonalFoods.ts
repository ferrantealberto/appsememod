import { Food, FoodCategory, Season } from '../types';

const seasonalFoods: Food[] = [
  // Alimenti Primaverili
  {
    id: '1',
    name: 'Asparagi',
    season: Season.SPRING,
    category: FoodCategory.VEGETABLES,
    description: 'Gli asparagi primaverili sono ricchi di fibre e vitamine A, C, E e K, con un alto valore nutrizionale.',
    benefits: ['Supporta la salute digestiva', 'Ricco di antiossidanti', 'Proprietà anti-infiammatorie'],
    nutrition: {
      calories: 20,
      protein: 2.2,
      carbs: 3.9,
      fat: 0.1,
      fiber: 2.1,
      vitamins: { A: 15, C: 12, K: 70 },
      minerals: { potassium: 6, folate: 17 }
    },
    image: 'https://images.pexels.com/photos/351679/pexels-photo-351679.jpeg'
  },
  {
    id: '2',
    name: 'Spinaci',
    season: Season.SPRING,
    category: FoodCategory.VEGETABLES,
    description: 'Gli spinaci freschi primaverili sono ricchi di ferro, calcio e vitamine che supportano la salute generale.',
    benefits: ['Migliora la salute degli occhi', 'Riduce lo stress ossidativo', 'Supporta la salute delle ossa'],
    nutrition: {
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fat: 0.4,
      fiber: 2.2,
      vitamins: { A: 120, C: 28, K: 604 },
      minerals: { iron: 15, calcium: 10 }
    },
    image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg'
  },
  {
    id: '3',
    name: 'Fragole',
    season: Season.SPRING,
    category: FoodCategory.FRUITS,
    description: 'Le dolci fragole primaverili sono ricche di vitamina C e antiossidanti che supportano il sistema immunitario.',
    benefits: ['Rafforza il sistema immunitario', 'Promuove la salute del cuore', 'Regola la glicemia'],
    nutrition: {
      calories: 32,
      protein: 0.7,
      carbs: 7.7,
      fat: 0.3,
      fiber: 2.0,
      vitamins: { C: 97 },
      minerals: { manganese: 19 }
    },
    image: 'https://images.pexels.com/photos/934066/pexels-photo-934066.jpeg'
  },
  {
    id: '4',
    name: 'Piselli',
    season: Season.SPRING,
    category: FoodCategory.VEGETABLES,
    description: 'I piselli primaverili sono una buona fonte di proteine vegetali, fibre e vari micronutrienti.',
    benefits: ['Supporta la salute digestiva', 'Ottima fonte di proteine vegetali', 'Nutrienti per la salute del cuore'],
    nutrition: {
      calories: 81,
      protein: 5.4,
      carbs: 14.5,
      fat: 0.4,
      fiber: 5.1,
      vitamins: { A: 23, C: 40, K: 24 },
      minerals: { iron: 12, magnesium: 11 }
    },
    image: 'https://images.pexels.com/photos/255469/pexels-photo-255469.jpeg'
  },
  {
    id: '5',
    name: 'Ravanelli',
    season: Season.SPRING,
    category: FoodCategory.VEGETABLES,
    description: 'I ravanelli croccanti primaverili contengono composti che supportano la funzione epatica e la digestione.',
    benefits: ['Supporta la salute del fegato', 'Aiuta la digestione', 'Naturale detossificante'],
    nutrition: {
      calories: 16,
      protein: 0.7,
      carbs: 3.4,
      fat: 0.1,
      fiber: 1.6,
      vitamins: { C: 22 },
      minerals: { potassium: 7 }
    },
    image: 'https://images.pexels.com/photos/1257075/pexels-photo-1257075.jpeg'
  },
  
  // Alimenti Estivi
  {
    id: '6',
    name: 'Pomodori',
    season: Season.SUMMER,
    category: FoodCategory.VEGETABLES,
    description: 'I pomodori estivi sono ricchi di licopene, un antiossidante che può ridurre il rischio di malattie cardiache e alcuni tipi di cancro.',
    benefits: ['Ricco di antiossidanti', 'Benefico per il cuore', 'Supporta la salute della pelle'],
    nutrition: {
      calories: 18,
      protein: 0.9,
      carbs: 3.9,
      fat: 0.2,
      fiber: 1.2,
      vitamins: { A: 17, C: 21, K: 10 },
      minerals: { potassium: 7 }
    },
    image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg'
  },
  {
    id: '7',
    name: 'Cetrioli',
    season: Season.SUMMER,
    category: FoodCategory.VEGETABLES,
    description: 'I cetrioli estivi rinfrescanti sono idratanti e contengono composti che possono ridurre l\'infiammazione.',
    benefits: ['Idratante', 'Anti-infiammatorio', 'Supporta la salute della pelle'],
    nutrition: {
      calories: 15,
      protein: 0.6,
      carbs: 3.6,
      fat: 0.1,
      fiber: 0.5,
      vitamins: { K: 16 },
      minerals: { potassium: 4 }
    },
    image: 'https://images.pexels.com/photos/3568039/pexels-photo-3568039.jpeg'
  },
  {
    id: '8',
    name: 'Anguria',
    season: Season.SUMMER,
    category: FoodCategory.FRUITS,
    description: 'L\'anguria dolce estiva è idratante e ricca di licopene, che può favorire la salute del cuore.',
    benefits: ['Idratante', 'Anti-infiammatoria', 'Ricca di antiossidanti'],
    nutrition: {
      calories: 30,
      protein: 0.6,
      carbs: 7.6,
      fat: 0.2,
      fiber: 0.4,
      vitamins: { A: 11, C: 13 },
      minerals: { potassium: 4 }
    },
    image: 'https://images.pexels.com/photos/1313267/pexels-photo-1313267.jpeg'
  },
  {
    id: '9',
    name: 'Mais',
    season: Season.SUMMER,
    category: FoodCategory.VEGETABLES,
    description: 'Il mais dolce estivo contiene fibre, vitamine e minerali che supportano la salute degli occhi e la digestione.',
    benefits: ['Supporta la salute degli occhi', 'Ricco di antiossidanti', 'Buona fonte di fibre'],
    nutrition: {
      calories: 86,
      protein: 3.2,
      carbs: 19.0,
      fat: 1.2,
      fiber: 2.7,
      vitamins: { B1: 15, B5: 10 },
      minerals: { magnesium: 10 }
    },
    image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg'
  },
  {
    id: '10',
    name: 'Zucchine',
    season: Season.SUMMER,
    category: FoodCategory.VEGETABLES,
    description: 'Le zucchine estive sono povere di calorie ma ricche di vitamine, minerali e antiossidanti.',
    benefits: ['Nutrienti per il cuore', 'Supporta la vista', 'Aiuta il controllo del peso'],
    nutrition: {
      calories: 17,
      protein: 1.2,
      carbs: 3.1,
      fat: 0.3,
      fiber: 1.0,
      vitamins: { A: 4, C: 29, B6: 10 },
      minerals: { potassium: 8, manganese: 10 }
    },
    image: 'https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg'
  },
  
  // Alimenti Autunnali
  {
    id: '11',
    name: 'Zucca',
    season: Season.FALL,
    category: FoodCategory.VEGETABLES,
    description: 'La zucca autunnale è ricca di beta-carotene, che supporta la funzione immunitaria e la salute degli occhi.',
    benefits: ['Supporta la salute degli occhi', 'Rafforza il sistema immunitario', 'Ricca di antiossidanti'],
    nutrition: {
      calories: 26,
      protein: 1.0,
      carbs: 6.5,
      fat: 0.1,
      fiber: 0.5,
      vitamins: { A: 170, C: 10, E: 6 },
      minerals: { potassium: 7 }
    },
    image: 'https://images.pexels.com/photos/5422857/pexels-photo-5422857.jpeg'
  },
  {
    id: '12',
    name: 'Mele',
    season: Season.FALL,
    category: FoodCategory.FRUITS,
    description: 'Le mele autunnali sono ricche di fibre e antiossidanti che possono ridurre il rischio di malattie croniche.',
    benefits: ['Benefiche per il cuore', 'Supporta la salute digestiva', 'Può ridurre il rischio di diabete'],
    nutrition: {
      calories: 52,
      protein: 0.3,
      carbs: 13.8,
      fat: 0.2,
      fiber: 2.4,
      vitamins: { C: 8 },
      minerals: { potassium: 3 }
    },
    image: 'https://images.pexels.com/photos/206959/pexels-photo-206959.jpeg'
  },
  {
    id: '13',
    name: 'Cavoletti di Bruxelles',
    season: Season.FALL,
    category: FoodCategory.VEGETABLES,
    description: 'I cavoletti di Bruxelles autunnali sono ricchi di fibre, vitamine e composti che supportano la detossificazione.',
    benefits: ['Supporta la detossificazione', 'Proprietà anti-infiammatorie', 'Ricchi di antiossidanti'],
    nutrition: {
      calories: 43,
      protein: 3.4,
      carbs: 8.9,
      fat: 0.3,
      fiber: 3.8,
      vitamins: { C: 142, K: 177 },
      minerals: { folate: 15 }
    },
    image: 'https://images.unsplash.com/photo-1438118907704-7718ee9a191a'
  },
  {
    id: '14',
    name: 'Patate Dolci',
    season: Season.FALL,
    category: FoodCategory.VEGETABLES,
    description: 'Le patate dolci autunnali sono ricche di beta-carotene, che l\'organismo converte in vitamina A.',
    benefits: ['Supporta la salute degli occhi', 'Rafforza il sistema immunitario', 'Ricche di antiossidanti'],
    nutrition: {
      calories: 86,
      protein: 1.6,
      carbs: 20.1,
      fat: 0.1,
      fiber: 3.0,
      vitamins: { A: 284, C: 33, B6: 14 },
      minerals: { potassium: 9, manganese: 50 }
    },
    image: 'https://images.pexels.com/photos/29301895/pexels-photo-29301895/free-photo-of-patate-rosse-fresche-al-mercato-locale.jpeg'
  },
  {
    id: '15',
    name: 'Cavolfiore',
    season: Season.FALL,
    category: FoodCategory.VEGETABLES,
    description: 'Il cavolfiore autunnale è ricco di vitamine, minerali e composti che possono ridurre il rischio di cancro.',
    benefits: ['Supporta la salute del cervello', 'Proprietà anti-infiammatorie', 'Supporta la detossificazione'],
    nutrition: {
      calories: 25,
      protein: 1.9,
      carbs: 5.0,
      fat: 0.3,
      fiber: 2.0,
      vitamins: { C: 77, K: 20, B6: 11 },
      minerals: { folate: 14 }
    },
    image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3'
  },
  
  // Alimenti Invernali
  {
    id: '16',
    name: 'Cavolo Riccio',
    season: Season.WINTER,
    category: FoodCategory.VEGETABLES,
    description: 'Il cavolo riccio invernale è uno degli alimenti più ricchi di nutrienti, pieno di vitamine e minerali.',
    benefits: ['Supporta la salute delle ossa', 'Ricco di antiossidanti', 'Supporta la salute del cuore'],
    nutrition: {
      calories: 49,
      protein: 4.3,
      carbs: 8.8,
      fat: 0.9,
      fiber: 3.6,
      vitamins: { A: 206, C: 134, K: 684 },
      minerals: { calcium: 15, magnesium: 8 }
    },
    image: 'https://images.pexels.com/photos/6316538/pexels-photo-6316538.jpeg'
  },
  {
    id: '17',
    name: 'Arance',
    season: Season.WINTER,
    category: FoodCategory.FRUITS,
    description: 'Le arance invernali sono ricche di vitamina C e antiossidanti che supportano la funzione immunitaria.',
    benefits: ['Rafforza il sistema immunitario', 'Supporta la salute della pelle', 'Proprietà anti-infiammatorie'],
    nutrition: {
      calories: 47,
      protein: 0.9,
      carbs: 11.8,
      fat: 0.1,
      fiber: 2.4,
      vitamins: { C: 89, A: 4, B1: 8 },
      minerals: { potassium: 5, calcium: 4 }
    },
    image: 'https://images.pexels.com/photos/42059/citrus-diet-food-fresh-42059.jpeg'
  },
  {
    id: '18',
    name: 'Quinoa',
    season: Season.WINTER,
    category: FoodCategory.GRAINS,
    description: 'La quinoa è una proteina completa che contiene tutti e nove gli aminoacidi essenziali, ideale per le diete vegetariane.',
    benefits: ['Fonte completa di proteine', 'Ricca di fibre', 'Contiene antiossidanti benefici'],
    nutrition: {
      calories: 120,
      protein: 4.4,
      carbs: 21.3,
      fat: 1.9,
      fiber: 2.8,
      vitamins: { B1: 13, B6: 11 },
      minerals: { magnesium: 30, phosphorus: 28, manganese: 58 }
    },
    image: 'https://images.pexels.com/photos/7421202/pexels-photo-7421202.jpeg'
  },
  {
    id: '19',
    name: 'Noci',
    season: Season.WINTER,
    category: FoodCategory.NUTS,
    description: 'Le noci invernali sono ricche di acidi grassi omega-3, che supportano la salute del cervello e del cuore.',
    benefits: ['Supporta la salute del cervello', 'Grassi salutari per il cuore', 'Proprietà antiossidanti'],
    nutrition: {
      calories: 654,
      protein: 15.2,
      carbs: 13.7,
      fat: 65.2,
      fiber: 6.7,
      vitamins: { E: 5 },
      minerals: { copper: 163, manganese: 130 }
    },
    image: 'https://images.pexels.com/photos/3640631/pexels-photo-3640631.jpeg'
  },
  {
    id: '20',
    name: 'Salmone',
    season: Season.WINTER,
    category: FoodCategory.PROTEINS,
    description: 'Il salmone invernale è ricco di acidi grassi omega-3, che supportano la salute del cuore e del cervello.',
    benefits: ['Ricco di acidi grassi omega-3', 'Proteine di alta qualità', 'Supporta la salute del cuore'],
    nutrition: {
      calories: 206,
      protein: 22.1,
      carbs: 0,
      fat: 13.4,
      fiber: 0,
      vitamins: { B12: 106, D: 66, B6: 35 },
      minerals: { selenium: 52 }
    },
    image: 'https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg'
  }
];

export default seasonalFoods;