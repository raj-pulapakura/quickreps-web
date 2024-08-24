import { Routine } from '../../../types/app/routine';
import RoutineSectionHeader from './RoutineSectionHeader';
import RoutineItem from './RoutineItem';

export default function RoutineList({ routine }: { routine: Routine }) {
  return (
    <div>
      <RoutineSectionHeader title="Warmup" />
      {routine.warmup.map((exercise) => (
        <RoutineItem exercise={exercise} />
      ))}

      <RoutineSectionHeader title="Workout" />
      {routine.workout.map((exercise) => (
        <RoutineItem exercise={exercise} />
      ))}

      <RoutineSectionHeader title="Cooldown" />
      {routine.cooldown.map((exercise) => (
        <RoutineItem exercise={exercise} />
      ))}
    </div>
  );
}
