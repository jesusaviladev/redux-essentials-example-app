import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = [
    {
        id: '1',
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        title: 'First Post!',
        content: 'Hello!',
        userId: '1',
        reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
    },
    {
        id: '2',
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        title: 'Second Post',
        content: 'More text',
        userId: '0',
        reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
    },
];

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action) => [...state, action.payload],
            prepare: ({ title, content, userId }) => ({
                payload: {
                    id: nanoid(),
                    date: new Date().toISOString(),
                    title,
                    content,
                    userId,
                    reactions: {
                        thumbsUp: 0,
                        hooray: 0,
                        heart: 0,
                        rocket: 0,
                        eyes: 0,
                    },
                },
            }),
        },
        postUpdated: (state, action) => {
            const { postId } = action.payload;

            const editedPostIndex = state.findIndex(
                (post) => post.id === postId
            );

            if (editedPostIndex === -1) return state;

            const newState = [...state];

            newState[editedPostIndex] = {
                ...state[editedPostIndex],
                id: action.payload.postId,
                title: action.payload.title,
                content: action.payload.content,
            };
            return newState;
        },
        reactionAdded: (state, action) => {
            const { postId, reaction } = action.payload;

            const postIndex = state.findIndex((post) => post.id === postId);

            if (postIndex === -1) return state;

            const newState = [...state];

            newState[postIndex] = {
                ...state[postIndex],
                reactions: {
                    ...state[postIndex].reactions,
                    [reaction]: state[postIndex].reactions[reaction] + 1,
                },
            };

            return newState;
        },
    },
});

export const { postAdded, postUpdated, reactionAdded } = postSlice.actions;

export default postSlice.reducer;
