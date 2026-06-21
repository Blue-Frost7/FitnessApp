// data/systemTheme.js

export const getSystemRankData = (level) => {
  if (level >= 100) {
    return {
      rank: "MONARCH",
      shadowName: "Shadow Monarch",
      color: "#6E00FF", // Eldritch Void Purple
      targetBoss: "Antares (Monarch of Destruction)",
      quote: "Arise... Show the Monarch of Destruction the true power of the Shadow Army!",
      bgIntensity: "rgba(110, 0, 255, 0.15)"
    };
  }
  if (level >= 80) {
    return {
      rank: "S-RANK",
      shadowName: "Grand Marshal Bellion",
      color: "#BD00FF", // Deep Orchid
      targetBoss: "Frost Monarch & Iron Body Monarch",
      quote: "My blade belongs to the Sovereign. Let us strike down the Sovereign of Frost!",
      bgIntensity: "rgba(189, 0, 255, 0.1)"
    };
  }
  if (level >= 50) {
    return {
      rank: "A-RANK",
      shadowName: "Grand Marshal Igris",
      color: "#8A00FF", // Vibrant Violet
      targetBoss: "The Beast Monarch",
      quote: "I shall pave your path with the remnants of your enemies. The Beast Monarch falls next.",
      bgIntensity: "rgba(138, 0, 255, 0.1)"
    };
  }
  if (level >= 35) {
    return {
      rank: "B-RANK",
      shadowName: "Marshal Beru",
      color: "#3B00FF", // Dark Indigo
      targetBoss: "The Demon Monarch (Baran)",
      quote: "KEH-HEH-HEH! My King, grant me permission to tear the Demon Monarch apart!",
      bgIntensity: "rgba(59, 0, 255, 0.1)"
    };
  }
  if (level >= 15) {
    return {
      rank: "C-RANK",
      shadowName: "General Tusk",
      color: "#0066FF", // Deep Cobalt
      targetBoss: "Cerberus (The Volcano Gate Keeper)",
      quote: "Let our magic incinerate the Volcano Guide. Push past your limits!",
      bgIntensity: "rgba(0, 102, 255, 0.1)"
    };
  }
  
  // Default: Level 1 - 14 (Iron Tier)
  return {
    rank: "D-RANK",
    shadowName: "General Iron",
    color: "#00F2FF", // Electric Cyan
    targetBoss: "Barca (The Ice Elf King)",
    quote: "Protect the Sovereign! Crush your daily targets and prepare to shatter Barca!",
    bgIntensity: "rgba(0, 242, 255, 0.1)"
  };
};