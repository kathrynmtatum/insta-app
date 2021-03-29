import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import css from './App.module.css';
import { findFollowers, findFollowing, findPosts, findUser } from './find';
import initialStore from './initialStore';
import uniqueId from './uniqueId';

import Activity from './Activity';
import Explore from './Explore';
import Header from './Header';
import Home from './Home';
import Navbar from './Navbar';
import NewPost from './NewPost';
import Profile from './Profile';

function App() {
  const [store, setStore] = useState(initialStore);

  function addComment(postId, text) {
    const comment = {
      userId: store.currentUserId, 
      postId,
      text,
      datetime: new Date().toISOString()
    };

    setStore({
      ...store,
      comments:store.comments.concat(comment)
    });
  }

  function addFollower(userId) {
    const newFollower = {
      userId,
      followerId: store.currentUserId
    }
    setStore({
      ...store,
      followers: store.followers.concat(newFollower)
    });
  }

  function addPost(photo, desc) {
    if (!photo) {
      throw new TypeError('Photo required');
    }
    const newPost = {
      id: uniqueId('post'),
      userId: store.currentUserId,
      photo,
      desc,
      datetime: new Date().toISOString()
    };
    setStore({
      ...store,
      posts: store.posts.concat(newPost)
    });
  }

  function addLike(postId) {
    const like = {
      userId: store.currentUserId, 
      postId,
      datetime: new Date().toISOString()
    };
    
    setStore({
      ...store,
      likes: store.likes.concat(like)
    });
  }

  function removeFollower(userId) {
    setStore({
      ...store,
      followers: store.followers.filter(follower => !(follower.followerId === store.currentUserId && follower.userId === userId))
    });
  }

  function removeLike(postId) {
    setStore({
      ...store,
      likes: store.likes.filter(like => !(like.userId === store.currentUserId && like.postId === postId))
    });
  }

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className={css.container}>
        <Header/>
        <main className={css.content}>
          <Switch>
            <Route path="/explore">
              <Explore/>
            </Route>
            <Route path="/newpost">
              <NewPost
                store={store}
                addPost={addPost}
              />
            </Route>
            <Route path="/activity">
              <Activity/>
            </Route>
            <Route path="/profile/:userId?">
              <Profile
                store={store}
                onFollow={addFollower}
                onUnfollow={removeFollower}
              />
            </Route>
            <Route path="/:postId?">
              <Home
                store={store}
                onLike={addLike} 
                onUnlike={removeLike}
                onComment={addComment}
              />
            </Route>
          </Switch>
        </main>
        <Navbar/>
      </div>
    </Router>
  );
}

export default App;