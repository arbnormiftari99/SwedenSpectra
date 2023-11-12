import { makeStyles } from '@material-ui/core/styles';
import logoGif from "./images/LogoGif.gif";




export default makeStyles((theme) => ({
    appBar: {
      borderRadius: 15,
      margin: '30px 0',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      color: 'rgba(0,183,255, 1)',
      marginTop: '10px'

    },
    image: {
      position: 'center',
      marginTop: '7px',
  
      maxWidth: '100%', 
      height: '80px',  
  },
  [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
      image: {
          width: '70%',    
      },
  },
  [theme.breakpoints.down('sm')]: {
    mainContainer: {
      flexDirection: 'column-reverse',
    }
  }
 
  }));