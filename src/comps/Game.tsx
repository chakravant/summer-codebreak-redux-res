import './Game.css';
import CodeInput from "./CodeInput";
import Results from "./Results";
import CipherRes from "./CipherRes";
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { gameReset, makeMove } from '../store/logic';
import { showSetup } from '../store/settings';

export default function Game() {
    const game = useAppSelector(s => s.game)
    const dispatch = useAppDispatch()

    const postCode = (_code: number[]) => {
        dispatch(makeMove())
    };
    const resetGame = () => {
        dispatch(showSetup())
        dispatch(gameReset())
    };
    return (
    <>
        <h1>Code Breaker</h1>
        { game.state === 'RUNNING' ? <>
                <h2>Try your skill</h2>
                <CodeInput newCode={postCode} />
          </> : <button onClick={resetGame} className="tryagain">AGAIN</button>
        }
        <h2>Results</h2>
        <div className="container">
        <Results solutions={game.trials}/>
        {game.state !== 'RUNNING' ? (
            game.state === 'FAILED' ? 
                <div className="fail">
                    Sorry, max number of tries exceeded. The code is: 
                    <div><CipherRes numCodes={game.secret} /></div>
                </div> :
                <div className="win">
                    You guessed right
                </div>
            ) : <span/>
        }
        </div>
    </>
    );
}