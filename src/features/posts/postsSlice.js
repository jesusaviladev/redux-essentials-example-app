import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [
    {
        id: '1',
        date: '2022-11-30',
        title: 'First Post!',
        content: 'Hello!',
        userId: '1',
    },
    {
        id: '2',
        date: '2022-12-01',
        title: 'Second Post',
        content: 'More text',
        userId: '0',
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
                userId: state[editedPostIndex].userId,
            };
            return newState;
        },
    },
});

export const { postAdded, postUpdated } = postSlice.actions;

export default postSlice.reducer;
