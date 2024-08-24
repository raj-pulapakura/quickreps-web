import React from 'react';

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
          <button
            key={duration}
            className={`${
              selectedDuration === duration ? 'bg-primary' : 'bg-sky-300'
            } text-background w-full py-2 px-4 rounded`}
            onClick={() => setSelectedDuration(duration)}
          >
            {duration} minutes
          </button>
        );
      })}
    </div>
  );
}
