import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        role: null,
        isLoading: true // Indicates whether the auth state is being determined
    },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
            state.isLoading = false;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.role = null;
            state.isLoading = false;
        },
        changeRole(state, action) {
            state.role = action.payload;
        },
        setLoading(state, action) {
            state.isLoading = action.payload;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;