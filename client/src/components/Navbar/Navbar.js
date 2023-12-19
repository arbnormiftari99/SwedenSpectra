import React, { useState, useEffect } from 'react'
import { AppBar, Avatar, Button, Typography, Toolbar } from '@material-ui/core';
import useStyles from './styles'
import logoGif from "../../images/LogoGif.gif";
import { Link, useNavigate, useLocation} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode'

const Navbar = () => {
 
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
      const token = user && user.token ? user.token : undefined;
       
      if (token) {
        const decodedToken = jwtDecode(token);
  
        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
      setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
  
    
    const logout = () => {
      dispatch({ type: 'LOGOUT'});
      navigate('/auth');
      setUser(null);
    }

    const clickLogo = () => {
      navigate('/');
    }

  return (
    
    <AppBar className={classes.appBar} position="static" color="inherit"> 
     <div className={classes.brandContainer}>
     <Typography element={Link} to="/" className={classes.heading} variant="h2" align="center">
    <img className={classes.image} src={logoGif} onClick={clickLogo} alt="memories"/>
    </Typography>
</div>

    <Toolbar className={classes.toolbar}>
       {user ? (
        <div className={classes.profile}>
       <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>
           {user.result.name.charAt(0)}
        </Avatar>
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