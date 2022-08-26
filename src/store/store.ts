import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from './settings'
import gameReducer from './logic'

const store = configureStore({
    reducer: {
        settings: settingsReducer,
        game: gameReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
