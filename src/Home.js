import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { findComments, findLikes, findUser } from './find';
import { StoreContext } from './StoreContext';

import Post from './Post';

function Home() {
    const {posts, users, comments, likes, currentUserId, addComment, addLike, removeLike} = useContext(StoreContext);
    const {postId} = useParams();

    return (
        <div>
            {posts.filter(post => (
                postId ? post.id === postId : true
            )).sort((a, b) => (
                new Date(b.datetime) - new Date(a.datetime)
            )).map(post => (
                <Post
                    key={post.id}
                    user={findUser(post.userId, users)}
                    likes={findLikes(post, likes, currentUserId)}
                    post={post}
                    comments={findComments(post, comments)}
                    onLike={addLike} 
                    onUnlike={removeLike}
                    onComment={addComment}
                />
            ))}
        </div>
    );
}

export default Home;