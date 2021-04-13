export function findUser(userId, users){
    return users.find(user => user.id === userId);
}

export function findComments(post, comments){
    return comments.filter(comment => comment.postId === post.id);
}

export function findFollowers(userId, followers, users) {
    const followerIds = followers.filter(follower => follower.userId === userId).map(follower => follower.followerId);
    return users.filter(user => followerIds.includes(user.id));
}

export function findFollowing(userId, followers, users) {
    const followingIds = followers.filter(follower => follower.followerId === userId).map(follower => follower.userId);
    return users.filter(user => followingIds.includes(user.id));
}

export function findLikes(post, likes, currentUserId){
    let postLikes = likes.filter(like => like.postId === post.id);
    return {
        self: postLikes.some(like => like.userId === currentUserId),
        count: postLikes.length
    }
}

export function findPosts(userId, posts) {
    return posts.filter(post => post.userId === userId);
}