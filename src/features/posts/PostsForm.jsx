import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postAdded } from './postsSlice';

const PostsForm = () => {
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        title: {
            value: '',
        },
        content: {
            value: '',
        },
    });

    const setPostTitle = (postTitle) =>
        setFormValues({
            ...formValues,
            title: {
                value: postTitle,
            },
        });

    const setPostContent = (postContent) =>
        setFormValues({
            ...formValues,
            content: {
                value: postContent,
            },
        });

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            title: formValues.title.value,
            content: formValues.content.value,
        };

        dispatch(postAdded(newPost));
    };

    return (
        <section>
            <h2>Add new Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        value={formValues.title.value}
                        placeholder="Post title"
                        onChange={(e) => setPostTitle(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={formValues.content.value}
                        placeholder="Post content"
                        onChange={(e) => setPostContent(e.target.value)}
                    />
                </div>
                <button>Add Post</button>
            </form>
        </section>
    );
};

export default PostsForm;
