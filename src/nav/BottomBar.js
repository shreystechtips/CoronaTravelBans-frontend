import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import React from 'react';
import { makeStyles , withStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
     background:"Gray",
     height:"5vh",
     minHeight:"50px",
     width:"100vw",
     verticalAlign:"bottom",
     paddingBottom:0,
     marginBottom:0,
     position:"absolute"
    }
  });
  
  const StyledBottomAction = withStyles({
    root: {
      color: 'white',
      height: '5vh',
    },
    label: {
      color:'#ffffff',
    },
    selected:{
        color:'Red',

    }
  })(BottomNavigationAction);

  export default function BottomBar() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    return (
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <StyledBottomAction label="Recents"/>
        <StyledBottomAction label="Favorites"  />
        <StyledBottomAction label="Nearby"  />
      </BottomNavigation>
    );
  }