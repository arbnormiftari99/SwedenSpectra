import React, { useState, useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider, Grid, TextField, Button, Container, Avatar } from '@material-ui/core';
import useStyles from './styles';
import LockOutlined from '@mui/icons-material/LockOutlined';
import { useDispatch } from 'react-redux';
import { editProfile } from '../../actions/auth';


const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const id = user.result._id;
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const [editedData, setEditedData] = useState({
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const classes = useStyles();

  const handleInputChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleEditProfile = async () => {
   try{
    await dispatch(editProfile(id, editedData));
    console.log(id);
    const updatedUser = { ...user, result: { ...user.result, ...editedData } };
   localStorage.setItem('profile', JSON.stringify(updatedUser));
    setUser(updatedUser);

    setEditMode(false);
   } catch (error){
    console.log('Error updating profile', error);
   }
  };

  return (
    <Container element="main" maxWidth="md">
    <Paper className={classes.paper} elevation={5}>
      <div className="profile">
      <Avatar className={classes.avatar}>
        <LockOutlined/>
      </Avatar>
        {editMode ? (
          <>
            <TextField
              name="password"
              label="Current Password"
              type="password"
              variant="outlined"
              fullWidth
              value={editedData.password}
              onChange={handleInputChange}
            />
            <TextField
              name="newPassword"
              label="New Password"
              type="password"
              variant="outlined"
              fullWidth
              value={editedData.newPassword}
              onChange={handleInputChange}
            />
            <TextField
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              variant="outlined"
              fullWidth
              value={editedData.confirmPassword}
              onChange={handleInputChange}
            />
            <Button variant="contained" color="primary" onClick={handleEditProfile}>
              Save Changes
            </Button>
          </>
        ) : (
          <>
            <Typography gutterBottom variant="h6" color="primary">
              Name: {user.result.name}
            </Typography>
            <Typography gutterBottom variant="h6" color="primary">
              Email: {user.result.email}
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setEditMode(true)}>
              Edit Profile
            </Button>
          </>
        )}
      </div>

    </Paper>
    </Container>
  );
};

export default Profile;
