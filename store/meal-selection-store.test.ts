import { defaultSelectedMealIds, meals } from '@/data/meals';

import { useMealSelectionStore } from './meal-selection-store';

describe('meal selection store', () => {
  beforeEach(() => {
    useMealSelectionStore.setState({ selectedMealIds: defaultSelectedMealIds });
  });

  it('starts with the meals enabled by default', () => {
    expect(useMealSelectionStore.getState().selectedMealIds).toEqual(defaultSelectedMealIds);
  });

  it('toggles a meal selection', () => {
    const store = useMealSelectionStore.getState();
    store.toggleMeal('pizza');
    expect(useMealSelectionStore.getState().selectedMealIds).not.toContain('pizza');

    useMealSelectionStore.getState().toggleMeal('pizza');
    expect(useMealSelectionStore.getState().selectedMealIds).toContain('pizza');
  });

  it('selects and clears every built-in meal', () => {
    useMealSelectionStore.getState().clearAll();
    expect(useMealSelectionStore.getState().selectedMealIds).toEqual([]);

    useMealSelectionStore.getState().selectAll();
    expect(useMealSelectionStore.getState().selectedMealIds).toEqual(meals.map((meal) => meal.id));
  });
});
