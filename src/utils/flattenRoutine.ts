import { FlattenedRoutine } from '../types/app/flattenedRoutine';
import { Routine } from '../types/app/routine';

export const flattenRoutine = (routine: Routine): FlattenedRoutine => {
  return [
    ...routine.warmup.map((exercise) => ({ ...exercise, type: 'warmup' })),
    ...routine.workout.map((exercise) => ({ ...exercise, type: 'workout' })),
    ...routine.cooldown.map((exercise) => ({ ...exercise, type: 'cooldown' })),
  ] as FlattenedRoutine;
};
