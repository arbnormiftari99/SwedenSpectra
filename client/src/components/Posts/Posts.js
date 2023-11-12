import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './Post/Post.js';
import useStyles from "./styles.js"


const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts);
    const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const classes = useStyles();
    return (
        !posts.length ? <CircularProgress/> : (
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {sortedPosts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId}/> 
                    </Grid>
                ))}

            </Grid>

        )
      
    );
}

export default Posts; 