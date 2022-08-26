import './App.css';
import Game from './comps/Game';
import Setup from './comps/Setup';
import { useAppSelector } from './store/hooks';

function App() {
  const screenName = useAppSelector(s => s.settings.screen)
  return (
    <div className="App">
      { screenName === 'SETUP' ? <Setup/> : <Game/> }
    </div>
  );
}

export default App;
