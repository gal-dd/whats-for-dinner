import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { defaultSelectedMealIds, meals } from '@/data/meals';
import { storage } from '@/services/storage';

type MealSelectionState = {
  selectedMealIds: string[];
  clearAll: () => void;
  selectAll: () => void;
  toggleMeal: (mealId: string) => void;
};

const allMealIds = meals.map((meal) => meal.id);

export const useMealSelectionStore = create<MealSelectionState>()(
  persist(
    (set) => ({
      selectedMealIds: defaultSelectedMealIds,
      clearAll: () => set({ selectedMealIds: [] }),
      selectAll: () => set({ selectedMealIds: allMealIds }),
      toggleMeal: (mealId) =>
        set((state) => ({
          selectedMealIds: state.selectedMealIds.includes(mealId)
            ? state.selectedMealIds.filter((id) => id !== mealId)
            : [...state.selectedMealIds, mealId],
        })),
    }),
    {
      name: 'meal-selection',
      storage: createJSONStorage(() => storage),
    },
  ),
);
