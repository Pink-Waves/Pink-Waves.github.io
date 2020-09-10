import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Redirect, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HomeIcon from '@material-ui/icons/Home';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import EmojiPeopleOutlinedIcon from '@material-ui/icons/EmojiPeopleOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

import BlueBird from '../image/bluebird.png';
import PinkBird from '../image/pinkbird.png';
import BrownBird from '../image/brownbird.png';
import GreenBird from '../image/greenbird.png';
import YellowBird from '../image/yellowbird.png';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: '#ffffff',

    },
  },
}))(MenuItem);

//Accordion stuff
const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
    width: '100%'
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(39,77,90,1)',
    color: 'white',
    borderBottom: '1px solid rgba(39,77,90,1)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: 12,
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const useStyles = makeStyles((theme) => ({
  settingsroot: {
    display: 'flex',
    width: 325,
    maxHeight: 130,
    maxWidth: 325,
    transition: "0.3s",
    backgroundColor: "#eeeeee",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.8)",
    marginTop: '10px',
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.8)"
    }
  },
  imageroot: {
    width: 90
  },
  content: {
    flex: '0 0 auto',
    flexDirection: 'row'
  },
  username: {
    fontSize: "18px"
  },
  text: {
    flex: '1',
    flexWrap: 'wrap'
  },
  image: {
    display: "block",
    width: 110,
    padding: "30px 10px"
  },
  generalbutton: {
    backgroundColor: "#274D5A",
    border: "2px solid #274D5A",
    color: "white",
    padding: "6px 12px",
    borderRadius: "4px",
    marginTop: "10px",
    cursor: "pointer"
  },
  settingsbutton: {
    backgroundColor: "#274D5A",
    marginTop: "50px",
  }
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#274D5A"),
    backgroundColor: "#274D5A",
    '&:hover': {
      backgroundColor: "#407c91",
    },
  },
}))(Button);

const logOut = () => {
  fetch('http://127.0.0.1:8000/api/auth/logout', {
    method: 'POST',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  }).catch(error => console.error(error))
  localStorage.removeItem('token');
};

const goResources = () => {
  window.open("/resources", "_blank");

}

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = withStyles();
  const classes2 = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  var username = '';
  var bird_color = '';
  var address = '';
  var date_joined = '';
  if (localStorage.getItem('username') != null) {
    username = localStorage.getItem('username');
  }
  if (localStorage.getItem('bird_color') != null) {
    bird_color = localStorage.getItem('bird_color');
  }
  if (localStorage.getItem('address') != null) {
    address = localStorage.getItem('address');
  }
  if (localStorage.getItem('date_joined') != null) {
    date_joined = localStorage.getItem('date_joined');
  }

  return (
    <div classname={classes.root}>
      <ColorButton
        classname={classes.settingsbutton}
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        font='Abel'
        onClick={handleClick}
        onClose={handleClose}
        startIcon={<SettingsOutlinedIcon style={{ color: "white" }} fontSize="large" />}
      >
        Settings
    </ColorButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <ListItemIcon>
                <AccountCircleOutlinedIcon style={{ color: "white" }} fontSize="inherit" />
              </ListItemIcon>
              <Typography>Profile</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>

                <Card className={classes2.settingsroot}>
                  <CardMedia className={classes2.imageroot}>
                    <img className={classes2.image} src={(() => {
                      switch (bird_color) {
                        case "yellow": return YellowBird;
                        case "green": return GreenBird;
                        case "blue": return BlueBird;
                        case "brown": return BrownBird;
                        case "pink": return PinkBird;
                        default: return YellowBird;
                      }
                    })()} title="User profile picture" />
                  </CardMedia>
                  <CardContent className={classes2.content}>
                    <Typography className={classes2.username} component="h6" variant="h6">
                      {username}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      Member since {date_joined.substring(0, 10).replace('T', ' ')}
                    </Typography>
                    <button size="small" className={classes2.generalbutton}>
                      <Link to="/changepassword" target="_blank" style={{ textDecoration: 'none', color: 'white' }}>
                        <ListItemIcon style={{ minWidth: '20px' }}>
                          <LockOutlinedIcon style={{ color: "white" }} fontSize="inherit" />
                        </ListItemIcon>
                        Change Password
                        </Link>
                    </button>
                  </CardContent>

                </Card>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </StyledMenuItem>

        <StyledMenuItem>
          <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
              <ListItemIcon>
                <HomeWorkIcon style={{ color: "white" }} fontSize="inherit" />
              </ListItemIcon>
              <Typography>Address</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Card className={classes2.settingsroot}>
                  <CardContent className={classes2.content}>
                    <Typography variant="subtitle1" color="textPrimary">
                      <ListItemIcon><HomeIcon style={{ color: "black" }} fontSize="inherit" /></ListItemIcon>
                      {address}
                    </Typography>
                  </CardContent>
                </Card>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </StyledMenuItem>

        <StyledMenuItem>
          <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
              <ListItemIcon>
                <EmojiPeopleOutlinedIcon style={{ color: "white" }} fontSize="inherit" />
              </ListItemIcon>
              <Typography>Resources</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <button size="small" className={classes2.generalbutton} onClick={goResources}>
                Link to Mental Health Resources
            </button>
            </AccordionDetails>
          </Accordion>
        </StyledMenuItem>

        <StyledMenuItem>
          <Accordion square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
            <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
              <ListItemIcon>
                <ExitToAppIcon style={{ color: "white" }} fontSize="inherit" />
              </ListItemIcon>
              <Typography>Log Out</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <button size="small" className={classes2.generalbutton} onClick={logOut}>
                <Link to='/' style={{ color: 'white' }}>Log Out of Fletter</Link>
              </button>
            </AccordionDetails>
          </Accordion>
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
