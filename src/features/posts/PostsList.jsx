import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';

const PostsList = () => {
    const posts = useSelector((state) => state.posts);

    return (
        <section>
            <h2>Posts</h2>
            {posts.map((post) => (
                <article className="post-excerpt" key={post.id}>
                    <h3>{post.title}</h3>
                    <p className="post-content">
                        {post.content.substring(0, 100)}
                    </p>
                    <div>
                        <PostAuthor userId={post.userId} />
                    </div>
                    <Link
                        to={`/posts/${post.id}`}
                        className="button muted-button"
                    >
                        View Post
                    </Link>
                </article>
            ))}
        </section>
    );
};

export default PostsList;
