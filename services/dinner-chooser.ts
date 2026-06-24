export type DinnerChooserMode = 'standard' | 'best-of-three';
export type RandomFunction = () => number;

export type DinnerChooserOptions = {
  mode?: DinnerChooserMode;
  random?: RandomFunction;
};

export type DinnerChooserResult = {
  eliminationOrder: string[];
  mode: DinnerChooserMode;
  roundWinners: string[];
  winnerId: string;
  winsByMealId: Record<string, number>;
};

const getUniqueMealIds = (mealIds: string[]) => {
  const uniqueMealIds = [...new Set(mealIds)];
  if (uniqueMealIds.length < 2) {
    throw new Error('Dinner Chooser requires at least two unique meal IDs.');
  }
  return uniqueMealIds;
};

const getRandomIndex = (length: number, random: RandomFunction) => {
  const value = random();
  if (!Number.isFinite(value) || value < 0 || value >= 1) {
    throw new Error('Random function must return a finite number from 0 (inclusive) to 1 (exclusive).');
  }
  return Math.floor(value * length);
};

const createWins = (mealIds: string[]) => Object.fromEntries(mealIds.map((mealId) => [mealId, 0]));

function createEliminationOrder(mealIds: string[], winnerId: string, random: RandomFunction) {
  const remaining = mealIds.filter((mealId) => mealId !== winnerId);
  const eliminated: string[] = [];
  while (remaining.length > 0) {
    eliminated.push(remaining.splice(getRandomIndex(remaining.length, random), 1)[0]);
  }
  return [...eliminated, winnerId];
}

function playStandardRound(mealIds: string[], random: RandomFunction) {
  const remaining = [...mealIds];
  while (remaining.length > 1) {
    remaining.splice(getRandomIndex(remaining.length, random), 1);
  }
  return remaining[0];
}

function playBestOfThree(mealIds: string[], random: RandomFunction) {
  const winsByMealId = createWins(mealIds);
  const roundWinners: string[] = [];
  while (true) {
    const roundWinner = mealIds[getRandomIndex(mealIds.length, random)];
    roundWinners.push(roundWinner);
    winsByMealId[roundWinner] += 1;
    if (winsByMealId[roundWinner] === 2) {
      return { roundWinners, winnerId: roundWinner, winsByMealId };
    }
  }
}

/** Chooses a dinner. The random function must return a Math.random-style value in [0, 1). */
export function chooseDinner(
  selectedMealIds: string[],
  { mode = 'standard', random = Math.random }: DinnerChooserOptions = {},
): DinnerChooserResult {
  const mealIds = getUniqueMealIds(selectedMealIds);
  if (mode === 'standard') {
    const winnerId = playStandardRound(mealIds, random);
    const winsByMealId = createWins(mealIds);
    winsByMealId[winnerId] = 1;
    return {
      eliminationOrder: createEliminationOrder(mealIds, winnerId, random),
      mode,
      roundWinners: [winnerId],
      winnerId,
      winsByMealId,
    };
  }
  if (mode === 'best-of-three') {
    const game = playBestOfThree(mealIds, random);
    return { eliminationOrder: createEliminationOrder(mealIds, game.winnerId, random), mode, ...game };
  }
  throw new Error(`Unsupported Dinner Chooser mode: ${mode as string}`);
}
