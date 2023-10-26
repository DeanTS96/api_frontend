import {useState, useEffect} from 'react';
import CommentVoteButtons from './CommentVoteButtons';
import DeleteComment from './DeleteComment';
import {useContext} from 'react';
import {UserContext} from '../App';
import {getCommentAuthor} from '../../api';

function Comment({comment, setCommentDeleted}) {
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
                <p>{isLoading ? 'Loading...' : ''}</p>
                <p>{comment.author}</p>
                <img src={userImage} alt="user profile picture"/>
                <p>{new Date(comment.created_at).toLocaleDateString()}</p>
                <p>{comment.body}</p>
                <CommentVoteButtons commentId={comment.comment_id} votes={comment.votes} voter='comment'/>
                {user === comment.author ? <DeleteComment commentId={comment.comment_id} setCommentDeleted={setCommentDeleted} /> : ''}
            </>
        )
    }
}

export default Comment;