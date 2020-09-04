import React, { useState, useEffect, setState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import './Modals.css';
import Modal from './Modal.jsx';
import List from '@material-ui/core/List';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '95%',
    justifyContent: 'center'
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    flex: 1.1,
    padding: "10px 0"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.text.secondary,
    flex: 2,
    padding: "10px 0"
  },
  timeDisplay: {
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.text.secondary,
    flex: 0.9,
    padding: "10px 0"
  },
  coloring: {
      backgroundColor: '#C9D2D5',
      marginLeft: 30,
      marginBottom: 20,
      marginTop: 30
  },
  justMargin: {
      margin: 30,
      fontSize: 50
  },
  emptyList: {
    marginTop: "2%",
    textAlign: "center",
    fontSize: "16px"
  },
  body: {
    wordBreak: "break-word"
  }
}));

export default function ControlledAccordions() {
  const [inboxData, setInboxData] = useState({});
  const [trashData, setTrashData] = useState([]);

  const token = localStorage.getItem('token');
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/messaging/inbox/'.concat(token), {
          method: 'GET',
          headers: {'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        }
      }).then(data => data.json())
      .then(
          data => {
            setInboxData(data);
          }
    ).catch(error => console.error(error))
  }, []);

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const modalRef = React.useRef();
  
  const openModal = () => {
    modalRef.current.openModal();
  };

  const checkBoxStyles = theme => ({
    root: {
      '&$checked': {
        color: '#274D5A',
      },
    },
    checked: {},
   })

  const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);


  const favoriteClick = (message) => (event) => {
    fetch('http://127.0.0.1:8000/api/messaging/favorite', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(message)
      }).then(data => data.json())
      .then(
          data => {
          }
    ).catch(error => console.error(error))
  };

  const deleteClick = (message) => (event) => {
    if (trashData.includes(message)) {
      var loc = trashData.indexOf(message);
      if (loc >= 0) {
        trashData.splice(loc, 1);
      }
    }
    else {
      trashData.push(message);
    }
  };

  const deleteMessages = () => {
    fetch('http://127.0.0.1:8000/api/messaging/delete', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(trashData)
      }).then(data => data.json())
      .then(
          data => {
          }
    ).catch(error => console.error(error))
  };

  const inboxDisplay = Array.from(inboxData).map(message => {
    return (
      <Accordion key={message.id} expanded={expanded === message.id} onChange={handleChange(message.id)} className={classes.coloring}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <FormControlLabel
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<Checkbox defaultChecked={message.favorite} onChange={favoriteClick(message)} checkedIcon = {<Favorite/>} icon = {<FavoriteBorder/>}/>}
          />
          
          <label class = "container">
          <input
            class="container"
            type="checkbox"
            aria-label="Delete"
            id={message.id}
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            onChange={deleteClick(message)}
          />  
          <span class="checkmark"></span>  
          </label>
          <Typography className={classes.heading}>{message.sender_username}</Typography>
          <Typography className={classes.secondaryHeading}>{message.subject}</Typography>
          <Typography className={classes.timeDisplay}>{message.time.substring(0,16).replace('T',' ')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography display="inline" className={classes.body}>
            {message.body}
          </Typography>
        </AccordionDetails>
      </Accordion>
    )
  })

  function refreshPage() {
    window.location.reload(false);
  }

  const EmptyInbox = () => {
    return (
      <div className={classes.emptyList}>
        You don't have any fletters in your inbox yet. 
      </div>
    )
  }

  const checkAll = () => {
    var parent = document.getElementById("parent");
    if(parent.checked == true) {
      Array.from(inboxData).map(message => {
        if (trashData.includes(message) === false) {
          trashData.push(message);
        }
        document.getElementById(message.id).checked = true;
      });
    }
    else if(parent.checked === false) {
      Array.from(inboxData).map(message => {
        document.getElementById(message.id).checked = false;
      });
      setTrashData([]);
    }
  };

  return (
    <div className={classes.root}>
        <h1 className = {classes.justMargin}>Inbox</h1>
          <button type="button" class='trash' onClick={openModal} >
              < DeleteOutlinedIcon fontSize="large"/>
              Delete Selected Messages
          </button>
          <span id="label">Select All</span>
          <input type="checkbox" onClick={checkAll} id="parent"/>
          <Modal ref={modalRef}>
            <div className="modal-top">
              <button onClick={() => modalRef.current.close()} className="x"> &times;</button>
            </div>
            <div className="modal-header">
              <h2>Are you sure you want to delete these fletters?</h2>
            </div>
            <div className="modal-body">
              <button onClick={() => modalRef.current.close()}className="cancel-button">
                Cancel
              </button>
              <button onClick={() => {modalRef.current.close(); deleteMessages(); refreshPage();}} className="continue-button">
                Continue
              </button>
            </div>
          </Modal>
          <br></br>
          <List style={{maxHeight: '50%', overflow: 'auto'}}>
            <div>{Array.from(inboxData).length===0 ? EmptyInbox() : null}</div>
            { inboxDisplay }
          </List>
    </div>
  );
}
