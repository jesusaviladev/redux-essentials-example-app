import { formatDistanceToNow, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users/usersSlice';
import { selectAllNotifications } from './notificationsSlice';

const NotificationsList = () => {
    const notifications = useSelector(selectAllNotifications);
    const users = useSelector(selectAllUsers);

    return (
        <section className="notificationsList">
            <h2>Notifications</h2>
            {notifications.map((notification) => {
                const user = users.find(
                    (user) => user.id === notification.user
                );
                const date = parseISO(notification.date);
                const timeAgo = formatDistanceToNow(date);

                return (
                    <div key={notification.id} className="notification">
                        <div>
                            <b>{user?.name || 'Unknown user'}: </b>
                            {notification.message}
                        </div>
                        <div title={notification.date}>
                            <i>{timeAgo} ago</i>
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

export default NotificationsList;
