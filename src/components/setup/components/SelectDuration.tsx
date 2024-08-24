import React from 'react';
import { motion } from 'framer-motion';

export default function SelectDuration({
  durationOptions,
  selectedDuration,
  setSelectedDuration,
}: {
  durationOptions: number[];
  selectedDuration: number | null;
  setSelectedDuration: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  return (
    <div className="mt-16 flex w-full justify-between gap-3">
      {durationOptions.map((duration) => {
        return (
          <motion.button
            key={duration}
            onClick={() => setSelectedDuration(duration)}
            className={`${
              selectedDuration === duration ? 'bg-primary' : 'bg-sky-300'
            } text-background w-full py-2 px-4 rounded-lg`}
            layout
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.25 },
            }}
          >
            {duration} minutes
          </motion.button>
        );
      })}
    </div>
  );
}
