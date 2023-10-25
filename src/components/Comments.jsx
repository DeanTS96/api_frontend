import {useEffect, useState} from 'react';
import Comment from './Comment';
import Pagination from './Pagination';
import axios from 'axios';
import PostComment from './PostComment';

function Comments({articleId}) {
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [commentPosted, setIsCommentPosted] = useState(false);
    const [commentDeleted, setCommentDeleted] = useState(false);

    useEffect(() => {
        setCommentDeleted(false);
        setIsCommentPosted(false);
        setLoadingComments(true);
        axios.get(`https://news-api-9k2x.onrender.com/api/articles/${articleId}/comments?p=${page}&limit=${limit}`)
        .then(({data: {comments: requestedComments}}) => {
            setComments(requestedComments);
            setLoadingComments(false);
        }).catch(err => {
            setLoadingComments(false);
            console.log(err);
        })
    },[page, limit, commentPosted, commentDeleted])

    return (
        <>
            <PostComment articleId={articleId} setIsCommentPosted={setIsCommentPosted}/>
            {loadingComments ? 'Loading...' : 
            <ul>
            {comments.map(comment => {
                return (
                    <li key={`${comment.comment_id}`}>
                        <Comment comment={comment} setCommentDeleted={setCommentDeleted} />
                    </li>
                )
            })}
            </ul>
            }
            <Pagination perPage="comments" limit={limit} setLimit={setLimit} page={page} setPage={setPage} itemsLength={comments.length}/>
        </>
    )
}

export default Comments;