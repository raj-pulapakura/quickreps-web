export interface FlattenedExercise {
  type: 'warmup' | 'workout' | 'cooldown';
  exerciseName: string;
  durationInSeconds: number;
  shortDescription: string;
}
