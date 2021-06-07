import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Logo from "../images/FlatMatch.png";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    width: 150,
    height: 75,
  },
}));

export default function DefaultAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Grid justify="space-between" alignItems="center" container spacing={0}>
            <Grid item>
              <Breadcrumbs maxItems={1} aria-label="breadcrumb">
                <Link color="inherit" href="/">
                  Home
                </Link>
                <Typography color="textPrimary">FindOffering</Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item>
              <img src={Logo} className={classes.logo} alt="" />
            </Grid>
            <Grid item>
              <AccountCircle />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
