import { connect, ConnectedProps } from 'react-redux';
import React from 'react';
import { startGame } from '../store/logic';
import { setRepetitions, setTries, showGame } from '../store/settings';
import './Setup.css';
import { RootState } from '../store/store';

const connector = connect(
    (state: RootState) => ({
        tries: state.settings.tries, 
        repetitions: state.settings.repetitions
    }),
    {
        setTries, setRepetitions, startGame, showGame
    }
)
type Props = ConnectedProps<typeof connector>

function setup_render({
    tries, repetitions, setTries, setRepetitions, startGame, showGame
} : Props) {
    const updateDiff:React.ChangeEventHandler<HTMLInputElement> = e => {
        const diff = e.target.valueAsNumber;
        if (diff >= 1 || diff <= 5) {
            setTries(11 - diff);
        }
    };
    const updateRpt:React.ChangeEventHandler<HTMLInputElement> = e => {
        const repetitions = e.target.checked;
        setRepetitions(repetitions);
    };
    const start = () => {
        startGame({repetitions, tries})
        showGame()
    }
    
    return (
        <>
        <h1>Code Breaker</h1>
        <h2>Game settings</h2>
        <div className='config'>
            <p>
                <label>Difficulty (1-5)
                    <input type="number" 
                           max="5" 
                           min="1" 
                           value={11 - tries} 
                           onChange={updateDiff}/>
                </label>
            </p>
            <p>
                <label>
                    <input type="checkbox" 
                           checked={repetitions}
                           onChange={updateRpt}/> 
                    Repetitions allowed
                </label>
            </p>
            <button onClick={start}>
                Start
            </button>
        </div>
        </>
    );
}

const Setup = connector(setup_render)

export default Setup
