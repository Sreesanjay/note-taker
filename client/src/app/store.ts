import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/authSlice"
import noteReducer from "../features/notesSlice"
export const store = configureStore({
    reducer: {
        auth: authReducer,
        notes: noteReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch