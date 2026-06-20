// data/exercises.js

export const WORKOUT_LEVELS = {
  IRON: {
    rank: 'IRON',
    exercises: [
      { id: 1, name: 'Pike Pushups', target: '1-5 reps' },
      { id: 2, name: 'Jumping Ropes', target: '40 skips' },
      { id: 3, name: 'Diamond Pushups', target: '1-5 reps' },
      { id: 4, name: 'Full Squats', target: '1-9 reps' },
      { id: 5, name: 'Regular Push-ups', target: '1-5 reps' },
      { id: 6, name: 'Dead Hang', target: '10 seconds' },
      { id: 7, name: 'Wide Arm Push-ups', target: '1-5 reps' },
      { id: 8, name: 'Sit-ups', target: '1-5 reps' },
      { id: 9, name: 'Crunches', target: '1-5 reps' },
      { id: 10, name: 'Pull-ups', target: '1-5 reps' }
    ]
  },
  TUSK: {
    rank: 'TUSK',
    exercises: [
      { id: 1, name: 'Pike Pushups', target: '10-15 reps' },
      { id: 2, name: 'Jumping Ropes', target: '100 skips' },
      { id: 3, name: 'Diamond Pushups', target: '10-15 reps' },
      { id: 4, name: 'Full Squats', target: '20-25 reps' },
      { id: 5, name: 'Regular Push-ups', target: '15-20 reps' },
      { id: 6, name: 'Dead Hang', target: '30 seconds' },
      { id: 7, name: 'Wide Arm Push-ups', target: '10-15 reps' },
      { id: 8, name: 'Sit-ups', target: '20-25 reps' },
      { id: 9, name: 'Crunches', target: '20-25 reps' },
      { id: 10, name: 'Pull-ups', target: '8-10 reps' }
    ]
  },
  BERU: {
    rank: 'BERU',
    exercises: [
      { id: 1, name: 'Pike Pushups', target: '20-25 reps' },
      { id: 2, name: 'Jumping Ropes', target: '150 skips' },
      { id: 3, name: 'Diamond Pushups', target: '20-25 reps' },
      { id: 4, name: 'Full Squats', target: '40-50 reps' },
      { id: 5, name: 'Regular Push-ups', target: '30-35 reps' },
      { id: 6, name: 'Dead Hang', target: '60 seconds' },
      { id: 7, name: 'Wide Arm Push-ups', target: '20-25 reps' },
      { id: 8, name: 'Sit-ups', target: '40-50 reps' },
      { id: 9, name: 'Crunches', target: '40-50 reps' },
      { id: 10, name: 'Pull-ups', target: '15-20 reps' }
    ]
  },
  IGRIS: {
    rank: 'IGRIS',
    exercises: [
      { id: 1, name: 'Pike Pushups', target: '30-40 reps' },
      { id: 2, name: 'Jumping Ropes', target: '200 skips' },
      { id: 3, name: 'Diamond Pushups', target: '30-40 reps' },
      { id: 4, name: 'Full Squats', target: '60-80 reps' },
      { id: 5, name: 'Regular Push-ups', target: '50-60 reps' },
      { id: 6, name: 'Dead Hang', target: '90 seconds' },
      { id: 7, name: 'Wide Arm Push-ups', target: '30-40 reps' },
      { id: 8, name: 'Sit-ups', target: '60-80 reps' },
      { id: 9, name: 'Crunches', target: '60-80 reps' },
      { id: 10, name: 'Pull-ups', target: '25-30 reps' }
    ]
  },
  BELLION: {
    rank: 'BELLION',
    exercises: [
      { id: 1, name: 'Pike Pushups', target: '50 reps' },
      { id: 2, name: 'Jumping Ropes', target: '300 skips' },
      { id: 3, name: 'Diamond Pushups', target: '50 reps' },
      { id: 4, name: 'Full Squats', target: '100 reps' },
      { id: 5, name: 'Regular Push-ups', target: '100 reps' },
      { id: 6, name: 'Dead Hang', target: '2 minutes' },
      { id: 7, name: 'Wide Arm Push-ups', target: '50 reps' },
      { id: 8, name: 'Sit-ups', target: '100 reps' },
      { id: 9, name: 'Crunches', target: '100 reps' },
      { id: 10, name: 'Pull-ups', target: '50 reps' }
    ]
  },
  MONARCH: {
    rank: 'MONARCH',
    exercises: [
      { id: 1, name: 'Pike Pushups', target: '100 reps' },
      { id: 2, name: 'Jumping Ropes', target: '500 skips' },
      { id: 3, name: 'Diamond Pushups', target: '100 reps' },
      { id: 4, name: 'Full Squats', target: '200 reps' },
      { id: 5, name: 'Regular Push-ups', target: '200 reps' },
      { id: 6, name: 'Dead Hang', target: '5 minutes' },
      { id: 7, name: 'Wide Arm Push-ups', target: '100 reps' },
      { id: 8, name: 'Sit-ups', target: '200 reps' },
      { id: 9, name: 'Crunches', target: '200 reps' },
      { id: 10, name: 'Pull-ups', target: '100 reps' }
    ]
  }
};

export function getExercisesByLevel(userLevel) {
  if (userLevel >= 100) return WORKOUT_LEVELS.MONARCH.exercises;
  if (userLevel >= 80) return WORKOUT_LEVELS.BELLION.exercises;
  if (userLevel >= 50) return WORKOUT_LEVELS.IGRIS.exercises;
  if (userLevel >= 35) return WORKOUT_LEVELS.BERU.exercises;
  if (userLevel >= 15) return WORKOUT_LEVELS.TUSK.exercises;
  return WORKOUT_LEVELS.IRON.exercises;
}