export interface Meal {
  id: string;
  name: string;
  carbs: number;
  protein: number;
  fat: number;
  calories: number;
  date: string;
  timestamp: number;
}

export interface DayData {
  date: string;
  meals: Meal[];
  totalCalories: number;
}