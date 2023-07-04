import { usePlayerStore } from "@/stores/player.store";
import { PlayerStats } from "@/types/Player";

function calculateMiningSuccess(difficulty: number): number {
  const playerStore = usePlayerStore();
  // Assign stats
  let {
    level,
    strength,
    agility,
    vigor,
    vitality,
    intelligence,
    endurance,
    dexterity,
  } = playerStore.stats;

  // Base success rate is 10%
  let successRate = 10;

  // Each stat contributes equally to the success rate (scaled by the level)
  let statContribution =
    (strength +
      agility +
      vigor +
      vitality +
      intelligence +
      endurance +
      dexterity) /
    7;

  // Scale contribution to fit into 90%, to keep success rate between 10% and 100%
  successRate += (statContribution / 100) * 90;

  // Level effect: The higher the player's level compared to the difficulty level, the higher the success rate.
  let levelEffect = (level - difficulty) * 5;
  successRate += levelEffect;

  // Ensure successRate stays within the bounds of 0 and 100
  successRate = Math.max(0, Math.min(100, successRate));

  return successRate;
}

export const attemptMining = (difficulty: number, debug?: boolean): boolean => {
  // Calculate success rate
  const successRate = calculateMiningSuccess(difficulty);

  // Generate random number
  const roll = Math.floor(Math.random() * 100) + 1;
  if (debug) {
    console.log(`Success rate: ${successRate}%`);
    console.log(`Rolled: ${roll}`);
    console.log(`Success: ${roll <= successRate}`);
  }
  // Determine if mining is successful
  if (roll <= successRate) {
    return true; // Mining is successful
  } else {
    return false; // Mining is unsuccessful
  }
};
