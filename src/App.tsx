import { useState } from 'react';
import AppContainer from './components/shared/AppContainer';
import { Routine } from './types/app/routine';
import RoutineUI from './components/routine/RoutineUI';
import SetupUI from './components/setup/SetupUI';
import { flattenRoutine } from './utils/flattenRoutine';

function App() {
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [isPlayingRoutine, setIsPlayingRoutine] = useState(false);

  return (
    <AppContainer>
      {routine && isPlayingRoutine ? (
        <RoutineUI flattenedRoutine={flattenRoutine(routine)} />
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
