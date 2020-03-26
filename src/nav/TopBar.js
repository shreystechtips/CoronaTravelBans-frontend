import React from "react";
import {Link} from "react-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {  withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
// import SwipeableTemporaryDrawer from "./Drawer"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import GitHubIcon from "@material-ui/icons/GitHub";
import MenuIcon from "@material-ui/icons/Menu";
import BugReportIcon from "@material-ui/icons/BugReport";
import "../styles.css";

const useStyles = theme => ({
  root: {
    flexGrow: 1,
    width: "100vw",
    minHeight: "50px",
    background: "#757575",
    height: "5vh",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1
  },
  list: {
    width: "auto"
  },
  fullList: {
    width: "auto"
  },
  drawer:{
    background: "#757575",
    marginLeft:"0px",
    marginRight:"0px",
  },
  listItem:{
    paddingLeft:"5px",
    paddingRight:"30px",
    color: "#FFFFFF",
    textDecoration:"none"
  }
});

class TopBar extends React.Component {
  state = { isOpen: false };

  toggleDrawer = open => event => {
    this.setState({isOpen: open });
  };

  render() {
    const {classes} = this.props;
    const list = (
      <div
        role="presentation"
        // onClick={this.toggleDrawer(false)}
        // onKeyDown={this.toggleDrawer(false)}
        className = {classes.drawer}
        style={{height:"100vh"}}
      >
        <List className={classes.listItem}>
          {["Github"].map((text, index) => (
            <a  className={classes.listItem} href="https://github.com/shreystechtips" target="_blank">
            <ListItem button key={text} >
              <ListItemIcon>
                <GitHubIcon className={classes.listItem} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            </a>
          ))}
        </List>
        <Divider />
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </div>
    );

    return (
      <div>
        <AppBar
          position="absolute"
          style={{
            background: "#757575",
            height: "5vh",
            minHeight: "50px",
            margin: 0,
            padding: 0
          }}
        >
          <Toolbar style={{ verticalAlign: "center" }} variant="dense">
            <IconButton
              edge="start"
              className={classes.menuButton}
              onClick={this.toggleDrawer(true)}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" className={classes.title}>
              COVID-19 Travel Bans
              {/* <BugReportIcon style={{verticalAlign:"top"}}/> */}
            </Typography>
            
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          open={this.state.isOpen}
          onClose={this.toggleDrawer(false)}
          onOpen={this.toggleDrawer(true)}
        >
          {list}
        </SwipeableDrawer>
      </div>
    );
  }
}

export default withStyles(useStyles)(TopBar)