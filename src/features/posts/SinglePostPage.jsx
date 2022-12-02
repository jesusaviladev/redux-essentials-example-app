import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import PostAuthor from './PostAuthor';

const SinglePostPage = () => {
    const { postId } = useParams();

    const post = useSelector((state) =>
        state.posts.find((post) => post.id === postId)
    );

    if (!post) return <section>Not found post</section>;

    return (
        <section>
            <article className="post">
                <h2>{post.title}</h2>
                <p className="post-content">{post.content}</p>
                <div>
                    <PostAuthor userId={post.userId} />
                </div>
                <Link to={`/editPost/${post.id}`} className="button">
                    Edit Post
                </Link>
            </article>
        </section>
    );
};

export default SinglePostPage;
