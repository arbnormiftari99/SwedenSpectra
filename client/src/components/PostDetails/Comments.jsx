import React, { useState, useRef} from 'react';
import { Typography, TextField, Button} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../actions/posts'

import useStyles from './styles';

const Comments = ({ post }) => {

const user = JSON.parse(localStorage.getItem('profile'));
const classes = useStyles();
const [comments, setComments] = useState(post && post.comments);
const [comment, setComment] = useState('');
const dispatch = useDispatch();
const commentsRef = useRef();



const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
   const newComment = await  dispatch(commentPost(finalComment, post._id));
   setComments(newComment);
   setComment('');
   
   commentsRef.current.scrollIntoView({ behavior: 'smooth'});
};

const handleKeyPress = (event) => {
    if(event.keyCode === 13) {
        handleClick();
    }
}




return (
    <div>

    <div className={classes.commentsOuterContainer}>
    <div className={classes.commentsInnerContainer}>
   <Typography gutterBottom variant="h6">Comments</Typography>
        {comments.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
               <strong>{c.split(': ')[0]}</strong>
               {c.split(':')[1]}
               <div ref={commentsRef} />
             </Typography>
        ))}
        
        </div>
        {user && user.result && user.result.name && (
        <div className={classes.writeCommentSection}>
        <Typography gutterBottom variant="h6">Write a comment</Typography>
        <TextField 
        fullWidth
        rows={4}
        variant="outlined"
        label="Comment"
        multiline
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={handleKeyPress}
         />
         <Button style={{ marginTop: '10px'}} fullWidth disabled={!comment} variant="contained" color="primary" onClick={handleClick}>
            Send
         </Button>
        </div>
        )}
    </div>
    </div>
)
}

export default Comments;
