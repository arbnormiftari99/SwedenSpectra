import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Snackbar } from '@material-ui/core';
import MuiAlert from '@mui/material/Alert';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useStyles from './styles.js';
import { deletePost, likePost } from '../../../actions/posts.js';
import DeleteConfirmationDialog from '../../functions/DeleteConfirmationDialog.js';
import { useToast } from '../../Providers/ToastProvider.js';

const Post = ({ post, setCurrentId }) => {
  const showToast  = useToast()
  const classes = useStyles();
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);


  const handleLike = () => {
    dispatch(likePost(post._id));
    setLiked(!liked);
   };

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


  return (
    
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">{moment(post.createdAt).startOf('minute').fromNow()}</Typography>
      </div>

      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
          <EditIcon fontSize="small" />
        </Button>
      </div>

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
        <Button size="small" color="primary" onClick={handleLike}>
          <ThumbUpAltIcon fontSize="small" />
          {liked
            ? post.likeCount === 0
              ? `You liked this`
              : `You and ${post.likeCount - 1} others`
            : `Like ${post.likeCount}`}
        </Button>
        <Button size="small" color="secondary" onClick={handleDeleteOpen}>
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
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



