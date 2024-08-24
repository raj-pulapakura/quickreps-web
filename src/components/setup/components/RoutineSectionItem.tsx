import { Exercise } from '../../../types/app/exercise';

export default function RoutineSectionItem({
  exercise,
}: {
  exercise: Exercise;
}) {
  return (
    <div className="bg-gray-900 p-3 rounded-md flex items-center justify-between gap-5">
      <div className="w-full ">
        <h1 className="text-lg">{exercise.exerciseName}</h1>
        <p className="text-md text-gray-500">{exercise.shortDescription}</p>
      </div>
      <div className="w-fit text-right text-nowrap">
        <p className="text-2xl font-light text-slate-400">
          {exercise.durationInSeconds}s
        </p>
      </div>
    </div>
  );
}
