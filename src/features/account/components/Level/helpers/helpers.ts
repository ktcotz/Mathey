export const calculateXPForNextLevel = (currentLevel: number) => {
  const BASE_XP = 100;
  const XP_CONVERTER = 1.5;

  return Math.floor(BASE_XP * Math.pow(currentLevel, XP_CONVERTER));
};
