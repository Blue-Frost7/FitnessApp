// data/penaltyEngine.js

export const calculateSystemPenalties = (userData) => {
  if (!userData.lastWorkoutDate) {
    return {
      currentLevel: userData.level || 1,
      originalLevel: userData.level || 1,
      daysMissed: 0,
      isDemoted: false,
      penaltyStatus: "ACTIVE"
    };
  }

  const lastActive = new Date(userData.lastWorkoutDate);
  const today = new Date();
  
  // Calculate distinct calendar days missed
  const timeDiff = today.getTime() - lastActive.getTime();
  const daysMissed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  let originalLevel = userData.originalLevel || userData.level || 1;
  let computedLevel = originalLevel;
  let isDemoted = false;
  let penaltyStatus = "ACTIVE";

  // Requirement [19-20] Penalty Logic Tree
  if (daysMissed >= 16) {
    // Stage 5: Permanent Stat Decay. The demotions lock in forever.
    const reduction = 1 + Math.floor((daysMissed - 4) / 3);
    computedLevel = Math.max(1, originalLevel - reduction);
    originalLevel = computedLevel; // originalLevel resets to match degraded state
    penaltyStatus = "PERMANENT_DECAY";
  } else if (daysMissed >= 4) {
    // Stage 2 & 3: Active Grace Violation. Demotion calculation active.
    isDemoted = true;
    // Day 4-6 = -1 level. Day 7-9 = -2 levels. Day 10-12 = -3 levels. Day 13-15 = -4 levels.
    const reduction = 1 + Math.floor((daysMissed - 4) / 3);
    computedLevel = Math.max(1, originalLevel - reduction);
    penaltyStatus = `DEMOTED_-${reduction}_LVL`;
  }

  return {
    currentLevel: computedLevel,
    originalLevel: originalLevel,
    daysMissed: daysMissed,
    isDemoted: isDemoted,
    penaltyStatus: penaltyStatus
  };
};