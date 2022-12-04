import { useDispatch } from 'react-redux';
import { reactionAdded } from './postsSlice.js';

const REACTION_EMOJIS = {
	thumbsUp: '👍',
	hooray: '🎉',
	heart: '❤️',
	rocket: '🚀',
	eyes: '👀',
};

const ReactionButtons = ({ post }) => {
	const dispatch = useDispatch();

	const reactionButtons = Object.entries(REACTION_EMOJIS).map(
		([reactionName, emoji]) => (
			<button
				key={reactionName}
				type="button"
				className="muted-button reaction-button"
				onClick={() =>
					dispatch(
						reactionAdded({
							postId: post.id,
							reaction: reactionName,
						})
					)
				}
			>
				{emoji} {post.reactions[reactionName]}
			</button>
		)
	);

	return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
