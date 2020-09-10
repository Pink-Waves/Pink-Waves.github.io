import React from "react";

import Compose from "./platformComponents/Compose";
import Inbox from "./platformComponents/Inbox";
import Drafts from "./platformComponents/Drafts";
import Sending from "./platformComponents/Sending";
import Contacts from "./platformComponents/Contacts";
import Favorites from "./platformComponents/Favorites";
import Trash from "./platformComponents/Trash";
import FriendRequest from "./platformComponents/FriendRequest";
import Settings from "./Settings";
import BirdCustom from "../components/BirdCustom";
import Address from "../components/Address";
import Loading from "./loading";

import "./custom.css";
import bird from "./birdPost2.png";
import logo from "../image/Logo.png";

import { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import PeopleOutlineOutlinedIcon from "@material-ui/icons/PeopleOutlineOutlined";
import MarkunreadMailboxOutlinedIcon from "@material-ui/icons/MarkunreadMailboxOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import DraftsOutlinedIcon from "@material-ui/icons/DraftsOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";

import ListItemIcon from "@material-ui/core/ListItemIcon";

import Link from "@material-ui/core/Link";
import Oops from "../components/Oops";

import Birdgifs from "./birdgifs";

const useStyles = makeStyles(() => ({
  root: {
    "& > *": {
      width: 500,
    },
  },
}));

export default function MainMenu() {
  const [menuItemSelected, setMenuItemSelected] = useState(1);
  const [spinner, setSpinner] = useState(true);
  const [mainData, setMainData] = useState([]);
  const classes = useStyles();
  const token = localStorage.getItem('token');

  useEffect(() => {
    setTimeout(() => setSpinner(false), 1000);
  }, []);

  useEffect(() =>
  {
    console.log(token);
    fetch('http://127.0.0.1:8000/api/auth/customizeBird/'.concat(token), {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
        Authorization: `Token ${token}`
        }
      }).then(data => data.json())
    .then(
      data => {
        setMainData(data);
        console.log(data);
    })
    .catch(error => console.error(error))
  },[]);

  if (mainData.color=="") { 
    return (
      <BirdCustom/>
      );
    }
    if (mainData.address=="") { 
      return (
        <Address/>
      );
   }
   
   if (localStorage.getItem('token') == null || localStorage.getItem('token') == 'undefined') {
    console.log('test');
    return (    
        <Oops/>
      );
    }
  

  return spinner ? (
    <Loading />
  ) : (
    <div
      style={{
        minHeight: "100%",
        width: "100%",
        position: "absolute",
        bottom: 0,
        background:
          "linear-gradient(180deg, #97D4D7 0%, #AEDDDE 19.27%, #F0F9FA 60.94%, #FFFFE0 82.29%, #FCD3AE 100%)",
      }}
      container
    >
      <div style={{ ...styles.row, ...styles.header }} search-row>
        <img style={styles.logo} src={logo} alt="logo" />
        <form
          className={classes.root}
          style={styles.searchbar}
          noValidate
          autoComplete="off"
          search-bar
        >
          <TextField id="filled-basic" label="Search" variant="filled" />
        </form>
        <div style={styles.settingBar}>
          <Settings />
        </div>
      </div>
      <div style={styles.row} row>
        <div style={styles.menuItems}>
          <div
            style={styles.composeButton}
            menu-item-0
            className="button"
            onClick={() => setMenuItemSelected(0)}
          >
            <ListItemIcon>
              <EmailOutlinedIcon type="button" fontSize="large" />
            </ListItemIcon>
          </div>
          <Link
            color="Black"
            style={styles.menuRow}
            menu-item-1
            onClick={() => setMenuItemSelected(1)}
          >
            <ListItemIcon>
              <MarkunreadMailboxOutlinedIcon type="button" fontSize="large" />
            </ListItemIcon>
            Inbox
          </Link>
          <Link
            color="Black"
            style={styles.menuRow}
            menu-item-2
            onClick={() => setMenuItemSelected(2)}
          >
            <ListItemIcon>
              <DraftsOutlinedIcon fontSize="large" />
            </ListItemIcon>
            Drafts
          </Link>
          <Link
            color="Black"
            style={styles.menuRow}
            menu-item-3
            onClick={() => setMenuItemSelected(3)}
          >
            <ListItemIcon>
              <SendOutlinedIcon fontSize="large" />
            </ListItemIcon>
            Sending
          </Link>
          <Link
            color="Black"
            style={styles.menuRow}
            menu-item-4
            onClick={() => setMenuItemSelected(4)}
          >
            <ListItemIcon>
              <PeopleOutlineOutlinedIcon fontSize="large" />
            </ListItemIcon>
            Contacts
          </Link>
          <Link
            color="Black"
            style={styles.menuRow}
            menu-item-5
            onClick={() => setMenuItemSelected(5)}
          >
            <ListItemIcon>
              <FavoriteBorderOutlinedIcon fontSize="large" />
            </ListItemIcon>
            Favorites
          </Link>
          <Link
            color="Black"
            style={styles.menuRow}
            menu-item-6
            onClick={() => setMenuItemSelected(6)}
          >
            <ListItemIcon>
              <DeleteOutlinedIcon fontSize="large" />
            </ListItemIcon>
            Trash
          </Link>
          <FriendRequest emptyList={false} />
        </div>
        <div style={styles.platform} platform-col>
          {menuItemSelected === 1 && <Inbox />}
          {menuItemSelected === 2 && <Drafts />}
          {menuItemSelected === 3 && <Sending />}
          {menuItemSelected === 4 && <Contacts />}
          {menuItemSelected === 5 && <Favorites />}
          {menuItemSelected === 6 && <Trash />}
          {menuItemSelected === 0 && <Compose />}
        </div>
        <div style={styles.picRow}>
          <Birdgifs />
        </div>
      </div>
      <div className="bot_color" style={{ ...styles.bottomRow }} bottom-row>
        <div copyright>Copyright &copy; 2020 Pink Waves</div>
      </div>
    </div>
  );
}

const styles = {
  row: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    fontFamily: "Abel",
  },
  col: {
    display: "flex",
    flexDirection: "col",
  },
  header: {
    justifyContent: "left",
    width: "100%",
  },
  menuItems: {
    alignItems: "center",
    justifyContent: "space-around",
    width: "15%",
    paddingTop: 40,
  },
  platform: {
    display: "flex",
    flexDirection: "row",
    width: "60%",
    paddingLeft: 10,
  },
  menuRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "left",
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 10,
    paddingTop: 10,
    cursor: "pointer",
    fontSize: "180%",
    background: "#FFEDBF",
    mixblendmode: "normal",
  },
  bottomRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 11,
    position: "absolute",
    bottom: 0,
  },
  picRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "25%",
    paddingTop: 160,
    height: "100%",
  },
  settingBar: {
    paddingLeft: "20%",
  },
  composeButton: {
    display: "flex",
    flexDirection: "row",
    cursor: "pointer",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 25,
  },
  logo: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "8%",
    maxHeight: "8%",
    marginLeft: "4%",
  },
  searchbar: {
    display: "flex",
    flexDirection: "col",
    paddingLeft: "20%",
  },
};

// I took out the border styles, if you see an empty space in any of the styles,
// that's where the border prop was and can be filled back in to work on the grid with 'solid'. -Todd
