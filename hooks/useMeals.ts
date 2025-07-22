'use client';

import { useState } from 'react';
import { Meal, DayData } from '@/types/meal';
import { useLocalStorage } from './useLocalStorage';

export function useMeals() {
  const [meals, setMeals] = useLocalStorage<Meal[]>('calorie-tracker-meals', []);

  const addMeal = (mealData: Omit<Meal, 'id' | 'calories' | 'timestamp'>) => {
    const calories = (mealData.carbs * 4) + (mealData.protein * 4) + (mealData.fat * 9);
    const newMeal: Meal = {
      ...mealData,
      id: Date.now().toString(),
      calories: Math.round(calories * 10) / 10, // Round to 1 decimal place
      timestamp: Date.now(),
    };

    setMeals(prev => [...prev, newMeal]);
  };

  const deleteMeal = (mealId: string) => {
    setMeals(prev => prev.filter(meal => meal.id !== mealId));
  };

  const resetAllMeals = () => {
    setMeals([]);
  };

  const resetDayMeals = (date: string) => {
    setMeals(prev => prev.filter(meal => meal.date !== date));
  };

  const getMealsByDays = (): DayData[] => {
    const mealsByDay = meals.reduce((acc, meal) => {
      if (!acc[meal.date]) {
        acc[meal.date] = [];
      }
      acc[meal.date].push(meal);
      return acc;
    }, {} as Record<string, Meal[]>);

    return Object.entries(mealsByDay)
      .map(([date, dayMeals]) => ({
        date,
        meals: dayMeals.sort((a, b) => b.timestamp - a.timestamp),
        totalCalories: Math.round(dayMeals.reduce((sum, meal) => sum + meal.calories, 0) * 10) / 10,
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  return {
    meals,
    addMeal,
    deleteMeal,
    resetAllMeals,
    resetDayMeals,
    getMealsByDays,
  };
}