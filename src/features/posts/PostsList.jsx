import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons.jsx';

const PostsList = () => {
    const posts = useSelector((state) => state.posts);

    const sortedPosts = posts
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date));

    return (
        <section>
            <h2>Posts</h2>
            {sortedPosts.map((post) => (
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
                    <TimeAgo timestamp={post.date} />
                    <ReactionButtons post={post} />
                </article>
            ))}
        </section>
    );
};

export default PostsList;
