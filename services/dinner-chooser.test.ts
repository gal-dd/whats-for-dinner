import { chooseDinner, type RandomFunction } from './dinner-chooser';

function sequenceRandom(values: number[]): RandomFunction {
  let index = 0;
  return () => values[index++];
}

describe('chooseDinner', () => {
  it.each([[[]], [['pizza']], [['pizza', 'pizza']]])('rejects fewer than two unique meal IDs: %p', (mealIds) => {
    expect(() => chooseDinner(mealIds)).toThrow('at least two unique meal IDs');
  });

  it('deduplicates input IDs and keeps the standard winner last', () => {
    const result = chooseDinner(['pizza', 'pizza', 'burger', 'sushi'], {
      random: sequenceRandom([0, 0, 0, 0]),
    });

    expect(result.mode).toBe('standard');
    expect(result.winnerId).toBe('sushi');
    expect(result.roundWinners).toEqual(['sushi']);
    expect(result.eliminationOrder).toEqual(['pizza', 'burger', 'sushi']);
    expect(result.eliminationOrder[result.eliminationOrder.length - 1]).toBe(result.winnerId);
    expect(result.winsByMealId).toEqual({ pizza: 0, burger: 0, sushi: 1 });
  });

  it('uses injected randomness to make standard games repeatable', () => {
    const result = chooseDinner(['pizza', 'burger'], { random: sequenceRandom([0.99, 0]) });

    expect(result.winnerId).toBe('pizza');
    expect(result.eliminationOrder).toEqual(['burger', 'pizza']);
  });

  it('stops best-of-three when a meal earns its second win', () => {
    const result = chooseDinner(['pizza', 'burger', 'sushi'], {
      mode: 'best-of-three',
      random: sequenceRandom([0, 0.4, 0, 0.9, 0]),
    });

    expect(result.winnerId).toBe('pizza');
    expect(result.roundWinners).toEqual(['pizza', 'burger', 'pizza']);
    expect(result.winsByMealId).toEqual({ pizza: 2, burger: 1, sushi: 0 });
    expect(result.eliminationOrder).toEqual(['sushi', 'burger', 'pizza']);
    expect(result.eliminationOrder[result.eliminationOrder.length - 1]).toBe('pizza');
  });

  it('can finish best-of-three in the minimum two rounds', () => {
    const result = chooseDinner(['pizza', 'burger'], {
      mode: 'best-of-three',
      random: sequenceRandom([0.75, 0.75, 0]),
    });

    expect(result.roundWinners).toEqual(['burger', 'burger']);
    expect(result.winnerId).toBe('burger');
    expect(result.eliminationOrder).toEqual(['pizza', 'burger']);
  });

  it.each([-0.01, 1, Number.NaN, Number.POSITIVE_INFINITY])('rejects invalid random values: %p', (value) => {
    expect(() => chooseDinner(['pizza', 'burger'], { random: () => value })).toThrow('Random function must return');
  });

  it('rejects unsupported modes at runtime', () => {
    expect(() => chooseDinner(['pizza', 'burger'], { mode: 'sudden-death' as never })).toThrow(
      'Unsupported Dinner Chooser mode',
    );
  });
});
