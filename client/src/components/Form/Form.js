import React, { useState, useEffect } from 'react';
import useStyles from "./styles.js"
import { TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/posts'; 
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Form = () => {
    const initialFormState = {
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFiles: '',
      };
    
      const [postData, setPostData] = useState(initialFormState);
      const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false); 

    
      const classes = useStyles();
      const dispatch = useDispatch();
    
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createPost(postData));
      setIsSubmitSuccessful(true); 
      setPostData(initialFormState); 
    } catch (error) {
      console.error('Submission error:', error);
    }}
    
      const clear = () => {
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

    
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">Creating a Memory</Typography>
                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value})}/>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value})}/>
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value})}/>
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value})}/>
                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}/></div>
                {isSubmitSuccessful && <CheckCircleOutlineIcon color="success" fontSize="large" />}
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

            </form>

        </Paper>
        );
}

export default Form;