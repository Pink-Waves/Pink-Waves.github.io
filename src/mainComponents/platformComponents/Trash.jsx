import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import './Modals.css';
import Modal from './Modal.jsx';
import Modal2 from './Modal2.jsx';
import List from '@material-ui/core/List';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RestoreFromTrashOutlinedIcon from '@material-ui/icons/RestoreFromTrashOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '95%',
      justifyContent: 'center'
    },
    justMargin: {
        margin: 30,
        fontSize: 50
    },
    centered: {
        justifyContent: 'center',
        textAlign: 'center',
        left: '50%'
    },
    trashall: {
        height: "50px",
        width: "300px",
        backgroundColor: "Transparent",
        backgroundRepeat: "no-repeat",
        border: "none",
        outline: 'none',
        cursor: "pointer",
        textAlign: "center",
        margin: "auto",
        display: 'flex',
        flexDirection: 'row',
        fontFamily: 'Abel',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 35,
        paddingLeft: 25,
        paddingRight: 25,
        color: "#274D5A"
    },
    heading: {
      fontSize: theme.typography.pxToRem(18),
      flex: 1,
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
      flex: 1,
      padding: "10px 0"
    },
    coloring: {
      backgroundColor: '#C9D2D5',
      marginLeft: 30,
      marginBottom: 20,
      marginTop: 30
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
    const [trashData, setTrashData] = useState({});
    const [permanentTrashData, setPermanentTrashData] = useState([]);
    
    const token = localStorage.getItem('token');
    useEffect(() => {
      fetch('http://127.0.0.1:8000/api/messaging/delete/'.concat(token), {
            method: 'GET',
            headers: {'Content-Type': 'application/json',
            Authorization: `Token ${token}`
          }
        }).then(data => data.json())
        .then(
            data => {
              console.log(data);
              setTrashData(data);
            }
      ).catch(error => console.error(error))
    }, []);
  
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    };

    const modalRef = React.useRef();
  
    const openModal = () => {
      modalRef.current.openModal();
    };

    const modalRef2 = React.useRef();
  
    const openModal2 = () => {
      modalRef2.current.openModal2();
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
              console.log(data);
            }
      ).catch(error => console.error(error))
    };
    
    const deleteClick = (message) => (event) => {
      if (permanentTrashData.includes(message)) {
        var loc = permanentTrashData.indexOf(message);
        if (loc >= 0) {
          permanentTrashData.splice(loc, 1);
        }
      }
      else {
        permanentTrashData.push(message);
      }
    };
  
    const permanentlyDeleteMessages = () => {
      console.log(JSON.stringify(permanentTrashData));
      fetch('http://127.0.0.1:8000/api/messaging/delete', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(permanentTrashData)
        }).then(data => data.json())
        .then(
            data => {
              console.log(data);
            }
      ).catch(error => console.error(error))
    };

    const restoreMessages = () => {
      console.log(JSON.stringify(permanentTrashData));
      fetch('http://127.0.0.1:8000/api/messaging/restore', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(permanentTrashData)
        }).then(data => data.json())
        .then(
            data => {
              console.log(data);
            }
      ).catch(error => console.error(error))
    };
  
    const trashDisplay = Array.from(trashData).map(message => {
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
          <AccordionDetails >
            <Typography className={classes.body}>
              {message.body}
            </Typography>
          </AccordionDetails>
        </Accordion>
      )
    })
    
    function refreshPage() {
      window.location.reload(false);
    }

    const EmptyTrash = () => {
      return (
        <div className={classes.emptyList}>
          You don't have any deleted fletters in trash!
        </div>
      )
    }

    const checkAll = () => {
      var parent = document.getElementById("parent");
      if(parent.checked == true) {
        Array.from(trashData).map(message => {
          if (permanentTrashData.includes(message) == false) {
            permanentTrashData.push(message);
          }
          document.getElementById(message.id).checked = true;
        });
      }
      else if(parent.checked == false) {
        Array.from(trashData).map(message => {
          document.getElementById(message.id).checked = false;
        });
        setPermanentTrashData([]);
      }
    };

    return (
      <>
      <div className={classes.root}>
          <h1 className = {classes.justMargin}>Trash</h1>
          <button type="button"  class="recover" onClick={openModal2}>
            <RestoreFromTrashOutlinedIcon fontSize="large"/>
            Restore Selected Messages
          </button>
          <span id="label">Select All</span>
          <input type="checkbox" onClick={checkAll} id="parent"/>
          <Modal2 ref={modalRef2}>
            <div className="modal-top">
              <button onClick={() => modalRef2.current.close2()} className="x"> &times;</button>
            </div>
            <div className="modal-header">
              <h2>Are you sure you want to restore these fletters?</h2>
            </div>
            <div className="modal-body">
              <button onClick={() => modalRef2.current.close2()}className="cancel-button">
                Cancel
              </button>
              <button className="continue-button" onClick={() => {restoreMessages(); modalRef2.current.close2(); refreshPage();}}>
                Continue
              </button>
            </div>
          </Modal2>
          <br></br>
          <List style={{maxHeight: '40%', overflow: 'auto'}}>
          <div>{Array.from(trashData).length===0 ? EmptyTrash() : null}</div>
            { trashDisplay }
          </List>
          <button type="button" onClick={openModal} className={classes.trashall}>
            < DeleteForeverIcon fontSize="large"/>
            Permanently Delete Selected Fletters
          </button>
          <Modal ref={modalRef}>
              <div className="modal-top">
                <button onClick={() => modalRef.current.close()} className="x"> &times;</button>
              </div>
              <div className="modal-header">
                  <h2>Are you sure you want to permanently delete selected Fletters? This action cannot be undone.</h2>
              </div>
              <div className="modal-body">
              <button onClick={() => modalRef.current.close()}className="cancel-button">
                  Cancel
              </button>
              <button className="continue-button" onClick={() => {permanentlyDeleteMessages(); modalRef.current.close(); refreshPage();}}>
                  Continue
              </button>
              </div>
          </Modal>
      </div>
      </>
    );
  }
  
