import { useWindowSize } from '@reactuses/core';
import AnimatedPageContainer from '../shared/AnimatedPageContainer';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';

export default function FinishUI({ resetState }: { resetState: () => void }) {
  const { width, height } = useWindowSize();

  return (
    <AnimatedPageContainer>
      <Confetti width={width} height={height} />
      <h2 className="text-center text-5xl mt-32">🥳🥳🥳</h2>
      <h1 className="text-center text-7xl mt-16">Congrats!</h1>
      <p className="text-center text-4xl mt-16">
        You just made a valuable investment in improving your physical activity,
        keep it up!
      </p>
      <motion.button
        className={`bg-primary text-background w-full rounded-lg p-3 mt-16  mb-32`}
        whileHover={{ scale: 1.05, transition: { duration: 0.25 } }}
        onClick={resetState}
      >
        Return home
      </motion.button>
    </AnimatedPageContainer>
  );
}
