import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { postAdded } from './postsSlice';

const CreatePostsForm = () => {
    const users = useSelector((state) => state.users.data);
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        title: {
            value: '',
        },
        content: {
            value: '',
        },
        userId: '',
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

    const setUser = (userId) =>
        setFormValues({
            ...formValues,
            userId,
        });

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            title: formValues.title.value,
            content: formValues.content.value,
            userId: formValues.userId,
        };

        dispatch(postAdded(newPost));
    };

    const isDisabled =
        !formValues.title.value ||
        !formValues.content.value ||
        !formValues.userId;

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
                <div>
                    <select
                        defaultValue={formValues.userId}
                        onChange={(e) => setUser(e.target.value)}
                    >
                        <option disabled value="">
                            Selecciona un usuario
                        </option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button disabled={isDisabled}>Add Post</button>
            </form>
        </section>
    );
};

export default CreatePostsForm;
