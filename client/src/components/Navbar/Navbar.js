import React from 'react'
import { AppBar, Avatar, Button, Typography, Toolbar } from '@material-ui/core';
import useStyles from './styles'
import logoGif from "../../images/LogoGif.gif";
import { Link } from "react-router-dom";



const Navbar = () => {
 
    const classes = useStyles();
    const user = null;


  return (
    
    <AppBar className={classes.appBar} position="static" color="inherit"> 
     <div className={classes.brandContainer}>
     <Typography element={Link} to="/" className={classes.heading} variant="h2" align="center">
    <img className={classes.image} src={logoGif} alt="memories"/>
    </Typography>
</div>

    <Toolbar className={classes.toolbar}>
       {user ? (
        <div className={classes.profile}>
       <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
           {user.result.name.charAt(0)}
        </Avatar>
          <Typography className={classes.userName} variant="h6">
                 {user.result.name}
             </Typography>
          <Button variant="contanied" className={classes.logout} color="secondary">
                   Logout
           </Button>
     </div>
  ) : (
  <Button element={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
    )}
</Toolbar>
</AppBar>

  )
}

export default Navbar