import React from 'react';
import { useState } from 'react';

import useStyles from "./styles.js"
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import moment from "moment";
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts.js';


const Post = ({ post, setCurrentId }) => {
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        dispatch(likePost(post._id));
        setLiked(!liked);
    }

    return (
       <Card className={classes.card}>
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
        <div className={classes.overlay}>
            <Typography variant="h6">{post.creator}</Typography>
            <Typography variant="body2">{moment(post.createdAt).startOf('minute').fromNow()}</Typography>
        </div>

        <div className={classes.overlay2}>
            <Button 
            style={{color: 'white'}} 
            size="small" 
            onClick={() => setCurrentId(post._id)}>
            <EditIcon  fontSize="small"/>
            </Button>
        </div>

        <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
         </div>
        <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
         <CardContent>
         <Typography  variant="body2" color="textSecondary" component="p">{post.message}</Typography>
        </CardContent>
         
         <CardActions className={classes.cardActions}>
            <Button size="small" color="primary" onClick={handleLike}>
                <ThumbUpAltIcon fontSize="small" />
                {/* Like {post.likeCount} */}
                {/* {liked ? `You and ${post.likeCount -1} others` : `Like ${post.likeCount}`} */}
                {liked ? post.likeCount === 0 ? `You liked this` :  `You and ${post.likeCount - 1} others` 
                : `Like ${post.likeCount}`}
        
            </Button>
            <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
                <DeleteIcon fontSize="small" />
                Delete
            </Button>

         </CardActions>


       </Card>
    );
}

export default Post;