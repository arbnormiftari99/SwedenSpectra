import React, { useState } from 'react'
import { Avatar, Typography, Button, Paper, Grid, Container } from '@material-ui/core';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom'
import { signin } from '../../actions/auth';
import { signup } from '../../actions/auth';


const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: '',}

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialState);

    const handleShowPassword = () => setShowPassword( (prevShowPassword) => !prevShowPassword )

    const handleSubmit = (e) => {
        e.preventDefault();
      if(isSignup){
        dispatch(signup(formData, navigate('/')));
      }else{
        dispatch(signin(formData, navigate('/')));
      }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    const googleSucces = async (res) => {
        console.log("JWT encoded id token: " +res.credential);
        const result = res && res.clientId ? res.clientId : undefined;
        const credential = jwtDecode(res.credential) && result;
        // const result = res && res.clientId ? res.clientId : undefined;
        // const credential = res && res.userObject ? res.userObject : undefined;
        console.log(credential);    
        // console.log(result);
        try {
            dispatch({type: 'AUTH', data: {credential}});
            navigate('/');

        } catch (error) {
            console.log(error);
        }     
    }


  return (
    <Container element="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
            {isSignup ? 'Sign Up' : 'Sign In'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                {
                    isSignup && (
                        <>
                        <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half/>
                        <Input name='lastName' label='Last Name' handleChange={handleChange} half/>

                        </>
                    )}
                    <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                    <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password'/>}


            </Grid>
        
         
            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                {isSignup ? 'Sign Up' : 'Sign In'}
            </Button>


            <GoogleLogin className={classes.googleButton}
                color="primary"
                fullWidth
                startIcon={<Icon/>}
                variant="contained"
                onSuccess={googleSucces}
                onError={() => console.log('Error')}
          />


            <Grid container justify='flex-end'>
                <Grid item>
                    <Button onClick={switchMode} className={classes.isRegistered}>
                    {isSignup ? (
                   <span>
                   Already have an account? <span style={{ color: 'blue' }}>Sign In</span>
                  </span>
                   ) : (
                   <span>
                   Don't have an account yet? <span style={{ color: 'blue' }}>Sign Up</span>
                  </span>
                )}
                        {/* {isSignup ? 'Already have an account? Sign In' : 'Don\'t have an account yet? Sign Up'} */}
                    </Button>

                </Grid>

            </Grid>
        </form>

    </Paper>
    </Container>
  )
}

export default Auth