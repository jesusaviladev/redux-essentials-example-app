import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import { Navbar } from './app/Navbar';
import EditPostsForm from './features/posts/EditPostForm';
import CreatePostsForm from './features/posts/CreatePostsForm';
import PostsList from './features/posts/PostsList';
import SinglePostPage from './features/posts/SinglePostPage';

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
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
