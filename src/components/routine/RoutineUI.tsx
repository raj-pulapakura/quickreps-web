import { useEffect, useState } from 'react';
import { FlattenedRoutine } from '../../types/app/flattenedRoutine';
import Timer from './components/Timer';
import NextExercise from './components/NextExercise';
import AnimatedPageContainer from '../shared/AnimatedPageContainer';

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
    <AnimatedPageContainer>
      <Timer
        totalTime={flattenedRoutine[currentExerciseIndex].durationInSeconds}
        remainingTime={countdown}
      />
      <p className="text-center text-5xl mt-5">
        {flattenedRoutine[currentExerciseIndex].exerciseName}
      </p>

      <p className="text-center text-2xl text-gray-500 mt-5">
        {flattenedRoutine[currentExerciseIndex].shortDescription}
      </p>

      {currentExerciseIndex < flattenedRoutine.length - 1 && (
        <NextExercise exercise={flattenedRoutine[currentExerciseIndex + 1]} />
      )}
    </AnimatedPageContainer>
  );
}
