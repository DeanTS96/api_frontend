import axios from 'axios';

function getAllArticles(page, limit, sortBy, order, params) {
    return axios.get(`https://news-api-9k2x.onrender.com/api/articles?p=${page}&limit=${limit}&sort_by=${sortBy}&order=${order}`, {params: {topic: params.topic}})
}

function getArticleById(articleId) {
    return axios.get(`https://news-api-9k2x.onrender.com/api/articles/${articleId}`)
}

function requestVote(voter, idToVote, incVotes) {
    return axios.patch(`https://news-api-9k2x.onrender.com/api/${voter === 'article' ? 'articles' : 'comments'}/${idToVote}`, {inc_votes: incVotes})
}

function getCommentAuthor(author) {
    return axios.get(`https://news-api-9k2x.onrender.com/api/users/${author}`)
}

function getComments(articleId, page, limit) {
    return axios.get(`https://news-api-9k2x.onrender.com/api/articles/${articleId}/comments?p=${page}&limit=${limit}`)
}

function requestDeleteComment(commentId) {
    return axios.delete(`https://news-api-9k2x.onrender.com/api/comments/${commentId}`)
}

function requestUpdateComment(commentId) {
    return axios.patch(`https://news-api-9k2x.onrender.com/api/comments/${commentId}`, {})
}

function requestPostComment(articleId, commentInput, username) {
    return axios.post(`https://news-api-9k2x.onrender.com/api/articles/${articleId}/comments`, {body: commentInput, username: username})
}

function requestSignIn(username) {
    return axios.get(`https://news-api-9k2x.onrender.com/api/users/${username}`)
}

function getTopics() {
    return axios.get('https://news-api-9k2x.onrender.com/api/topics')
}
export {
    getArticleById, 
    getAllArticles, 
    requestVote, 
    getCommentAuthor, 
    getComments, 
    requestDeleteComment, 
    requestPostComment, 
    requestSignIn, 
    getTopics, 
    requestUpdateComment
};