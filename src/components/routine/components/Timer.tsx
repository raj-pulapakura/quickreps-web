export default function Timer({
  totalTime,
  remainingTime,
}: {
  totalTime: number;
  remainingTime: number;
}) {
  const containerWidth = 200;
  const containerHeight = 120; // this should be a little bit bigger than radius*2; if you change radius, change this accordingly
  const strokeWidth = 5; // modify this value to change the thickness of the timer
  const radius = 50; // modify this value to change the size of the timer
  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className={`relative  w-[${containerWidth}px] h-[${containerHeight}px] `}
    >
      <svg viewBox={`0 0 ${containerWidth} ${containerHeight}`}>
        <circle
          className="text-gray-200 stroke-current"
          strokeWidth={strokeWidth}
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="transparent"
        />
        <circle
          className="text-primary stroke-current"
          strokeWidth={strokeWidth}
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - remainingTime / totalTime)}
          transform={`rotate(-90 ${centerX} ${centerY})`}
        />
      </svg>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <span className="text-5xl font-bold">{Math.ceil(remainingTime)}</span>
      </div>
    </div>
  );
}
