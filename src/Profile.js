import React from 'react';

import css from './Profile.module.css';
import publicUrl from './publicUrl';

import PostThumbnail from './PostThumbnail';
import ProfileStat from './ProfileStat';

function Profile(props) {
    return ( 
        <div>
            <section className={css.profileHeader}>
                <img className={css.profilePhoto} src={publicUrl(props.user.photo)} alt={props.user.id}/>
                <span className={css.profileTitle}>{props.user.id}</span>
            </section>
            <section className={css.profileBio}>
                <span className={css.bold}>{props.user.name}</span>
                <span>{props.user.bio}</span>
            </section>
            <hr/>
            <section className={css.profileStats}>
                <ProfileStat num={props.posts.length} label={'posts'}/>
                <ProfileStat num={props.followers.length} label={'followers'}/>
                <ProfileStat num={props.following.length} label={'following'}/>
            </section>
            <section className={css.profilePosts}>
                {props.posts.map(p => (
                    <PostThumbnail key={p.id} post={p}/>
                ))}
            </section>
        </div>
    );
}

export default Profile;