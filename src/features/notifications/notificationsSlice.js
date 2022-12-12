import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../../api/client';

//reducers

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: [],
    reducer: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            state.push(...action.payload);
            // Sort with newest first
            state.sort((a, b) => b.date.localeCompare(a.date));
        });
    },
});

// thunks

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (_, { getState }) => {
        const allNotifications = selectAllNotifications(getState());

        const [latestNotification] = allNotifications;

        const latestTimestamp = latestNotification
            ? latestNotification.date
            : '';

        const response = await client.get(
            `/fakeApi/notifications?since=${latestTimestamp}`
        );
        return response.data;
    }
);

// selectors

export const selectAllNotifications = (state) => state.notifications;

export default notificationsSlice.reducer;
