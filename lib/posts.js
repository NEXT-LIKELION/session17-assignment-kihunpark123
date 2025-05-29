// 실제 프로젝트에서는 데이터베이스를 사용하세요
let posts = [];
let nextId = 1;

export function getAllPosts() {
    return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function getPostById(id) {
    return posts.find((post) => post.id === parseInt(id));
}

export function createPost(postData) {
    const newPost = {
        id: nextId++,
        ...postData,
        createdAt: new Date().toISOString(),
    };
    posts.push(newPost);
    return newPost;
}

export function deletePost(id) {
    const index = posts.findIndex((post) => post.id === parseInt(id));
    if (index > -1) {
        posts.splice(index, 1);
        return true;
    }
    return false;
}
