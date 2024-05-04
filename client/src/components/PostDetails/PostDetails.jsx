import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider, Card, CardMedia } from '@material-ui/core';
import Grid from '@mui/material/Unstable_Grid2';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, getPostsSearch } from '../../actions/posts';
import Comments from './Comments';

import useStyles from './styles';



const PostDetails = () => {
   const {post, posts, isLoading } = useSelector((state) => state.posts);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const classes = useStyles();
   const { id } = useParams();

   useEffect(() => {
    dispatch(getPost(id));
   }, [id])

   useEffect(() => {
    if(post) {
      dispatch(getPostsSearch({search: 'none', tags: post && post.tags && post.tags.join(',')}))
    }
   }, [post])

   if(!post) return null;


   if(isLoading){
    return <Paper elevation={6} className={classes.loadingPaper}>
      <CircularProgress/>
    </Paper>
   }

   const recommendedPosts = posts.filter(({ _id }) => _id !== post._id).slice(0, 4);

   const openPost = (_id) => navigate(`/posts/${_id}`)

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px'}} elevation={6}>
      <div className={classes.card}>

      <div className={classes.imageSection}>
      {post.selectedFile && post.selectedFile.map((file, index) => (
       <img key={index} className={classes.media} src={file.url || 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'} alt={post.title} />
        ))}
        </div>

        <div className={classes.section}>
         <div className="commentsDetails">
          <Typography variant="h3" component="h2" className={classes.titleContainer}>{post.title}</Typography>
          <Typography gutterBottom variant="body1" component="p" className={classes.messageContainer}>{post.message}</Typography>
          <Typography variant="h7" color="textSecondary" gutterBottom>Created by: {post.name}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2" className={classes.messageContainer}><strong>Tags:</strong> {post.tags.map((tag) => `#${tag}`)}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0', width: '20px'}} />
          <Comments post={post}/>
          <Divider />
          </div>

        </div>
        {/* <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'} alt={post.title} /> 
        </div> */}
      </div>
      <div className={classes.recommendedPosts}>
    {recommendedPosts.length  && (
      <div className={classes.section}>
        <Typography gutterBottom variant="h5">You might also like: </Typography>
        <Divider />
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 1, sm: 8, md: 12 }}>

        {recommendedPosts.map(({ title, likes, selectedFile, _id}) => (
          <Grid xs={2} sm={4} md={4}>
          <div style={{ margin: '20px', cursor: 'pointer'}} onClick={() => openPost(_id)} key={_id}> 
           <Typography gutterBottom variant="h6">{title}</Typography>
           <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
           {selectedFile && selectedFile.map((file, index) => (
       <img key={index} src={file.url} style={{ borderRadius: '15px'}}alt={post.title} width={300} height={300}/>
        ))}
          </div>
          </Grid>
        ))}
      
        </Grid>
      </div>
    
    )}
  </div>
    </Paper>



  )
}

export default PostDetails