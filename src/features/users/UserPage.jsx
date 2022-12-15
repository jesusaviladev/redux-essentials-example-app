import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectPostsByUser } from '../posts/postsSlice';
import { selectUserById } from './usersSlice';

const UserPage = () => {
    const { userId } = useParams();

    const user = useSelector((state) => selectUserById(state, userId));

    const userPosts = useSelector((state) => selectPostsByUser(state, userId));

    if (!user || !userId) {
        return <p>El usuario no pudo ser encontrado</p>;
    }

    return (
        <section>
            <h2>{user.name}</h2>
            <h3>Posts</h3>
            <ul>
                {userPosts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/posts/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default UserPage;
