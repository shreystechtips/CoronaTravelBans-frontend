import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  
  export default function TopBr() {
    const classes = useStyles();
  
    return (
        <AppBar position="absolute" style={{background:"Black", height:"5vh"}}>
          <Toolbar>
            <Typography style={{verticalAlign :"center"}} variant="h6" className={classes.title}>
              CoronaBan
            </Typography>
          </Toolbar>
        </AppBar>
    );
  }