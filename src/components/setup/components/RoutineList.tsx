import { Routine } from '../../../types/app/routine';
import RoutineSectionHeader from './RoutineSectionHeader';
import RoutineItem from './RoutineSectionItem';
import RoutineSection from './RoutineSection';
import RoutineSectionList from './RoutineSectionList';

export default function RoutineList({ routine }: { routine: Routine }) {
  return (
    <div className="flex flex-col gap-8">
      <RoutineSection>
        <RoutineSectionHeader title="Warmup" />
        <RoutineSectionList>
          {routine.warmup.map((exercise, index) => (
            <RoutineItem key={index} exercise={exercise} />
          ))}
        </RoutineSectionList>
      </RoutineSection>

      <RoutineSection>
        <RoutineSectionHeader title="Workout" />
        <RoutineSectionList>
          {routine.workout.map((exercise, index) => (
            <RoutineItem key={index} exercise={exercise} />
          ))}
        </RoutineSectionList>
      </RoutineSection>

      <RoutineSection>
        <RoutineSectionHeader title="Cooldown" />
        <RoutineSectionList>
          {routine.cooldown.map((exercise, index) => (
            <RoutineItem key={index} exercise={exercise} />
          ))}
        </RoutineSectionList>
      </RoutineSection>
    </div>
  );
}
