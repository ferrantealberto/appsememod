export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  strengths: string[];
  capabilities: string[];
  free: boolean;
}

export interface Food {
  id: string;
  name: string;
  season: Season;
  category: FoodCategory;
  nutrition: NutritionInfo;
  image?: string;
  description: string;
  benefits: string[];
}

export enum Season {
  SPRING = 'primavera',
  SUMMER = 'estate',
  FALL = 'autunno',
  WINTER = 'inverno'
}

export enum FoodCategory {
  FRUITS = 'frutta',
  VEGETABLES = 'verdura',
  GRAINS = 'cereali',
  PROTEINS = 'proteine',
  DAIRY = 'latticini',
  NUTS = 'frutta_secca'
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  vitamins: Record<string, number>;
  minerals: Record<string, number>;
}

export enum ActivityLevel {
  SEDENTARY = 'sedentario',
  LIGHTLY_ACTIVE = 'leggermente_attivo',
  ACTIVE = 'attivo',
  VERY_ACTIVE = 'molto_attivo',
  ATHLETE = 'atleta'
}

export enum FitnessGoal {
  GENERAL_FITNESS = 'benessere_generale',
  WEIGHT_LOSS = 'perdita_peso',
  STRENGTH = 'forza'
}

export interface UserProfile {
  id: string;
  age: number;
  activityLevel: ActivityLevel;
  dietaryRestrictions: string[];
  fitnessGoal: FitnessGoal;
  height?: number;
  weight?: number;
}

export interface MealPlan {
  id: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  days: MealDay[];
}

export interface MealDay {
  date: Date;
  meals: Meal[];
  nutritionTotals: NutritionInfo;
}

export interface Meal {
  type: 'colazione' | 'pranzo' | 'cena' | 'spuntino';
  foods: Food[];
  nutrition: NutritionInfo;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroup: MuscleGroup;
  equipment: string[];
  duration: number;
  difficulty: 'principiante' | 'intermedio' | 'avanzato';
  instructions: string[];
  image?: string;
}

export enum MuscleGroup {
  CHEST = 'petto',
  BACK = 'schiena',
  LEGS = 'gambe',
  SHOULDERS = 'spalle',
  ARMS = 'braccia',
  CORE = 'core',
  FULL_BODY = 'corpo_intero'
}

export interface WorkoutPlan {
  id: string;
  userId: string;
  goal: FitnessGoal;
  days: WorkoutDay[];
}

export interface WorkoutDay {
  day: number;
  muscleGroups: MuscleGroup[];
  exercises: Exercise[];
  duration: number;
}