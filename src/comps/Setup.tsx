import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { startGame } from '../store/logic';
import { setRepetitions, setTries, showGame } from '../store/settings';
import './Setup.css';

export default function Setup() {
    const setup = useAppSelector(state=> state.settings)
    const dispatch = useAppDispatch()

    const updateDiff:React.ChangeEventHandler<HTMLInputElement> = e => {
        const diff = e.target.valueAsNumber;
        if (diff >= 1 || diff <= 5) {
            dispatch(setTries(11 - diff));
        }
    };
    const updateRpt:React.ChangeEventHandler<HTMLInputElement> = e => {
        const repetitions = e.target.checked;
        dispatch(setRepetitions(repetitions));
    };
    const start = () => {
        dispatch(startGame({repetitions: setup.repetitions, tries: setup.tries}))
        dispatch(showGame())
    }
    
    return (
        <>
        <h1>MASTERMIND</h1>
        <h2>Game settings</h2>
        <div className='config'>
            <p>
                <label>Difficulty (1-5)
                    <input type="number" 
                           max="5" 
                           min="1" 
                           value={11 - setup.tries} 
                           onChange={updateDiff}/>
                </label>
            </p>
            <p>
                <label>
                    <input type="checkbox" 
                           checked={setup.repetitions}
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