import {
    createAsyncThunk,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit';
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
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.data.push(action.payload);
            });
    },
});

// Action creators

export const { postUpdated, reactionAdded } = postSlice.actions;

// Thunks (async logic)

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await client.get('/fakeApi/posts');
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
});

export const addNewPost = createAsyncThunk(
    'posts/addedNewPost',
    async (newPost) => {
        const response = await client.post('/fakeApi/posts', newPost);
        return response.data;
    }
);

// Selectors

export const selectAllPosts = (state) => state.posts.data;

export const selectPostById = (state, postId) =>
    state.posts.data.find((post) => post.id === postId);

export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter((post) => post.user === userId)
);

export default postSlice.reducer;
