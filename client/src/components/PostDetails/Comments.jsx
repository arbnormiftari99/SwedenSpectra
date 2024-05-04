import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../actions/posts';
import EmojiPicker from 'emoji-picker-react';
import useStyles from './styles';

const Comments = ({ post }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();
    const [comments, setComments] = useState(post && post.comments);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const commentsRef = useRef();
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false); // State to manage emoji picker visibility

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`;
        const newComment = await dispatch(commentPost(finalComment, post._id));
        setComments(newComment);
        setComment('');
        setEmojiPickerOpen(false); // Close emoji picker after submitting comment
        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleKeyPress = (event) => {
        if (event.keyCode === 13 && !event.shiftKey) {
            // Submit comment on Enter key press, unless Shift key is pressed for new line
            handleClick();
        }
    };

    const handleEmojiSelect = (emoji) => {
        if (emoji && emoji.emoji) {
            setComment((prevComment) => prevComment + emoji.emoji); // Append selected emoji to comment text
        }
    };

    return (
        <div className={classes.commentsOuterContainer}>
            <Typography gutterBottom variant="h6">Comments</Typography>
            <div className={classes.commentsInnerContainer}>
                {comments.length === 0 ? (
                    <Typography variant="subtitle1">No comments yet.</Typography>
                ) : (
                    comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            <strong>{c.split(': ')[0]}</strong>
                            {c.split(':')[1]}
                            <div ref={commentsRef} />
                        </Typography>
                    ))
                )}
            </div>
            {user && user.result && user.result.name && (
                <div className={classes.writeCommentSection}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Comment"
                        multiline
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onKeyDown={handleKeyPress}
                        InputProps={{
                            endAdornment: (
                                <Button onClick={() => setEmojiPickerOpen((prevState) => !prevState)}>😀</Button> // Toggle emoji picker button
                            )
                        }}
                    />
                    {emojiPickerOpen && (
                        <div style={{ position: 'absolute', right: '20px', zIndex: '9999' }}>
                            <EmojiPicker onEmojiClick={handleEmojiSelect} />
                        </div>
                    )}
                    <Button
                        className={classes.sendButton}
                        fullWidth
                        disabled={!comment}
                        variant="contained"
                        color="primary"
                        onClick={handleClick}
                    >
                        Send
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Comments;
