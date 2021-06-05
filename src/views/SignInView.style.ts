import { makeStyles } from '@material-ui/core/styles';

export const SignInStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://pictures.immobilienscout24.de/listings/81ea8e03-c3b1-4771-a7f7-4bd2bdf455ed-1445457548.jpg/ORIG/resize/1106x830%3E/format/webp/quality/73)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    logo: {
      width: 200,
      height: 100,
    }
  }));