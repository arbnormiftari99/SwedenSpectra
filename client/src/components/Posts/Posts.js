import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import CircularProgress from '@mui/joy/CircularProgress';

import Post from './Post/Post.js';
import useStyles from "./styles.js"


const Posts = ({ setCurrentId }) => {
    const {posts, isLoading} = useSelector((state) => state.posts);
    // const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const classes = useStyles();

    if(!posts ||!posts.length && !isLoading) return 'No Posts found!'

    return (
        isLoading ? <CircularProgress size="lg" style={{ marginTop: '40%', marginLeft: '40%' }}/> : (
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                        <Post post={post} setCurrentId={setCurrentId}/> 
                    </Grid>
                ))}

            </Grid>

        )
      
    );
}

export default Posts; 