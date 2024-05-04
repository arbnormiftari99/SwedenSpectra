import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, getPostsSearch } from '../../actions/posts';
import Comments from './Comments';
import useStyles from './styles';

const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id));
    }, [id]);

    useEffect(() => {
        if (post) {
            dispatch(getPostsSearch({ search: 'none', tags: post && post.tags && post.tags.join(',') }));
        }
    }, [post]);

    if (!post) return null;

    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress />
            </Paper>
        );
    }

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id).slice(0, 4);

    const openPost = (_id) => navigate(`/posts/${_id}`);

    return (
        <Paper className={classes.paper} elevation={6}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6}>
                    <div className={classes.container}>
                        <img src={post.selectedFile[0].url} alt={post.title} className={classes.mainImage} onClick={() => openPost(post._id)} />
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <div className={classes.detailsSection}>
                        <Typography variant="h5" className={classes.mainTitle}>{post.title}</Typography>
                        <Typography variant="subtitle1" className={classes.mainAuthor}>By {post.name}</Typography>
                        <Typography variant="subtitle2" className={classes.mainCreatedAt}>{moment(post.createdAt).fromNow()}</Typography>
                        <Typography variant="body1" className={classes.mainMessage}>{post.message}</Typography>
                        <Divider className={classes.divider} />
                        <div className={classes.tagsContainer}>
                            <Typography variant="subtitle2"><strong>Tags:</strong> {post.tags.map((tag) => `#${tag}`)}</Typography>
                        </div>
                        <Divider className={classes.divider} />
                        <Comments post={post} />
                    </div>
                </Grid>
            </Grid>

            <div className={classes.recommendedPosts}>
                <Typography variant="h6">You might also like:</Typography>
                <Grid container spacing={2}>
                    {recommendedPosts.map(({ title, likes, selectedFile, _id }) => (
                        <Grid item xs={12} sm={6} md={3} key={_id}>
                            <Paper elevation={3} className={classes.recommendedPost} onClick={() => openPost(_id)}>
                                <img src={selectedFile[0].url} alt={title} className={classes.recommendedImage} />
                                <Typography variant="subtitle1" className={classes.recommendedTitle}>{title}</Typography>
                                <Typography variant="subtitle2">Likes: {likes.length}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Paper>
    );
};

export default PostDetails;
