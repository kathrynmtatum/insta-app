import React from 'react';

import css from './Post.module.css';
import publicUrl from './publicUrl';
import Response from './Response';
import timespan from './timespan';

class Post extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className={css.post}>
                <div className={css.postHeader}>
                    <img className={css.profilePhoto} src={publicUrl(this.props.user.photo)} alt={this.props.user.id}/>
                    <span className={css.bold}>{this.props.user.id}</span>
                </div>
                <img className={css.postPhoto} src={publicUrl(this.props.post.photo)} alt={this.props.post.desc}/>
                <div className={css.activityBar}>
                    <div>
                        <img className={css.postItem} src={this.props.likes.self ? publicUrl('/assets/unlike.svg') : publicUrl('/assets/like.svg')}/>
                        <img className={css.postItem} src={publicUrl('/assets/comment.svg')}/>
                    </div>
                    <span className={`${css.bold} ${css.postItem}`}>{this.props.likes.count} likes</span>
                </div>
                <div className={css.postItem}>
                    <Response username={this.props.user.id} text={this.props.post.desc}/>
                    {this.props.comments.map((c, i) => (
                        <Response key={i} username={c.userId} text={c.text}/>
                    ))}
                </div>
                <span className={`${css.postItem} ${css.postTimestamp}`}>{timespan(this.props.post.datetime)}</span>
            </section>
        );
    }
}

export default Post;