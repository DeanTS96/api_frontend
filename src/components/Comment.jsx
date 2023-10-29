import {useState, useEffect} from 'react';
import CommentVoteButtons from './CommentVoteButtons';
import DeleteComment from './DeleteComment';
import {useContext} from 'react';
import {UserContext} from '../App';
import {getCommentAuthor} from '../../api';

function Comment({comment, setCommentDeleted, setCommentUpdated}) {
    const user = useContext(UserContext).user.username
    const [userImage, setUserImage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [commentError, setCommentError] = useState('');

    useEffect(() => {
        setIsLoading(true);
        setCommentError('');
        getCommentAuthor(comment.author)
        .then(({data:{user: {avatar_url}}}) => {
            setIsLoading(false);
        setUserImage(avatar_url)
    }).catch(err => {
        setIsLoading(false);
        setCommentError({head: ':(', body: 'comment not found'})
        console.log(err)
    })
    }, [])

    if(commentError) {
        return (
            <>
                <h2>{commentError.head}</h2>
                <p>{commentError.body}</p>
            </>
        )
    } else {
        return (
            <>
                <div className="inline-div">
                    <div className="comment-img-container">
                        <img className="comment-img" src={userImage} alt="user profile picture"/>
                    </div>
                </div>
                <div className="comment-body">
                    <p>{comment.author}</p>
                    <p>{new Date(comment.created_at).toLocaleDateString()}</p>
                    <p>{comment.body}</p>
                    <div className="comment-foot">
                        {user === comment.author ? <DeleteComment commentId={comment.comment_id} setCommentDeleted={setCommentDeleted} /> : ''}
                        <CommentVoteButtons commentId={comment.comment_id} votes={comment.votes} voter='comment'/>
                    </div>
                </div>
                <p>{isLoading ? 'Loading...' : ''}</p>
            </>
        )
    }
    //{user === comment.author ? <UpdateComment commentId={comment.comment_id} setCommentUpdated={setCommentUpdated} /> : ''}
}

export default Comment;