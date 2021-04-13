import React, { createContext, useEffect, useState } from 'react';

import initialStore from './initialStore';
import uniqueId from './uniqueId';

export const StoreContext = createContext();

function StoreContextProvider(props) {
    const [store, setStore] = useState(() => {
        return JSON.parse(window.localStorage.getItem('store')) || initialStore;
    });

    useEffect(() => {
        window.localStorage.setItem('store', JSON.stringify(store));
    }, [store]);

    function addComment(postId, text) {
        const comment = {
            userId: store.currentUserId, 
            postId,
            text,
            datetime: new Date().toISOString()
        };

        setStore({
            ...store,
            comments: store.comments.concat(comment)
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
        <StoreContext.Provider value={{...store, addComment, addFollower, addPost, addLike, removeFollower, removeLike}}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;