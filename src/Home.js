import React from 'react';
import { useParams } from 'react-router-dom';

import { findComments, findLikes, findUser } from './find';

import Post from './Post';

function Home(props) {
    const {store} = props;
    const {postId} = useParams();

    return (
        <div>
            {store.posts.filter(post => (
                postId ? post.id === postId : true
            )).sort((a, b) => (
                new Date(b.datetime) - new Date(a.datetime)
            )).map(post => (
                <Post
                    key={post.id}
                    user={findUser(post.userId, store)}
                    likes={findLikes(post, store)}
                    post={post}
                    comments={findComments(post, store)}
                    onLike={props.onLike} 
                    onUnlike={props.onUnlike}
                    onComment={props.onComment}
                />
            ))}
        </div>
    );
}

export default Home;