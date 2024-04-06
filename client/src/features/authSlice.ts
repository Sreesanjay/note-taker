import { createSlice } from "@reduxjs/toolkit";
import API from "../api"
import { IUser } from "../types";
import { signup, signin } from "../service/authService";

interface AuthState {
    user: IUser | null;
    isLoading: boolean;
    isError: boolean;
    status: number | null;
    errorMessage: string;
    isSuccess: boolean;
}
const user = localStorage.getItem("user");
const initialState: AuthState = {
    user: user ? JSON.parse(user) : null,
    isLoading: false,
    isError: false,
    errorMessage: "",
    isSuccess: false,
    status: null,
};
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.errorMessage = "";
            state.isSuccess = false;
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            API.defaults.headers.common['Authorization'] = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user;
                localStorage.setItem("user", JSON.stringify(action.payload.user));
                localStorage.setItem("token", JSON.stringify(action.payload.token));
            })
            .addCase(signin.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                const error = action.payload as {
                    message: string;
                    status: number;
                };
                state.errorMessage = error?.message;
                state.status = error?.status;
            })
            .addCase(signup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user;
                localStorage.setItem("user", JSON.stringify(action.payload.user));
                localStorage.setItem("token", JSON.stringify(action.payload.token));
            })
            .addCase(signup.rejected, (state, action) => {
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
export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;