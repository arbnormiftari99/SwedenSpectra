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
import { signin, signup} from '../../actions/auth';




const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

const SignUp = () => {
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState(initialState);

    const handleShowPassword = () => setShowPassword( (prevShowPassword) => !prevShowPassword );



    const switchMode = () => {
        setFormData(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

      if(isSignup){
       await dispatch(signup(formData));
      }else{
        await dispatch(signin(formData));
      }
      navigate('/');
    }



    const googleSucces = async (res) => {
        const token = res.credential;
      
        if (token.length < 500) {
          const credential = jwtDecode.verify(token);
          const userId = credential ? credential.id : undefined;
          const result = {
            _id: userId,
            email: credential.email,
            name: credential.name,
           picture: credential.picture

          };
      
          try {
            dispatch({ type: 'AUTH', data: { result, token } });
           

            navigate('/');
          } catch (error) {
            console.error('Submission error:', error);
            console.log(error);
          }
        } else {
          const payload = token.split('.')[1];
          const decodedPayload = Buffer.from(payload, 'base64').toString();
          const credential = JSON.parse(decodedPayload);
          const userId = credential.sub;
          const result = {
            _id: userId,
            email: credential.email,
            name: credential.name,
            picture: credential.picture
          };
      
          try {
            dispatch({ type: 'AUTH', data: { result, token } });
         

            navigate('/');
          } catch (error) {
            console.error('Submission error:', error);
            console.log(error);
          }
        }
      };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
        // setFormErrors({...formErrors, [e.target.name]: ''});
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
                        <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                        <Input name='lastName' label='Last Name' handleChange={handleChange} half />

                        </>
                    )}
                    <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                    <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}  />
                        {isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}

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
                // cookiePolicy="single_host_origin"

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
                    </Button>

                </Grid>

            </Grid>
        </form>

    </Paper>
    </Container>
  )
}

export default SignUp