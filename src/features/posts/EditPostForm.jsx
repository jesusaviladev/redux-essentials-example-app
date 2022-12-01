import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { postUpdated } from './postsSlice';

const EditPostsForm = () => {
    const { postId } = useParams();
    const history = useHistory();

    const post = useSelector((state) =>
        state.posts.find((post) => post.id === postId)
    );

    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        title: {
            value: post.title,
        },
        content: {
            value: post.content,
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

        dispatch(
            postUpdated({
                postId,
                title: formValues.title.value,
                content: formValues.content.value,
            })
        );

        history.push(`/posts/${postId}`);
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
                <button>Save</button>
            </form>
        </section>
    );
};

export default EditPostsForm;
