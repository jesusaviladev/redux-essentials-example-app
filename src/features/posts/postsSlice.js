import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { client } from '../../api/client';

const initialState = {
    data: [],
    status: 'idle',
    error: null,
};

// Reducer

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
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = state.data.concat(action.payload);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

// Action creators

export const { postAdded, postUpdated, reactionAdded } = postSlice.actions;

// Thunks (async logic)

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await client.get('/fakeApi/posts');
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
});

// Selectors

export const selectAllPosts = (state) => state.posts.data;

export const selectPostById = (state, postId) =>
    state.posts.data.find((post) => post.id === postId);

export default postSlice.reducer;
