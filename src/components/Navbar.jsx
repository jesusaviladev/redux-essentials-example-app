import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    fetchNotifications,
    selectAllNotifications,
} from '../features/notifications/notificationsSlice';

const Navbar = () => {
    const dispatch = useDispatch();

    const notifications = useSelector(selectAllNotifications);
    const numUnreadNotifications = notifications.filter((n) => !n.read).length;

    return (
        <nav>
            <section>
                <h1>Redux Essentials Example</h1>

                <div className="navContent">
                    <div className="navLinks">
                        <Link to="/">Posts</Link>
                        <Link to="/users">Users</Link>
                        <Link to="/notifications">
                            Notifications{' '}
                            {numUnreadNotifications >= 0 && (
                                <span className="badge">
                                    {numUnreadNotifications}
                                </span>
                            )}
                        </Link>
                    </div>
                    <button
                        className="button"
                        onClick={() => dispatch(fetchNotifications())}
                    >
                        Refresh Notifications
                    </button>
                </div>
            </section>
        </nav>
    );
};

export default Navbar;
