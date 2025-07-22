'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Apple } from 'lucide-react';
import { Meal } from '@/types/meal';

interface MealCardProps {
  meal: Meal;
  onDelete: (mealId: string) => void;
}

export function MealCard({ meal, onDelete }: MealCardProps) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 dark:border-l-blue-400 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:scale-[1.02]">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Apple className="h-4 w-4 text-green-600" />
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 truncate">{meal.name}</h3>
              <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{formatTime(meal.timestamp)}</span>
            </div>
            
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs px-2 py-0.5">
                {meal.carbs.toLocaleString('en-US')}g carbs
              </Badge>
              <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs px-2 py-0.5">
                {meal.protein.toLocaleString('en-US')}g protein
              </Badge>
              <Badge variant="secondary" className="bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 text-xs px-2 py-0.5">
                {meal.fat.toLocaleString('en-US')}g fat
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-3 ml-4">
            <Button
              onClick={() => onDelete(meal.id)}
              size="sm"
              variant="ghost"
              className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 p-2 h-8 w-8"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            
            <div className="text-right">
              <div className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {meal.calories.toLocaleString('en-US')}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">calories</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}