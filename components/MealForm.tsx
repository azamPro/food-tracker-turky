'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Calculator } from 'lucide-react';

interface MealFormProps {
  onAddMeal: (meal: {
    name: string;
    carbs: number;
    protein: number;
    fat: number;
    date: string;
  }) => void;
}

export function MealForm({ onAddMeal }: MealFormProps) {
  const [name, setName] = useState('');
  const [carbs, setCarbs] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');

  const calculateCalories = () => {
    const carbsNum = parseFloat(carbs) || 0;
    const proteinNum = parseFloat(protein) || 0;
    const fatNum = parseFloat(fat) || 0;
    return Math.round((carbsNum * 4 + proteinNum * 4 + fatNum * 9) * 10) / 10;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !carbs || !protein || !fat) return;

    const today = new Date().toISOString().split('T')[0];
    
    onAddMeal({
      name: name.trim(),
      carbs: parseFloat(carbs),
      protein: parseFloat(protein),
      fat: parseFloat(fat),
      date: today,
    });

    // Reset form
    setName('');
    setCarbs('');
    setProtein('');
    setFat('');
  };

  const totalCalories = calculateCalories();

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center justify-center gap-2">
          <PlusCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          Add New Meal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="meal-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Meal Name
            </Label>
            <Input
              id="meal-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Chicken Salad"
              className="mt-1 bg-white/80 dark:bg-gray-700/80 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label htmlFor="carbs" className="text-xs font-medium text-blue-600 dark:text-blue-400">
                Carbs (g)
              </Label>
              <Input
                id="carbs"
                type="number"
                step="0.1"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                placeholder="0"
                className="mt-1 text-center bg-white/80 dark:bg-gray-700/80 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
              />
            </div>
            <div>
              <Label htmlFor="protein" className="text-xs font-medium text-green-600 dark:text-green-400">
                Protein (g)
              </Label>
              <Input
                id="protein"
                type="number"
                step="0.1"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                placeholder="0"
                className="mt-1 text-center bg-white/80 dark:bg-gray-700/80 border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400"
              />
            </div>
            <div>
              <Label htmlFor="fat" className="text-xs font-medium text-orange-600 dark:text-orange-400">
                Fat (g)
              </Label>
              <Input
                id="fat"
                type="number"
                step="0.1"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                placeholder="0"
                className="mt-1 text-center bg-white/80 dark:bg-gray-700/80 border-gray-300 dark:border-gray-600 focus:border-orange-500 dark:focus:border-orange-400"
              />
            </div>
          </div>

          {(carbs || protein || fat) && (
            <div className="bg-gradient-to-r from-blue-50/80 to-green-50/80 dark:from-blue-950/50 dark:to-green-950/50 p-4 rounded-xl border border-blue-200/60 dark:border-blue-700/60 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-2 text-lg font-bold text-gray-800 dark:text-gray-100">
                <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="dark:text-gray-200">{totalCalories.toLocaleString('en-US')} calories</span>
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 dark:from-blue-500 dark:to-green-500 dark:hover:from-blue-600 dark:hover:to-green-600 text-white font-medium py-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            disabled={!name.trim() || !carbs || !protein || !fat}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Meal to Today
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}