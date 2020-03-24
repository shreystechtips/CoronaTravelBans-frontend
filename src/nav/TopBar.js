import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      width:"100vw",
      minHeight:"50px"
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  
  export default function TopBar() {
    const classes = useStyles();
  
    return (
        <AppBar  position="absolute" style={{background:"Black", height:"5vh", minHeight:"50px",margin:0, padding:0}}>
          <Toolbar style={{verticalAlign :"center"}}>
            <Typography style={{verticalAlign :"center"}} variant="h6" className={classes.title}>
              CoronaBan
            </Typography>
          </Toolbar>
        </AppBar>
    );
  }