import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
        borderRadius: theme.spacing(2),
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    mainImageContainer: {
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: theme.spacing(2),
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden', 
    },
    mainImage: {
        borderRadius: theme.spacing(1), 
        width: '100%',
        cursor: 'pointer',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
            transform: 'scale(1.05)',
        },
    },
    detailsSection: {
        padding: theme.spacing(2),
    },
    mainTitle: {
        marginBottom: theme.spacing(1),
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        hyphens: 'auto',
        fontFamily: 'Roboto, sans-serif', 
        fontWeight: 600, 
        fontSize: '1.5rem', 
    },
    mainAuthor: {
        marginBottom: theme.spacing(1),
        fontFamily: 'Arial, sans-serif', 
        fontStyle: 'italic',
    },
    mainCreatedAt: {
        marginBottom: theme.spacing(1),
        fontFamily: 'Helvetica, sans-serif', 
        color: '#666', 
    },
    mainMessage: {
        marginBottom: theme.spacing(2),
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        hyphens: 'auto',
        fontFamily: 'Arial, sans-serif', 
        lineHeight: '1.6', 
    },
    divider: {
        margin: `${theme.spacing(2)}px 0`,
    },
    tagsContainer: {
        marginBottom: theme.spacing(2),
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        hyphens: 'auto',
    },
    recommendedPosts: {
        marginTop: theme.spacing(3),
    },
    recommendedPost: {
        padding: theme.spacing(2),
        cursor: 'pointer',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: '#f5f5f5',
        },
    },
    recommendedImage: {
        width: '100%',
        borderRadius: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    recommendedTitle: {
        marginBottom: theme.spacing(1),
    },
    commentsOuterContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    commentsInnerContainer: {
        maxHeight: '200px',
        overflowY: 'auto',
        marginRight: theme.spacing(2),
        padding: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.spacing(1),
        marginBottom: theme.spacing(2),
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        hyphens: 'auto',
        backgroundColor: '#f9f9f9',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    commentText: {
        fontFamily: 'Roboto, sans-serif', 
        fontSize: '1rem', 
        lineHeight: '1.4', 
    },
    writeCommentSection: {
        width: '100%',
    },
    commentInput: {
        marginBottom: theme.spacing(1),
    },
    sendButton: {
        marginTop: theme.spacing(1),
    },
}));


