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
    const [commentsError, setCommentsError] = useState('');

    useEffect(() => {
        setCommentsError('')
        setCommentDeleted(false);
        setIsCommentPosted(false);
        setLoadingComments(true);
        axios.get(`https://news-api-9k2x.onrender.com/api/articles/${articleId}/comments?p=${page}&limit=${limit}`)
        .then(({data: {comments: requestedComments}}) => {
            setComments(requestedComments);
            setLoadingComments(false);
        }).catch(err => {
            const errorStatus = err.response.status;
            if(errorStatus === 404){
                setCommentsError({head: 'Error: Article id doesn\'t exist', body: 'That article id didn\'t match any articles in our database. Please try again later.'})
            } else if(errorStatus === 400) {
                setCommentsError({head: 'Error: Article id invalid', body: 'Please check article Id is a number and try again'})
            } else {
                setCommentsError({head:'Error: A problem with our server', body: 'We\'re experiencing issues currently with this functionality.please come back and try ahgain later. We\'re sorry for any inconvienicne this may have cuaused'})
            }
            setLoadingComments(false);
            console.log(err);
        })
    },[page, limit, commentPosted, commentDeleted])

    if(commentsError) {
        return (
            <>
                <h2>{commentsError.head}</h2>
                <p>{commentsError.body}</p>
            </>
        )
    } else {
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
}

export default Comments;