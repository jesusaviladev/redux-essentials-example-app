import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../../api/client';

//reducers

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: [],
    reducers: {
        allNotificationsRead: (state) => {
            state.forEach((notification) => {
                notification.read = true;
            });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            const notificationsWithMetadata = action.payload.map(
                (notification) => ({
                    ...notification,
                    read: false,
                    isNew: true,
                })
            );

            state.forEach((notification) => {
                notification.isNew = !notification.read;
            });

            state.push(...notificationsWithMetadata);

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

export const { allNotificationsRead } = notificationsSlice.actions;

// selectors

export const selectAllNotifications = (state) => state.notifications;

export default notificationsSlice.reducer;
