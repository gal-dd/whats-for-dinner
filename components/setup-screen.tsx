import * as Haptics from 'expo-haptics';
import { StatusBar } from 'expo-status-bar';
import { useMemo } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { meals } from '@/data/meals';
import { useMealSelectionStore } from '@/store/meal-selection-store';

import { MealCard } from './meal-card';

export function SetupScreen() {
  const { width } = useWindowDimensions();
  const selectedMealIds = useMealSelectionStore((state) => state.selectedMealIds);
  const toggleMeal = useMealSelectionStore((state) => state.toggleMeal);
  const selectAll = useMealSelectionStore((state) => state.selectAll);
  const clearAll = useMealSelectionStore((state) => state.clearAll);
  const canStartChoosing = selectedMealIds.length >= 2;
  const cardWidth = useMemo(() => Math.max(140, (width - 60) / 2), [width]);

  const toggle = (mealId: string) => {
    void Haptics.selectionAsync();
    toggleMeal(mealId);
  };

  const choose = () => {
    if (!canStartChoosing) return;
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.kicker}>DINNER, SOLVED</Text>
          <Text style={styles.title}>Whats For Dinner?</Text>
          <Text style={styles.subtitle}>Pick the contenders. We’ll help you choose from there.</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your meal lineup</Text>
          <Text style={styles.count}>{selectedMealIds.length} selected</Text>
        </View>

        <View style={styles.grid}>
          {meals.map((meal) => (
            <View key={meal.id} style={{ width: cardWidth }}>
              <MealCard meal={meal} selected={selectedMealIds.includes(meal.id)} onPress={() => toggle(meal.id)} />
            </View>
          ))}
        </View>

        <View style={styles.quickActions}>
          <Pressable onPress={selectAll} style={styles.textButton}>
            <Text style={styles.textButtonLabel}>Select All</Text>
          </Pressable>
          <View style={styles.divider} />
          <Pressable onPress={clearAll} style={styles.textButton}>
            <Text style={styles.textButtonLabel}>Clear All</Text>
          </Pressable>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: !canStartChoosing }}
          disabled={!canStartChoosing}
          onPress={choose}
          style={({ pressed }) => [styles.startButton, !canStartChoosing && styles.startButtonDisabled, pressed && canStartChoosing && styles.startButtonPressed]}
        >
          <Text style={styles.startButtonLabel}>Start Choosing</Text>
          <Text style={styles.startButtonArrow}>→</Text>
        </Pressable>
        <Text style={styles.helperText}>
          {canStartChoosing ? 'You’re ready to settle dinner.' : 'Select at least two meals to start.'}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#FFFDF9', flex: 1 },
  content: { padding: 24, paddingBottom: 36 },
  hero: { marginBottom: 30, marginTop: 16 },
  kicker: { color: '#FF7A2F', fontSize: 12, fontWeight: '800', letterSpacing: 1.5, marginBottom: 9 },
  title: { color: '#292522', fontSize: 34, fontWeight: '800', letterSpacing: -0.8 },
  subtitle: { color: '#706B65', fontSize: 16, lineHeight: 23, marginTop: 10, maxWidth: 310 },
  sectionHeader: { alignItems: 'baseline', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  sectionTitle: { color: '#292522', fontSize: 18, fontWeight: '800' },
  count: { color: '#938B82', fontSize: 14, fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between' },
  quickActions: { alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginVertical: 25 },
  textButton: { paddingHorizontal: 18, paddingVertical: 10 },
  textButtonLabel: { color: '#5B5148', fontSize: 14, fontWeight: '800' },
  divider: { backgroundColor: '#E1DDD7', height: 20, width: 1 },
  startButton: { alignItems: 'center', backgroundColor: '#FF7A2F', borderRadius: 18, flexDirection: 'row', justifyContent: 'center', minHeight: 58, paddingHorizontal: 20 },
  startButtonDisabled: { backgroundColor: '#DDD7D0' },
  startButtonPressed: { backgroundColor: '#E86620', transform: [{ scale: 0.99 }] },
  startButtonLabel: { color: '#FFFFFF', fontSize: 17, fontWeight: '800' },
  startButtonArrow: { color: '#FFFFFF', fontSize: 23, fontWeight: '600', marginLeft: 10, marginTop: -2 },
  helperText: { color: '#938B82', fontSize: 13, marginTop: 11, textAlign: 'center' },
});
