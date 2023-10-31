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
            
                <div className="lg dis-inblk comment-avatar">
                    <div className="bg-white comment-img-container border-2px">
                        <img className="center comment-img" src={userImage} alt="user profile picture"/>
                    </div>
                </div>     
                <div className="rounded comment-body">
                    <div className="sm comment-head-sm">
                        <div className="bg-white comment-img-container border-2px">
                            <img className="center comment-img" src={userImage} alt="user profile picture"/>
                        </div>
                        <div className="comment-head-text-sm">
                            <p className="comment-author">{comment.author}</p>
                            <p className="size-08em">{new Date(comment.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <p className="lg dis-in comment-author">{comment.author}</p>
                    <p className="lg dis-in size-08em">{new Date(comment.created_at).toLocaleDateString()}</p>
                    <p className="comment-content">{comment.body}</p>
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