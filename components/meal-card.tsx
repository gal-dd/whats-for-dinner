import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Meal } from '@/types/meal';

type MealCardProps = {
  meal: Meal;
  selected: boolean;
  onPress: () => void;
};

export function MealCard({ meal, selected, onPress }: MealCardProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityLabel={meal.name}
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={({ pressed }) => [styles.card, selected && styles.cardSelected, pressed && styles.cardPressed]}
    >
      <Text style={styles.emoji}>{meal.emoji}</Text>
      <Text style={styles.name}>{meal.name}</Text>
      <View style={[styles.check, selected && styles.checkSelected]}>
        <Text style={styles.checkText}>{selected ? '✓' : ''}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E8E6E2',
    borderRadius: 22,
    borderWidth: 1.5,
    justifyContent: 'center',
    minHeight: 144,
    padding: 16,
    position: 'relative',
  },
  cardPressed: { opacity: 0.82, transform: [{ scale: 0.98 }] },
  cardSelected: { backgroundColor: '#FFF5E9', borderColor: '#FF8C42' },
  check: {
    alignItems: 'center',
    backgroundColor: '#F2F0EC',
    borderRadius: 10,
    height: 20,
    justifyContent: 'center',
    position: 'absolute',
    right: 12,
    top: 12,
    width: 20,
  },
  checkSelected: { backgroundColor: '#FF7A2F' },
  checkText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800', lineHeight: 18 },
  emoji: { fontSize: 45, marginBottom: 10 },
  name: { color: '#292522', fontSize: 16, fontWeight: '700' },
});
