import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../components/Spinner';
import Post from './Post';
import { fetchPosts, selectAllPosts } from './postsSlice';

const PostsList = () => {
    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);

    const postsQueryStatus = useSelector((state) => state.posts.status);

    const error = useSelector((state) => state.posts.error);

    useEffect(() => {
        if (postsQueryStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [dispatch, postsQueryStatus]);

    const sortedPosts = posts
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date));

    if (postsQueryStatus === 'loading') return <Spinner text="Loading" />;

    const content = getPostsContents(sortedPosts, error);

    return (
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    );
};

const getPostsContents = (posts, error) => {
    if (!error && posts.length === 0) return <div>No hay posts publicados</div>;

    if (!error) return posts.map((post) => <Post key={post.id} {...post} />);

    return <div>Error al cargar los posts</div>;
};

export default PostsList;
