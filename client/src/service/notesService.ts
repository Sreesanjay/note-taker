import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit"
import { ErrorObject } from "../types";
import API from "../api"


export const createNote = createAsyncThunk(
    "notes/createNote",
    async (note: { title: string, note: string }, thunkAPI) => {
        try {
            const { data } = await API.post('/notes', note);
            return data;
        } catch (error) {
            let payload: ErrorObject | null = null;
            if (axios.isAxiosError(error)) {
                payload = {
                    message: error.response?.data?.message,
                    status: error.response?.status
                };
            } else {
                payload = {
                    message: 'Unknown Error',
                    status: 500
                }
            }
            return thunkAPI.rejectWithValue(payload);
        }
    }
)

export const updateNote = createAsyncThunk(
    "notes/updateNote",
    async ({ note, id }: { note: { title?: string, note?: string, isPinned?: boolean }, id: string }, thunkAPI) => {
        try {
            const { data } = await API.put(`/notes/${id}`, note);
            return data;
        } catch (error) {
            let payload: ErrorObject | null = null;
            if (axios.isAxiosError(error)) {
                payload = {
                    message: error.response?.data?.message,
                    status: error.response?.status
                };
            } else {
                payload = {
                    message: 'Unknown Error',
                    status: 500
                }
            }
            return thunkAPI.rejectWithValue(payload);
        }
    }
)
export const deleteNote = createAsyncThunk(
    "notes/deleteNote",
    async (id: string, thunkAPI) => {
        try {
            const { data } = await API.delete(`/notes/${id}`);
            return data;
        } catch (error) {
            let payload: ErrorObject | null = null;
            if (axios.isAxiosError(error)) {
                payload = {
                    message: error.response?.data?.message,
                    status: error.response?.status
                };
            } else {
                payload = {
                    message: 'Unknown Error',
                    status: 500
                }
            }
            return thunkAPI.rejectWithValue(payload);
        }
    }
)
export const getNotes = createAsyncThunk(
    "notes/getNotes",
    async (search: string, thunkAPI) => {
        try {
            const { data } = await API.get(`/notes?search=${search}`);
            return data;
        } catch (error) {
            let payload: ErrorObject | null = null;
            if (axios.isAxiosError(error)) {
                payload = {
                    message: error.response?.data?.message,
                    status: error.response?.status
                };
            } else {
                payload = {
                    message: 'Unknown Error',
                    status: 500
                }
            }
            return thunkAPI.rejectWithValue(payload);
        }
    }
)