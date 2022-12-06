import { useSelector } from 'react-redux';

const PostAuthor = ({ userId }) => {
    const user = useSelector((state) =>
        state.users.data.find((user) => user.id === userId)
    );

    return <span>Post author: {user ? user.name : 'Unknown author'}</span>;
};

export default PostAuthor;
