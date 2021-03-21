import React, { useState } from 'react';

import css from './Post.module.css';
import publicUrl from './publicUrl';
import timespan from './timespan';

import Response from './Response';

function Post(props) {
    const [comment, setComment] = useState('');
    const [toggleComment, setToggleComment] = useState(false);

    function handleLike() {
        props.onLike(props.post.id);
    }

    function handleSubmitComment(event) {
        props.onComment(props.post.id, comment);
        setComment('');
        setToggleComment(false);
        event.preventDefault();
    }

    function handleUnlike() {
        props.onUnlike(props.post.id);
    }

    return (
        <section className={css.post}>
            <div className={css.postHeader}>
                <img className={css.profilePhoto} src={publicUrl(props.user.photo)} alt={props.user.id}/>
                <span className={css.bold}>{props.user.id}</span>
            </div>
            <img className={css.postPhoto} src={publicUrl(props.post.photo)} alt={props.post.desc}/>
            <div>
                <div>
                    {props.likes.self ?
                        <img className={css.postItem} src={publicUrl('/assets/unlike.svg')} alt={'Unlike'} onClick={handleUnlike}/> :
                        <img className={css.postItem} src={publicUrl('/assets/like.svg')} alt={'Like'} onClick={handleLike}/>
                    }
                    <img className={`${css.postItem} ${css.commentButton}`} src={publicUrl('/assets/comment.svg')} alt={'Comment'} onClick={e => setToggleComment(!toggleComment)}/> 
                </div>
                <span className={`${css.bold} ${css.postItem}`}>{props.likes.count} likes</span>
            </div>
            <div className={css.postItem}>
                <Response username={props.user.id} text={props.post.desc}/>
                {props.comments.map((c, i) => (
                    <Response key={i} username={c.userId} text={c.text}/>
                ))}
            </div>
            <span className={`${css.postItem} ${css.postTimestamp}`}>{timespan(props.post.datetime)}</span>
            {toggleComment &&
                <form className={css.addComment} onSubmit={handleSubmitComment}>
                    <input type="text" placeholder="Add a comment…" value={comment} onChange={e => setComment(e.target.value)}/>
                    <button type="submit">Post</button>
                </form>
            }
        </section>
    );
}

export default Post;