import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Snackbar } from '@material-ui/core';
import MuiAlert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useStyles from './styles.js';
import { deletePost, likePost } from '../../../actions/posts.js';
import DeleteConfirmationDialog from '../../functions/DeleteConfirmationDialog.js';
import { useToast } from '../../Providers/ToastProvider.js';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
const Post = ({ post, setCurrentId }) => {
  const showToast  = useToast()
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const user = JSON.parse(localStorage.getItem('profile'));




  const handleDeleteOpen = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteConfirm = () => {
    dispatch(deletePost(post._id));
    setOpenDeleteDialog(false);
    showToast('Post deleted successfully!', 'success'); 

  };

  
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
      
    }
    setOpenDeleteDialog(false);

    setOpenSnackbar(true);
  };

 
  const Likes  = () => {
    const userResult = user ? user.result : undefined;
  
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (userResult && (userResult.googleId || userResult._id)))
        ? (
          <><ThumbUpIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpOffAltOutlinedIcon fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }
  
    return <><ThumbUpOffAltOutlinedIcon fontSize="small" />&nbsp;Like</>;
  };



  return (
    
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).startOf('minute').fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        {user && user.result && post && (user.result.googleId === post.creator || user.result._id === post.creator) && (
          <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
          <EditIcon fontSize="small" />
        </Button>
        )}
       
      </div>
      {
      (user && user.result &&
      (user.result.googleId === post && post.creator || user.result._id === post && post.creator)) && (
        <div className={classes.overlay2}>
      <Button onClick={() => setCurrentId(post._id)} style={{ color: 'white' }} size="small">
        <EditIcon fontSize="small" />
      </Button>
    </div>
         )
        }
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!(user && user.result)} onClick={() => dispatch(likePost(post._id))}>
          <Likes/>
       </Button>
       {
         user && user.result && post && (user.result.googleId === post.creator || user.result._id === post.creator) && (
        <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
        <DeleteIcon fontSize="small" /> Delete
      </Button>
           )
        }
      </CardActions>
      <DeleteConfirmationDialog
        open={openDeleteDialog}
        handleDeleteClose={handleDeleteClose}
        handleDeleteConfirm={handleDeleteConfirm}
      />

<Snackbar open={openSnackbar} autoHideDuration={30000} onClick={handleSnackbarClose}>
     <MuiAlert onClick={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
       Post deleted successfully!
     </MuiAlert>
   </Snackbar>

    </Card>
  );
};

export default Post;



