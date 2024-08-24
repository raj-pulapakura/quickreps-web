import React, { useState } from 'react';
import { Routine } from '../../types/app/routine';
import SelectDuration from './components/SelectDuration';
import RoutineList from './components/RoutineList';
import { motion } from 'framer-motion';
import AnimatedPageContainer from '../shared/AnimatedPageContainer';
import { useSnackbar } from 'notistack';

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

  const { enqueueSnackbar } = useSnackbar();

  async function generateRoutine() {
    setIsGenerating(true);
    setRoutine(null);

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
      enqueueSnackbar(
        'It seems there was an error generating the routine. Please try again.',
        { variant: 'error', autoHideDuration: 5000 }
      );
    }
    setIsGenerating(false);
  }

  return (
    <AnimatedPageContainer>
      <div className="flex items-center gap-4 justify-center">
        <img src="/images/logo.png" />
        <h1 className="font-bold text-7xl uppercase italic text-wrap text-primary text-center">
          QUICKREPS
        </h1>
      </div>

      <SelectDuration
        durationOptions={routineDurations}
        selectedDuration={selectedDuration}
        setSelectedDuration={setSelectedDuration}
      />

      <div className="flex">
        <motion.button
          className={`bg-primary text-background rounded-lg p-3 mx-auto my-16 disabled:bg-gray-800 ${
            isGenerating ? 'w-[50px] h-[50px] animate-spin' : 'w-full'
          }`}
          whileHover={
            isGenerating
              ? {}
              : {
                  scale: 1.05,
                  transition: { duration: 0.25 },
                }
          }
          layout
          onClick={generateRoutine}
          disabled={isGenerating || !selectedDuration}
        >
          {isGenerating ? '' : routine ? 'Regenerate' : 'Generate'}
        </motion.button>
      </div>

      {routine && <RoutineList routine={routine} />}

      {routine && (
        <motion.button
          className={`bg-primary text-background w-full rounded-lg p-3 mt-16  mb-32`}
          onClick={() => setIsPlayingRoutine(true)}
          whileHover={{ scale: 1.05, transition: { duration: 0.25 } }}
          disabled={isGenerating || !selectedDuration}
        >
          Start
        </motion.button>
      )}
    </AnimatedPageContainer>
  );
}
