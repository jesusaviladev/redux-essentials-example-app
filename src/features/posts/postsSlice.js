import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    loading: false,
    error: false,
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action) => ({
                ...state,
                data: [...state.data, action.payload],
            }),
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

            const editedPostIndex = state.data.findIndex(
                (post) => post.id === postId
            );

            if (editedPostIndex === -1) return state;

            const newState = { ...state, data: [...state.data] };

            newState.data[editedPostIndex] = {
                ...state.data[editedPostIndex],
                id: action.payload.postId,
                title: action.payload.title,
                content: action.payload.content,
            };
            return newState;
        },
        reactionAdded: (state, action) => {
            const { postId, reaction } = action.payload;

            const postIndex = state.data.findIndex(
                (post) => post.id === postId
            );

            if (postIndex === -1) return state;

            const newState = {
                ...state,
                data: [...state.data],
            };

            newState.data[postIndex] = {
                ...state.data[postIndex],
                reactions: {
                    ...state.data[postIndex].reactions,
                    [reaction]: state.data[postIndex].reactions[reaction] + 1,
                },
            };

            return newState;
        },
    },
});

export const { postAdded, postUpdated, reactionAdded } = postSlice.actions;

// Selectors

export const selectAllPosts = (state) => state.posts.data;

export const selectPostById = (state, postId) =>
    state.posts.data.find((post) => post.id === postId);

export default postSlice.reducer;
