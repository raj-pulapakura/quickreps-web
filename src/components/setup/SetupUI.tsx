import React, { useState } from 'react';
import { Routine } from '../../types/app/routine';
import DurationsOptions from './components/SelectDuration';
import SelectDuration from './components/SelectDuration';
import RoutineList from './components/RoutineList';

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
      <h1 className="font-bold text-3xl text-primary text-center">
        Exercise Snack
      </h1>

      <SelectDuration
        durationOptions={routineDurations}
        selectedDuration={selectedDuration}
        setSelectedDuration={setSelectedDuration}
      />

      <button
        className={`bg-primary text-background w-full mt-16 rounded p-3 disabled:bg-gray-800`}
        onClick={generateRoutine}
        disabled={isGenerating || !selectedDuration}
      >
        {isGenerating ? 'Generating...' : routine ? 'Regenerate' : 'Generate'}
      </button>

      {routine && <RoutineList routine={routine} />}

      {routine && (
        <button
          className={`bg-primary text-background rounded p-3 mt-10 w-full mb-32`}
          onClick={() => setIsPlayingRoutine(true)}
          disabled={isGenerating || !selectedDuration}
        >
          Start
        </button>
      )}
    </div>
  );
}
