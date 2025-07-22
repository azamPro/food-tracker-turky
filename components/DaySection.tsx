'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Calendar, Target } from 'lucide-react';
import { DayData } from '@/types/meal';
import { MealCard } from './MealCard';

interface DaySectionProps {
  dayData: DayData;
  onDeleteMeal: (mealId: string) => void;
  onResetDay: (date: string) => void;
}

export function DaySection({ dayData, onDeleteMeal, onResetDay }: DaySectionProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
    
    if (date.toDateString() === today) return 'Today';
    if (date.toDateString() === yesterday) return 'Yesterday';
    
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const totalMacros = dayData.meals.reduce(
    (acc, meal) => ({
      carbs: acc.carbs + meal.carbs,
      protein: acc.protein + meal.protein,
      fat: acc.fat + meal.fat,
    }),
    { carbs: 0, protein: 0, fat: 0 }
  );

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 border-2 border-blue-200 dark:border-blue-800">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">
                {formatDate(dayData.date)}
              </CardTitle>
            </div>
            <Button
              onClick={() => onResetDay(dayData.date)}
              size="sm"
              variant="outline"
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-200 dark:border-red-800"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Reset Day
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-green-600" />
                <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {dayData.totalCalories.toLocaleString('en-US')}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">total calories</span>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                from {dayData.meals.length} meal{dayData.meals.length !== 1 ? 's' : ''}
              </div>
            </div>
            <div className="flex flex-wrap gap-1 justify-end">
              <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs">
                {totalMacros.carbs.toLocaleString('en-US', { maximumFractionDigits: 1 })}g carbs
              </Badge>
              <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs">
                {totalMacros.protein.toLocaleString('en-US', { maximumFractionDigits: 1 })}g protein
              </Badge>
              <Badge variant="secondary" className="bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 text-xs">
                {totalMacros.fat.toLocaleString('en-US', { maximumFractionDigits: 1 })}g fat
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {dayData.meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} onDelete={onDeleteMeal} />
        ))}
      </div>
    </div>
  );
}