import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Snackbar, ButtonBase } from '@material-ui/core';
import MuiAlert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useStyles from './styles.js';
import { deletePost, likePost } from '../../../actions/posts.js';
import DeleteConfirmationDialog from '../../functions/DeleteConfirmationDialog.js';
import { useToast } from '../../Providers/ToastProvider.js';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import { useNavigate } from 'react-router-dom';



const Post = ({ post, setCurrentId }) => {
  const showToast  = useToast()
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate();
  const [likes, setLikes ] = useState(post && post.likes);



  const userId = (user && user.result && user.result.googleId) || (user && user.result && user.result._id);

  const itsLiked = likes.find((like) => like === userId);
  const handleClick = async ()  => {
    dispatch(likePost(post._id));

    if(itsLiked){
      setLikes(post.likes.filter((id) => id !== userId))
    }else{
      setLikes([...post.likes, userId]);
    }
    
  }


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

    setOpenSnackbar(false);
  };

 
  const Likes  = () => {
    const userResult = user ? user.result : undefined;
  
    if (likes.length > 0) {
      return likes.find((like) => like === (userResult && (userResult.googleId || userResult._id)))
        ? (
          <><ThumbUpIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpOffAltOutlinedIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }
  
    return <><ThumbUpOffAltOutlinedIcon fontSize="small" />&nbsp;Like</>;
  };

  const openPost = () => navigate(`${post._id}`);




  return (
    <Card className={classes.card} raised elevation={6}>
    <ButtonBase
    className={classes.cardAction} 
    component="span"
    name="test"
    onClick={openPost}
     >
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).startOf('minute').fromNow()}</Typography>
      </div>
      {user && user.result && post && (user.result.googleId === post.creator || user.result._id === post.creator || user.result.role === 'admin') && (

      <div className={classes.overlay2} name="edit">
        <Button onClick={(e) => {
          e.stopPropagation();
          setCurrentId(post._id);
        }}
        style={{ color: 'white'}}
        size="small"
        >
          <EditIcon fontSize="small" />
          </Button>
          </div>
      )}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom component="h2">
        {post.title}
      </Typography>
     
      <CardContent>
        {/* <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography> */}
         <Typography variant="body2" color="textSecondary" component="p">
            {post.message.length > 50 ? `${post.message.slice(0, 50)}...` : post.message}
          </Typography>
      </CardContent>
      </ButtonBase>

      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!(user && user.result)} onClick={handleClick}>
          <Likes/>
       </Button>
       {
         user && user.result && post && (user.result.googleId === post.creator || user.result._id === post.creator || user.result.role === 'admin') && (
        <Button  size="small" color="secondary" onClick={() => dispatch(deletePost(post._id) && handleDeleteOpen) }>
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



