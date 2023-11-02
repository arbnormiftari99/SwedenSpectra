import React, { useState, useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from "react-redux";

import Posts from "./components/Posts/Posts.js";
import Form from "./components/Form/Form.js";
import { getPosts } from "./actions/posts.js";
// import Posts from "./components/Posts/Posts.js";

import swedenspectra from "./images/spectra.png";
import logoGif from "./images/LogoGif.gif";
import useStyles from "./styles.js"

const App = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {currentId, setCurrentId} = useState(null);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (

       <Container maxwidth="lg">

        <AppBar className={classes.appBar} position="static" color="inherit"> 

        <Typography className={classes.heading} variant="h2" align="center">
        <img className={classes.image} src={logoGif} alt="memories" height="100" width="300"/>

        {/* <span style={{ fontFamily: 'Lobster', color: 'rgb(0, 106, 167)' }}>Sweden</span>
        <span style={{ fontFamily: 'Lobster', color: 'rgb(254, 204, 2)' }}>Spectra</span> */}
  {/* <video autoPlay loop muted height="80" width="100">
        <source src="./images/Logo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
       {/* <video width="80" height="200" controls >
      <source src="./images/Logo.mp4" type="video/mp4"/>
     </video> */}

        </Typography>

        </AppBar>

        <Grow in>
            <Container>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                     <Posts/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <Form/>
                    </Grid>

                </Grid>
            </Container>

        </Grow>

       </Container>
    );
}

export default App;