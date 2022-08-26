
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { random_seq, calculate, EAnswer } from '../engine/master';


export interface ITrial {
    trial: number
    code: number[]
    answer: EAnswer[]
}

export type State = 'FAILED' | 'SUCCEED' | 'RUNNING' | 'IDLE'

export interface IGame {
    rounds: number
    trials: ITrial[]
    state: State
    secret: number[]
    currentAnswer: number[]
}

export interface IGameStart {
    repetitions: boolean;
    tries: number;
}

const initialState: IGame = { trials: [], state: 'IDLE', secret: [], currentAnswer: [], rounds: 0 }

export const game = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state, action: PayloadAction<IGameStart>) => {
            state.secret = random_seq(6, 9, 0, action.payload.repetitions)
            state.rounds = action.payload.tries
            state.trials = []
            state.currentAnswer = []
            state.state = 'RUNNING'
        },
        makeMove: (state) => {
            const move = state.currentAnswer;
            if (move.length < 6 || state.state !== 'RUNNING') 
                return;
            const scr = state.secret
            const answer = calculate(scr, move)
            state.currentAnswer = []
            state.trials.push({trial: state.trials.length +1, code: move, answer})
            const win = answer.reduce((acc, x) => acc && x === EAnswer.Hit, true)
            if (win) {
                state.state = 'SUCCEED';
            } else if (state.trials.length >= state.rounds) {
                state.state =  'FAILED';
            }
        },
        gameReset: (state) => {
            state.secret = []
            state.trials = []
            state.currentAnswer = []
            state.state = 'IDLE'
        },
        updateAnswer: (state, action: PayloadAction<number[]>) => {
            if (state.state !== 'RUNNING') 
                return;
            
            state.currentAnswer = action.payload
        }
    }
});

export const { startGame, updateAnswer, makeMove, gameReset } = game.actions
export default game.reducer
