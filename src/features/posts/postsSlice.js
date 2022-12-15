import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit';
import { client } from '../../api/client';

const postAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postAdapter.getInitialState({
    status: 'idle',
    error: null,
});

// Reducer

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postUpdated: (state, action) => {
            const { postId } = action.payload;

            const editedPost = state.entities[postId];

            if (!editedPost) return state;

            editedPost.title = action.payload.title;
            editedPost.content = action.payload.content;
        },
        reactionAdded: (state, action) => {
            const { postId, reaction } = action.payload;

            const existingPost = state.entities[postId];

            if (!existingPost) return state;

            existingPost.reactions[reaction]++;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                postAdapter.upsertMany(state, action.payload);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                postAdapter.addOne(state, action.payload);
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

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds,
} = postAdapter.getSelectors((state) => state.posts);

export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter((post) => post.user === userId)
);

export default postSlice.reducer;
