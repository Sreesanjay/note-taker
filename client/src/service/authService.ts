import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit"
import { ErrorObject } from "../types";
import API from "../api"


export const signup = createAsyncThunk(
    "auth/signup",
    async (userData: { email: string, password: string }, thunkAPI) => {
        try {
            const { data } = await API.post('/signup', userData);
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

export const signin = createAsyncThunk(
    "auth/signin",
    async (userData: { email: string, password: string }, thunkAPI) => {
        try {
            const { data } = await API.post("/signin", userData);
            return data;
        } catch (error: unknown) {
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