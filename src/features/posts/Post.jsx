import { memo } from 'react';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';

const Post = ({ id, title, content, date, reactions, user }) => (
    <article className="post-excerpt" key={id}>
        <h3>{title}</h3>
        <p className="post-content">{content.substring(0, 100)}</p>
        <div>
            <PostAuthor userId={user} />
        </div>
        <Link to={`/posts/${id}`} className="button muted-button">
            View Post
        </Link>
        <TimeAgo timestamp={date} />
        <ReactionButtons postReactions={reactions} postId={id} />
    </article>
);

export default memo(Post);
