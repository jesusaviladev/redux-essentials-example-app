import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import EditPostsForm from './features/posts/EditPostForm';
import CreatePostsForm from './features/posts/CreatePostsForm';
import PostsList from './features/posts/PostsList';
import SinglePostPage from './features/posts/SinglePostPage';
import UsersList from './features/users/UsersList.jsx';
import UserPage from './features/users/UserPage.jsx';
import NotificationsList from './features/notifications/NotificationsList.jsx';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="App">
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <>
                                <CreatePostsForm />
                                <PostsList />
                            </>
                        )}
                    />
                    <Route
                        exact
                        path="/posts/:postId"
                        component={SinglePostPage}
                    />
                    <Route
                        exact
                        path="/editPost/:postId"
                        component={EditPostsForm}
                    />
                    <Route exact path="/users" component={UsersList} />
                    <Route exact path="/users/:userId" component={UserPage} />
                    <Route
                        exact
                        path="/notifications"
                        component={NotificationsList}
                    />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
