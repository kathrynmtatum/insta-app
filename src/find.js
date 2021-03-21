export function findUser(userId, store){
    return store.users.find(user => user.id === userId);
}

export function findComments(post, store){
    return store.comments.filter(comment => comment.postId === post.id);
}

export function findFollowers(userId, store) {
    const followerIds = store.followers.filter(follower => follower.userId === userId).map(follower => follower.followerId);
    return store.users.filter(user => followerIds.includes(user.id));
}

export function findFollowing(userId, store) {
    const followingIds = store.followers.filter(follower => follower.followerId === userId).map(follower => follower.userId);
    return store.users.filter(user => followingIds.includes(user.id));
}

export function findLikes(post, store){
    let postLikes = store.likes.filter(like => like.postId === post.id);
    return {
        self: postLikes.some(like => like.userId === store.currentUserId),
        count: postLikes.length
    }
}

export function findPosts(userId, store) {
    return store.posts.filter(post => post.userId === userId);
}