import { FlattenedExercise } from '../../../types/app/flattenedExercise';

export default function NextExercise({
  exercise,
}: {
  exercise: FlattenedExercise;
}) {
  return (
    <div className="mt-32 border-gray-900 border-2 p-3 rounded-md flex items-center justify-between mb-3 gap-3">
      <div className="w-full ">
        <p className="text-sm text-gray-500 mb-2">NEXT</p>
        <h1 className="text-lg text-gray-400">{exercise.exerciseName}</h1>
        <p className="text-md text-gray-500">{exercise.shortDescription}</p>
      </div>
    </div>
  );
}
