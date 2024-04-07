import { createSlice } from "@reduxjs/toolkit";
import { INote } from "../types";
import { createNote, deleteNote, getNotes, updateNote } from "../service/notesService";
interface AuthState {
    notes: INote[] | [];
    currentNote: INote | null;
    isLoading: boolean;
    isError: boolean;
    status: number | null;
    errorMessage: string;
    isSuccess: boolean;
}
const initialState: AuthState = {
    notes: [],
    currentNote: null,
    isLoading: false,
    isError: false,
    errorMessage: "",
    isSuccess: false,
    status: null,
};
export const noteSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.errorMessage = "";
            state.isSuccess = false;
        },
        resetNote: (state) => {
            state.notes = [];
            state.currentNote = null;
        },
        setCurrentNote: (state, action) => {
            state.currentNote = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNote.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.notes = [action.payload.note, ...state.notes];
                state.currentNote = action.payload.note;
            })
            .addCase(createNote.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                const error = action.payload as {
                    message: string;
                    status: number;
                };
                state.errorMessage = error?.message;
                state.status = error?.status;
            })
            .addCase(getNotes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.notes = action.payload.notes
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                const error = action.payload as {
                    message: string;
                    status: number;
                };
                state.errorMessage = error?.message;
                state.status = error?.status;
            })
            .addCase(updateNote.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.notes = state.notes.filter((item) => {
                    if (item._id !== action.payload.note._id) {
                        return item;
                    }
                })
                state.notes = [action.payload.note, ...state.notes]
                state.currentNote = action.payload.note;
            })
            .addCase(updateNote.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                const error = action.payload as {
                    message: string;
                    status: number;
                };
                state.errorMessage = error?.message;
                state.status = error?.status;
            })
            .addCase(deleteNote.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.notes = state.notes.filter((item) => {
                    if (item._id !== action.payload.note._id) {
                        return item;
                    }

                })
                state.currentNote = null;
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                const error = action.payload as {
                    message: string;
                    status: number;
                };
                state.errorMessage = error?.message;
                state.status = error?.status;
            })
    }
});
export const { reset, setCurrentNote, resetNote } = noteSlice.actions;
export default noteSlice.reducer;