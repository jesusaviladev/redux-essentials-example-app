const { useSelector } = require('react-redux');

const PostAuthor = ({ userId }) => {
    const user = useSelector((state) =>
        state.users.find((user) => user.id === userId)
    );

    return <span>Post author: {user.name ? user.name : 'Unknown'}</span>;
};

export default PostAuthor;
