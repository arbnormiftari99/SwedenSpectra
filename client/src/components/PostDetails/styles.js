import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    media: {
        // display: 'flex',
        flex: 2,
        borderRadius: '20px',
        objectFit: 'cover',
        width: '100%',
        maxHeight: '600px',
    },
    card: {
        flex: 1,
        display: 'flex',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
            flexDirection: 'column',
        }
    },
    section: {
       width: 'auto',
        borderRadius: '20px',
        margin: '10px',
        flex: 1,
    },
    imageSection: {
        marginLeft: '20px',
        width: '50%',
        flex: 2,
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
    commentsOuterContainer: {
        
        display: 'flex', justifyContent: 'space-between',
        flexDirection: 'column',
        width: '400px',
        marginLeft: '50px',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
            display: 'flex',
            width: '300px',
        },
        
    },
    commentsInnerContainer: {
       height: '200px', marginRight: '30px', overflowX: 'hidden', wordWrap: 'break-word',
       [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        overflowX: 'hidden',
         wordWrap: 'break-word',
         width: '200px',
    },



    },
    titleContainer: {
        grid: '1fr',
        textAlign: 'center',
          wordWrap: 'break-word',
          [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
            height: 'auto'
          },
    },
    messageContainer: {
       width: '400px',
        wordWrap: 'break-word',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
            width: '300px',
            height: 'auto'
  
          },
    }, 
    writeCommentSection: {
        width: '90%',
        [theme.breakpoints.down('sm')]: {
           justifyContent: 'center',
           width: '70%'
  
          },

    }


}))