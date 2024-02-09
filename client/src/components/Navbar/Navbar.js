import React, { useState, useEffect } from 'react'
import { AppBar, Avatar, Button, Typography, Toolbar } from '@material-ui/core';
import useStyles from './styles'
import logoGif from "../../images/newLogo.gif";
import { Link, useNavigate, useLocation} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Navbar = () => {
 
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    // useEffect(() => {
    //   setUser(JSON.parse(localStorage.getItem('profile')));

    //   const token = user && user.token ? user.token : undefined;
       
    //   if (token) {

    //     const decodedToken = jwtDecode(token);
      
    //     if (decodedToken.exp * 1000 < new Date().getTime()) {
    //       logout();
         
    //     } else {
    //       if (localStorage.getItem('profile')) {
    //         setUser(JSON.parse(localStorage.getItem('profile')));
    //       } else {
    //         setUser(null);
    //       }
    //     }
    //   }
    // }, [location]);
  
    // useEffect(() => {
    //   if (localStorage.getItem('profile')) {
    //     setUser(JSON.parse(localStorage.getItem('profile')));
    //   }
    
    //   if (user) {
    //     const token = user && user.token ? user.token : undefined;
    //     if (token) {
    //       const decodedToken = jwtDecode(token);
    
    //       if (decodedToken.exp * 1000 < new Date().getTime()) {
    //         logout();
    //       } else {
    //         if (localStorage.getItem('profile')) {
    //           setUser(JSON.parse(localStorage.getItem('profile')));
    //         } else {
    //           setUser(null);
    //         }
    //       }
    //     }
    //   }
    // }, [location]);
    


    useEffect(() => {
      const profileFromStorage = localStorage.getItem('profile');
      
      if (profileFromStorage) {
        const parsedProfile = JSON.parse(profileFromStorage);
        setUser(parsedProfile);
    
        const token = parsedProfile.token;
        if (token) {
          const decodedToken = jwtDecode(token);
          if (decodedToken.exp * 1000 < new Date().getTime()) {
            logout();
            setUser(null);
          }
        }
      }
    }, [location]);




    

    
     const logout = () => {
      dispatch({ type: 'LOGOUT'});
      navigate('/auth');
      setUser(null);
    }

    const clickLogo = () => {
      navigate('/');
    }

    const handleClick = (e) => {
      setAnchorEl(e.currentTarget);
    }

    const open = Boolean(anchorEl);

    const checkProfile = () => {
      navigate('/profile');
      setAnchorEl(null);
    }


  return (
    
    <AppBar className={classes.appBar} position="static" color="inherit"> 
     <div className={classes.brandContainer}>
     <Typography element={Link} to="/" className={classes.heading} variant="h2" align="center">
    <img className={classes.image} src={logoGif} onClick={clickLogo} alt="memories"/>
    </Typography>
</div>

{/* <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
         <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>
           {user.result.name.charAt(0)}
        </Avatar>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div> */}

    <Toolbar className={classes.toolbar}>
       {user && user.result.name ? (
        <div className={classes.profile}>
      
      <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
         <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>
           {user.result.name.charAt(0)}
        </Avatar>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={checkProfile}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={checkProfile}>Profile</MenuItem>
        <MenuItem onClick={checkProfile}>My account</MenuItem>
      </Menu>
    </div>

          <Typography className={classes.userName} variant="h6">
                 {user.result.name}
             </Typography>
          <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>
                 Logout
           </Button>
     </div>
  ) : (
  <Link element={Link} to="/auth"><Button variant="contained" color="primary">Sign In</Button></Link>
    )}
</Toolbar>
</AppBar>

  )
}



export default Navbar