import type { Meal } from '@/types/meal';

export const meals: Meal[] = [
  { id: 'pizza', name: 'Pizza', emoji: '🍕', imagePlaceholder: 'meal-pizza', enabledByDefault: true },
  { id: 'burger', name: 'Burger', emoji: '🍔', imagePlaceholder: 'meal-burger', enabledByDefault: true },
  { id: 'shawarma', name: 'Shawarma', emoji: '🌯', imagePlaceholder: 'meal-shawarma', enabledByDefault: true },
  { id: 'sushi', name: 'Sushi', emoji: '🍣', imagePlaceholder: 'meal-sushi', enabledByDefault: true },
  { id: 'pasta', name: 'Pasta', emoji: '🍝', imagePlaceholder: 'meal-pasta', enabledByDefault: true },
  { id: 'falafel', name: 'Falafel', emoji: '🧆', imagePlaceholder: 'meal-falafel', enabledByDefault: true },
  { id: 'wok', name: 'Wok', emoji: '🥡', imagePlaceholder: 'meal-wok', enabledByDefault: true },
  { id: 'sandwich', name: 'Sandwich', emoji: '🥪', imagePlaceholder: 'meal-sandwich', enabledByDefault: true },
  { id: 'grill', name: 'Grill', emoji: '🥩', imagePlaceholder: 'meal-grill', enabledByDefault: true },
  { id: 'salad', name: 'Salad', emoji: '🥗', imagePlaceholder: 'meal-salad', enabledByDefault: true },
];

export const defaultSelectedMealIds = meals
  .filter((meal) => meal.enabledByDefault)
  .map((meal) => meal.id);
