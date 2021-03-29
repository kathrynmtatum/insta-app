import React from 'react';
import { Link, useParams } from 'react-router-dom';

import css from './Profile.module.css';
import { findFollowers, findFollowing, findPosts, findUser } from './find';
import publicUrl from './publicUrl';

import PostThumbnail from './PostThumbnail';
import ProfileStat from './ProfileStat';

function Profile(props) {
    const params = useParams();
    const userId = params.userId ? params.userId : props.store.currentUserId;
    const user = findUser(userId, props.store);
    const followers = findFollowers(userId, props.store);
    const following = findFollowing(userId, props.store);
    const posts = findPosts(userId, props.store);

    return ( 
        <div>
            <section className={css.profileHeader}>
                <img className={css.profilePhoto} src={publicUrl(user.photo)} alt={user.id}/>
                <div className={css.titleAndButton}>
                    <span className={css.profileTitle}>{user.id}</span>
                    {userId !== props.store.currentUserId &&
                        <div className={css.buttonContainer}>
                            {followers.filter(follower => follower.id === props.store.currentUserId).length === 0 ?
                                <span className={`${css.button} ${css.followButton}`} onClick={e => props.onFollow(user.id)}>Follow</span> :
                                <span className={`${css.button} ${css.unfollowButton}`} onClick={e => props.onUnfollow(user.id)}>Unfollow</span>
                            }
                        </div>
                    }
                </div>
            </section>
            <section className={css.profileBio}>
                <span className={css.bold}>{user.name}</span>
                <span>{user.bio}</span>
            </section>
            <hr/>
            <section className={css.profileStats}>
                <ProfileStat num={posts.length} label={'posts'}/>
                <ProfileStat num={followers.length} label={'followers'}/>
                <ProfileStat num={following.length} label={'following'}/>
            </section>
            <section className={css.profilePosts}>
                {posts.map(p => (
                    <Link key={p.id} to={`/${p.id}`}>
                        <PostThumbnail post={p}/>
                    </Link>
                ))}
            </section>
        </div>
    );
}

export default Profile;