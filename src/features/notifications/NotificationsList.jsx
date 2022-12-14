import { formatDistanceToNow, parseISO } from 'date-fns';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllUsers } from '../users/usersSlice';
import {
    allNotificationsRead,
    selectAllNotifications,
} from './notificationsSlice';

const NotificationsList = () => {
    const notifications = useSelector(selectAllNotifications);
    const users = useSelector(selectAllUsers);

    const dispatch = useDispatch();

    useLayoutEffect(() => {
        dispatch(allNotificationsRead());
    });

    return (
        <section className="notificationsList">
            <h2>Notifications</h2>
            {notifications.map((notification) => {
                const user = users.find(
                    (user) => user.id === notification.user
                );
                const date = parseISO(notification.date);
                const timeAgo = formatDistanceToNow(date);

                const notificationClassname = notification.isNew
                    ? 'notification new'
                    : 'notification';
                return (
                    <div
                        key={notification.id}
                        className={notificationClassname}
                    >
                        <div>
                            <b>{user?.name || 'Unknown user'}: </b>
                            {notification.message}
                        </div>
                        <div title={notification.date}>
                            <i>{timeAgo} ago</i>
                        </div>
                        {notification.date}
                    </div>
                );
            })}
        </section>
    );
};

export default NotificationsList;
