import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [
    { id: '1', title: 'First Post!', content: 'Hello!' },
    { id: '2', title: 'Second Post', content: 'More text' },
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
                    title,
                    content,
                    userId,
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
                id: action.payload.postId,
                title: action.payload.title,
                content: action.payload.content,
            };
            return newState;
        },
    },
});

export const { postAdded, postUpdated } = postSlice.actions;

export default postSlice.reducer;
