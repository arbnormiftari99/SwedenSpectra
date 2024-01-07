import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    media: {
        display: 'flex',
        borderRadius: '20px',
        objectFit: 'cover',
        width: '100%',
        maxHeight: '600px',
    },
    card: {
        display: 'flex',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
            flexDirection: 'column',
        }
    },
    section: {
       width: 'auto',
       textAlign: 'center',
        borderRadius: '20px',
        margin: '10px',
        flex: 1,
    },
    imageSection: {
        marginLeft: '20px',
        width: '50%',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            width: '100%'
        }
    },
    recommendedPosts: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
    },

    loadingPaper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '15px',
        height: '40vh'
    },
    // commentsDetails: {
    //     width: '300px'
    // },
    commentsOuterContainer: {
        display: 'flex', justifyContent: 'space-between',
        flexDirection: 'column',
        width: '500px',
        marginLeft: '50px',
        [theme.breakpoints.down('sm')]: {
          width: '300px',
        //   marginRight: '50px',

        },
        
    },
    commentsInnerContainer: {
       height: '200px', marginRight: '30px', overflowX: 'hidden', wordWrap: 'break-word',
    //    border: '1px solid red',


    },
    titleContainer: {
        // width: '300px',
        textAlign: 'center',

        //   display: 'inline-block',
          wordWrap: 'break-word',
          [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
            // width: '200px',
            height: 'auto'
          },
    },
    messageContainer: {
       width: '300px',
       textAlign: 'center',

        // display: 'inline-block',
        wordWrap: 'break-word',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
            width: '200px',
            height: 'auto'
  
          },
    }


}))