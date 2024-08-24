import React, { useState } from 'react';
import { Routine } from '../../types/app/routine';

const routineDurations = [2, 5, 10, 15];

export default function SetupUI({
  routine,
  setRoutine,
  setIsPlayingRoutine,
}: {
  routine: Routine | null;
  setRoutine: React.Dispatch<React.SetStateAction<Routine | null>>;
  setIsPlayingRoutine: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

  async function generateRoutine() {
    setIsGenerating(true);
    try {
      const requestBody = {
        durationInMinutes: selectedDuration,
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/exercise/generate-routine`,
        {
          method: 'POST',
          body: JSON.stringify(requestBody),
        }
      );

      const routine = (await response.json()) as Routine;

      console.log('Recevied routine:');
      console.log(routine);

      // Validate that routine has all required fields
      if (
        !routine ||
        !routine.warmup ||
        !routine.workout ||
        !routine.cooldown
      ) {
        throw new Error('Invalid routine');
      }

      setRoutine(routine);
    } catch (error) {
      console.error(error);
    }
    setIsGenerating(false);
  }

  return (
    <div>
      {routineDurations.map((duration) => (
        <button
          key={duration}
          className={`${
            duration === selectedDuration ? 'bg-gray-500' : 'bg-gray-300'
          } mr-3`}
          onClick={() => setSelectedDuration(duration)}
        >
          {duration} minutes
        </button>
      ))}

      <button
        className="bg-blue-500"
        onClick={generateRoutine}
        disabled={isGenerating}
      >
        {routine ? 'Regenerate' : 'Generate'}
      </button>

      {isGenerating && <div>Generating...</div>}

      {routine && (
        <button onClick={() => setIsPlayingRoutine(true)}>Start</button>
      )}

      {routine && (
        <>
          <h1>Warmup</h1>
          {routine.warmup.map((exercise, index) => (
            <div key={index}>
              <h1>{exercise.exerciseName}</h1>
              <p>{exercise.shortDescription}</p>
              <p>{exercise.durationInSeconds} seconds</p>
            </div>
          ))}
          <h1>Workout</h1>
          {routine.workout.map((exercise, index) => (
            <div key={index}>
              <h1>{exercise.exerciseName}</h1>
              <p>{exercise.shortDescription}</p>
              <p>{exercise.durationInSeconds} seconds</p>
            </div>
          ))}
          <h1>Cooldown</h1>
          {routine.cooldown.map((exercise, index) => (
            <div key={index}>
              <h1>{exercise.exerciseName}</h1>
              <p>{exercise.shortDescription}</p>
              <p>{exercise.durationInSeconds} seconds</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
