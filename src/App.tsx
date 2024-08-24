import { useState } from 'react';
import AppContainer from './components/shared/AppContainer';
import { Routine } from './types/app/routine';
import RoutineUI from './components/routine/RoutineUI';
import SetupUI from './components/setup/SetupUI';
import { flattenRoutine } from './utils/flattenRoutine';
import FinishUI from './components/finish/FinishUI';

function App() {
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [isPlayingRoutine, setIsPlayingRoutine] = useState(false);
  const [isCompletedRoutine, setIsCompletedRoutine] = useState(false);

  return (
    <AppContainer>
      {isCompletedRoutine ? (
        <FinishUI
          resetState={() => {
            setRoutine(null);
            setIsPlayingRoutine(false);
            setIsCompletedRoutine(false);
          }}
        />
      ) : routine && isPlayingRoutine ? (
        <RoutineUI
          flattenedRoutine={flattenRoutine(routine)}
          setIsCompletedRoutine={setIsCompletedRoutine}
        />
      ) : (
        <SetupUI
          routine={routine}
          setRoutine={setRoutine}
          setIsPlayingRoutine={setIsPlayingRoutine}
        />
      )}
    </AppContainer>
  );
}

export default App;
