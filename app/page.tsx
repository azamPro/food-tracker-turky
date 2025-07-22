'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { RotateCcw, TrendingUp, Users, Flag } from 'lucide-react';
import { useMeals } from '@/hooks/useMeals';
import { MealForm } from '@/components/MealForm';
import { DaySection } from '@/components/DaySection';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  const { addMeal, deleteMeal, resetAllMeals, resetDayMeals, getMealsByDays } = useMeals();
  const dayData = getMealsByDays();

  const totalCaloriesAllTime = dayData.reduce((sum, day) => sum + day.totalCalories, 0);
  const totalMeals = dayData.reduce((sum, day) => sum + day.meals.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 relative">
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-center gap-3 mb-2">
            <Flag className="h-8 w-8 text-red-600" />
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
              Calorie Tracker for Turkey
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Track your daily nutrition and calories in Turkey</p>
        </div>

        {/* Stats Cards */}
        {dayData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {Math.round(totalCaloriesAllTime).toLocaleString('en-US')}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Calories</p>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">{totalMeals.toLocaleString('en-US')}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Meals</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <RotateCcw className="h-5 w-5 text-orange-600" />
                  <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">{dayData.length.toLocaleString('en-US')}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Days Tracked</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Meal Form */}
        <div className="mb-8">
          <MealForm onAddMeal={addMeal} />
        </div>

        {/* Reset All Button */}
        {dayData.length > 0 && (
          <div className="flex justify-center mb-8">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  className="bg-red-600 hover:bg-red-700"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset All Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all your meal data and cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={resetAllMeals}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete All Data
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}

        {/* Meals by Day */}
        {dayData.length > 0 ? (
          <div className="space-y-8">
            {dayData.map((day) => (
              <DaySection
                key={day.date}
                dayData={day}
                onDeleteMeal={deleteMeal}
                onResetDay={resetDayMeals}
              />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent>
              <div className="text-gray-500 dark:text-gray-400 mb-4">
                <TrendingUp className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2 dark:text-gray-300">No meals tracked yet</h3>
                <p className="text-gray-400 dark:text-gray-500">Add your first meal above to get started!</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}