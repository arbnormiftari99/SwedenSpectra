import React, { useState, useEffect } from 'react';
import useStyles from "./styles.js"
import { TextField, Button, Typography, Paper} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts'; 
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';

const Form = ({ currentId, setCurrentId }) => {
    const initialFormState = {
        title: '',
        message: '',
        tags: '',
        selectedFiles: [],
    };
    const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
    const navigate = useNavigate();
    const [postData, setPostData] = useState(initialFormState);
    const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false); 
    const user = JSON.parse(localStorage.getItem('profile'));

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if(post) setPostData(post);
    }, [post]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let userName = '';
        if (user && user.result && user.result.name) {
            userName = user.result.name;
        }

        try {
            const formData = new FormData();
            formData.append('title', postData.title);
            formData.append('message', postData.message);
            formData.append('tags', postData.tags);
            for (let i = 0; i < postData.selectedFiles.length; i++) {
                formData.append('file', postData.selectedFiles[i]);
            }
            
            if (currentId === 0) {
                dispatch(createPost(formData, navigate));
                clear();
                setIsSubmitSuccessful(true);
            } else {
                dispatch(updatePost(currentId, { ...postData, name: userName }));
                clear();
                setIsSubmitSuccessful(true);
            }
        } catch (error) {
            console.error('Submission error:', error);
        }
    };
  
    const clear = () => {
        setCurrentId(0);
        setPostData(initialFormState);
    }

    useEffect(() => {
        if(isSubmitSuccessful){
            const timeoutId = setTimeout(() => {
                setIsSubmitSuccessful(false);
            }, 2000);
            return () => clearTimeout(timeoutId);
        }
    },[isSubmitSuccessful]);

    if(!user || !user.result || !user.result.name){
        return(
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own posts and to like other's posts
                </Typography>
            </Paper>
        )
    }
    
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Post</Typography>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
                <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
                <TextField name="tags" variant="outlined" label="Tags (Comma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value })}/>
                <input className={classes.fileInput}
                    type="file"
                    name="file"
                    accept=".jpg, .jpeg, .png .heif, .gif, .svg"
                    multiple 
                    onChange={(e) => setPostData({ ...postData, selectedFiles: e.target.files })}
                />
                {isSubmitSuccessful && <CheckCircleOutlineIcon color="success" fontSize="large" />}
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Publish</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;
