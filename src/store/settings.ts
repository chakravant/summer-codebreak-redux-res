import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Screen = 'SETUP' | 'GAME'

export interface ISettings {
    repetitions: boolean
    tries: number
    screen: Screen
}

const initialState: ISettings = {repetitions: true, tries: 10, screen: 'SETUP'}

export const settings = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setRepetitions: (state, action: PayloadAction<boolean>) => {
            state.repetitions = action.payload
        },
        setTries: (state, action: PayloadAction<number>) => {
            state.tries = action.payload
        },
        setScreen: (state, action: PayloadAction<Screen>) => {
            state.screen = action.payload
        },
        showSetup: (state) => {
            state.screen = 'SETUP'
        },
        showGame: (state) => {
            state.screen = 'GAME'
        }
    }
});

export const { setRepetitions, setTries , setScreen, showGame, showSetup } = settings.actions
export default settings.reducer
