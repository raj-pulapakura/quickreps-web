import { useEffect, useState } from 'react';
import { FlattenedRoutine } from '../../types/app/flattenedRoutine';

export default function RoutineUI({
  flattenedRoutine,
}: {
  flattenedRoutine: FlattenedRoutine;
}) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (currentExerciseIndex >= flattenedRoutine.length) {
      console.log('Routine finished');
      return;
    }

    const currentExercise = flattenedRoutine[currentExerciseIndex];

    setCountdown(currentExercise.durationInSeconds);

    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }, currentExercise.durationInSeconds * 1000);
  }, [currentExerciseIndex]);

  return (
    <div>
      <h1>RoutineUI</h1>
      <p>Current exercise:</p>
      <p>{flattenedRoutine[currentExerciseIndex]?.exerciseName}</p>
      <p>{flattenedRoutine[currentExerciseIndex]?.shortDescription}</p>
      <p>{countdown} seconds left</p>

      {currentExerciseIndex < flattenedRoutine.length - 1 && (
        <>
          <h1>Next exercise</h1>
          <p>{flattenedRoutine[currentExerciseIndex + 1]?.exerciseName}</p>
          <p>
            {flattenedRoutine[currentExerciseIndex + 1]?.durationInSeconds}{' '}
            seconds
          </p>
        </>
      )}
    </div>
  );
}
