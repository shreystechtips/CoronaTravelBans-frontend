import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import BugReportIcon from '@material-ui/icons/BugReport';
import "../styles.css";

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
        <AppBar  position="absolute" style={{background:"#757575", height:"5vh", minHeight:"50px",margin:0, padding:0}}>
          <Toolbar style={{verticalAlign :"center"}} variant="dense">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <BugReportIcon />
          </IconButton>
            <Typography variant="h6" className={classes.title}>
              CoronaBan
            </Typography>
          </Toolbar>
        </AppBar>
    );
  }