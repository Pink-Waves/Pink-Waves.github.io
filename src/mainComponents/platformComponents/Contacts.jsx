import React, { useState, useEffect }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Modal from './Modal.jsx';
import Modal2 from './Modal2.jsx';
import Modal3 from './Modal3.jsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import BlueBird from '../../image/bluebird.png';
import YellowBird from '../../image/yellowbird.png';
import PinkBird from '../../image/pinkbird.png';
import BrownBird from '../../image/brownbird.png';
import GreenBird from '../../image/greenbird.png';
import FriendRequest from "./FriendRequest";
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import { IconButton } from '@material-ui/core';
 
const useStyles = makeStyles((theme) => ({
  root: {
    width: '95%',
    justifyContent: 'center'
  },
  justMargin1: {
      margin: 30,
      fontSize: 50
  },
  justMargin2: {
    margin: 30
},
  pendingroot: {
    display: 'flex',
    maxWidth: 700,
    maxHeight: 90,
    marginBottom: "15px",
    marginLeft: "40px",
    transition: "0.3s",
    backgroundColor: "#eeeeee",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.8)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.8)"
    }
  },
  contactroot: {
    display: 'flex',
    maxWidth: 700,
    maxHeight: 90,
    marginBottom: "15px",
    marginLeft: "40px",
    transition: "0.3s",
    backgroundColor: "#ffffff",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  details: {
    flex: "9",
    display: 'flex',
    flexDirection: 'column'
  },
  pendingcontent: {
    flex: '1 0 auto',
    padding: '5px'
  },
  contactcontent:{
    flex: '1 0 auto',
    padding: '5px'
  },
  birdImage: {
    height: "90px",
    padding: "7px",
    flex: "1"
  },
  unfriendIcon: {
    flex: "1",
    padding: "5px",

    hover: {
      cursor: "pointer"
    },

    active: {
      cursor: "grabbing"
    }
  },
  emptyList: {
    textAlign: "center",
    fontSize: "16px"
  },
  close: {
    marginLeft: "320px"
  }
}));
 
export default function ControlledAccordions() {
  const classes = useStyles();
  const [requestData, setRequestData] = useState({});
  const [contactData, setContactData] = useState({});

  const modalRef = React.useRef();
  
  const openModal = () => {
    modalRef.current.openModal();
  };

  const modalRef2 = React.useRef();
  
  const openModal2 = () => {
    modalRef2.current.openModal2();
  };

  const modalRef3 = React.useRef();

  const openModal3 = () => {
    modalRef3.current.openModal3();
  };

  const token = localStorage.getItem('token');
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/contact/friendRequest/'.concat(token), {
          method: 'GET',
          headers: {'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        }
      }).then(data => data.json())
      .then(
          data => {
            console.log(data);
            setRequestData(data);
          }
    ).catch(error => console.error(error))
    
    fetch('http://127.0.0.1:8000/api/contact/contact/'.concat(token), {
          method: 'GET',
          headers: {'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        }
      }).then(data => data.json())
      .then(
          data => {
            console.log(data);
            setContactData(data);
          }
    ).catch(error => console.error(error))
  }, []);
 
  const FriendRequestList = Array.from(requestData).map(request => {
    return (
      <Card className={classes.pendingroot} key={request.id}> 
          <CardMedia>
              <img className={classes.birdImage} src={(() => {
                switch (request.requester_birdColor) {
                  case "yellow":   return YellowBird;
                  case "green": return GreenBird;
                  case "blue":  return BlueBird;
                  case "brown": return BrownBird;
                  case "Pink":  return PinkBird;
                  default: return YellowBird;
                }
            })()} title="User profile picture" />
          </CardMedia>
          <div className={classes.details}>
            <CardContent className={classes.pendingcontent}>
              <Typography component="h6" variant="h6">{ request.requester_username }</Typography>
              <Typography variant="body2" color="textSecondary">
                Request sent on { request.created_time.substring(0, 10) }
              </Typography>
              <button className="navyButton" onClick={() => {accept(request.requester_username); openModal();}} >Accept</button>
                <Modal ref={modalRef}>
                  <div className={"modal-header"&&classes.close}>
                    <button onClick={() => {modalRef.current.close(); refreshPage();}} className="x">
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <h2>"{ request.requester_username }" has been added to your contact list!</h2>
                  </div>
                </Modal>
              <button onClick={() => {deleteRequest(request.requester_username); openModal2();}} >Decline</button>
              <Modal2 ref={modalRef2}>
                  <div className={"modal-header"&&classes.close}>
                    <button onClick={() => {modalRef2.current.close2(); refreshPage();}} className="x">
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <h2>"{ request.requester_username }" has been declined.</h2>
                  </div>
              </Modal2>
            </CardContent>
          </div>
      </Card>
    )
  })

  function accept(requester_username) {
    let data = { requester: requester_username }
    console.log(data);
    console.log(localStorage.getItem('token'));
    fetch('http://127.0.0.1:8000/api/contact/acceptRequest/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
          },
            body: JSON.stringify(data)
        }).then(data => data.json())
        .then(
            data => {
                console.log(data);
            }
        ).catch(error => console.error(error))
  }

  function deleteRequest(requester_username) {
    let data = { requester: requester_username }
    console.log(data);
    console.log(localStorage.getItem('token'));
    fetch('http://127.0.0.1:8000/api/contact/deleteRequest/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
          },
            body: JSON.stringify(data)
        }).then(data => data.json())
        .then(
            data => {
                console.log(data);
            }
        ).catch(error => console.error(error))
  }

  const EmptyContactList = () => {
    return (
      <div className={classes.emptyList}>
        You don't have any friends yet!
        <FriendRequest emptyList={true} />
      </div>
    )
  }
 
  const ContactList = Array.from(contactData).map(contact => {
    return (
      <Card className={classes.contactroot} key={contact.id}> 
            <CardMedia>
              <img className={classes.birdImage} src={(() => {
                switch (contact.contact_birdColor) {
                  case "yellow":   return YellowBird;
                  case "green": return GreenBird;
                  case "blue":  return BlueBird;
                  case "brown": return BrownBird;
                  case "Pink":  return PinkBird;
                  default: return YellowBird;
                }
              })()} title="User profile picture" />
            </CardMedia>
            <div className={classes.details}>
                <CardContent className={classes.contactcontent}>
                    <Typography component="h6" variant="h6"> { contact.contact_username }</Typography>
                    <Typography variant="subtitle2" color="textSecondary">{ contact.contact_address } </Typography>
                    <Typography variant="body2" color="textSecondary">Friends since { contact.created_time.substring(0, 10) } </Typography>
                </CardContent>
            </div>
            <div className={classes.unfriendIcon}>
              <IconButton>
                <PersonAddDisabledIcon onClick={() => openModal3()}/>
                <Modal3 ref={modalRef3}>
                  <div className="modal-top">
                    <button onClick={() => modalRef3.current.close3()} className="x"> &times;</button>
                  </div>
                  <div className="modal-header">
                    <h2>Are you sure you want to remove "{ contact.contact_username }" as your friend?</h2>
                  </div>
                  <div className="modal-body">
                  <button className="cancel-button" onClick={() => modalRef3.current.close3()}>
                    Cancel
                  </button>
                  <button className="continue-button" onClick={() => {deleteRequest(contact.contact_username); modalRef3.current.close3(); refreshPage();}}>
                    Continue
                  </button>
                </div>
              </Modal3>
              </IconButton>
            </div>
        </Card>
    )
  })

  function refreshPage() {
    window.location.reload(false);
  }
 
  return (
    <div className={classes.root}>
        <h1 className={classes.justMargin1}>Contacts</h1>
        <List style={{maxHeight: '50%', overflow: 'auto'}}>
          <h2 className={classes.justMargin2}> 
            {Array.from(requestData).length===0 ? null : "Pending Friend Requests" }
          </h2>
            { FriendRequestList }
          <h2 className={classes.justMargin2}>Contact List</h2>
          <div>{Array.from(contactData).length===0 ? EmptyContactList() : null}</div>
            { ContactList }
        </List>
    </div>
  );
}


