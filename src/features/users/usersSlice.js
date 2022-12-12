import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../../api/client';

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.concat(action.payload);
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    },
});

// Thunks

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const users = await client.get('/fakeApi/users');
        return users.data;
    } catch (error) {
        throw new Error(error);
    }
});

// selectors

export const selectAllUsers = (state) => state.users.data;

export const selectUserById = (state, userId) =>
    state.users.data.find((user) => user.id === userId);

export default usersSlice.reducer;
