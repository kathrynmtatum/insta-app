import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import css from './Profile.module.css';
import { findFollowers, findFollowing, findPosts, findUser } from './find';
import publicUrl from './publicUrl';
import { StoreContext } from './StoreContext';

import PostThumbnail from './PostThumbnail';
import ProfileStat from './ProfileStat';

function Profile() {
    const {posts, users, followers, currentUserId, addFollower, removeFollower} = useContext(StoreContext);
    const params = useParams();
    const userId = params.userId ? params.userId : currentUserId;
    const user = findUser(userId, users);
    const userFollowers = findFollowers(userId, followers, users);
    const userFollowing = findFollowing(userId, followers, users);
    const userPosts = findPosts(userId, posts);

    return ( 
        <div>
            <section className={css.profileHeader}>
                <img className={css.profilePhoto} src={publicUrl(user.photo)} alt={user.id}/>
                <div className={css.titleAndButton}>
                    <span className={css.profileTitle}>{user.id}</span>
                    {userId !== currentUserId &&
                        <div className={css.buttonContainer}>
                            {followers.filter(follower => follower.followerId === currentUserId).length === 0 ?
                                <span className={`${css.button} ${css.followButton}`} onClick={e => addFollower(user.id)}>Follow</span> :
                                <span className={`${css.button} ${css.unfollowButton}`} onClick={e => removeFollower(user.id)}>Unfollow</span>
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
                <ProfileStat num={userPosts.length} label={'posts'}/>
                <ProfileStat num={userFollowers.length} label={'followers'}/>
                <ProfileStat num={userFollowing.length} label={'following'}/>
            </section>
            <section className={css.profilePosts}>
                {userPosts.map(p => (
                    <Link key={p.id} to={`/${p.id}`}>
                        <PostThumbnail post={p}/>
                    </Link>
                ))}
            </section>
        </div>
    );
}

export default Profile;