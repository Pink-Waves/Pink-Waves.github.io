import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import './Modals.css';
import './ComposeModal.css';
import Modal from './Modal.jsx';
import Modal2 from './Modal2.jsx';
import Modal3 from './Modal3.jsx';
import ComposeModal from './ComposeModal.jsx';
import List from '@material-ui/core/List';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '95%',
    justifyContent: 'center'
  },
  heading: {
    fontSize: theme.typography.pxToRem(16),
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
      backgroundColor: '#f0f2f2',
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
  paper: {
    backgroundColor: '#f5f2d5',
    marginLeft: "15%",
    marginTop: "9%",
    justifyContent: 'center',
    width: "48%",
    height: "74%"
  },
  heading2: {
    fontSize: theme.typography.pxToRem(18),
    flexBasis: '33.33%',
    flexShrink: 0,
    marginLeft: 20,
    marginBottom: 20,
    marginTop: 20,
    display: "inline-block",
    marginRight: "10px",
    fontFamily: 'Abel'
  },
  bodyheading: {
    fontSize: theme.typography.pxToRem(18),
    flexBasis: '33.33%',
    flexShrink: 0,
    marginLeft: 20,
    marginBottom: 20,
    fontFamily: 'Abel'
  },
  text: {
    resize: "none",
    outline: "none",
    marginLeft: "2.5%",
    border: "1px solid #ccc",
    borderRadius: "4px"
},
  body: {
    display: "inline-block",
    width: "95%",
    height: "90%",
    overflow: "auto",
    resize: "none",
    outline: "none",
    marginLeft: "2.5%",
    marginBottom: "20px",
    border: "1px solid #ccc",
    height: "300px",
    borderRadius: "4px",
    padding: "8px"
  },
  messageBody: {
    wordBreak: "break-word"
  }
}));

export default function ControlledAccordions() {
  const [draftsData, setDraftsData] = useState({});
  const [trashData, setTrashData] = useState([]);

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const token = localStorage.getItem('token');
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/messaging/drafts/'.concat(token), {
          method: 'GET',
          headers: {'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        }
      }).then(data => data.json())
      .then(
          data => {
            setDraftsData(data);
          }
    ).catch(error => console.error(error))
  }, []);

  const deleteClick = (message) => (event) => {
    trashData.push(message);
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

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const modalRef = React.useRef();
  
  const openModal = () => {
    modalRef.current.openModal();
  };

  const modalRefCompose = React.useRef();
  
  const openModalCompose = () => {
    modalRefCompose.current.openModalCompose();
  };

  const modalRef2 = React.useRef();
  
  const openModal2 = () => {
      modalRef2.current.openModal2();
  };

  const modalRef3 = React.useRef();
  
  const openModal3 = () => {
      modalRef3.current.openModal3();
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

  const draftsDisplay = Array.from(draftsData).map(message => {
    return (
      <Accordion key={message.id} expanded={expanded === message.id} onChange={handleChange(message.id)} className={classes.coloring}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >

          <FormControlLabel
            aria-label="Delete"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<CustomCheckbox size="small" onChange={deleteClick(message)} />}
          />

          <Typography className={classes.heading}>To: {message.recipient_username}</Typography>
          <Typography className={classes.secondaryHeading}>{message.subject}</Typography>
          <Typography className={classes.timeDisplay}>{message.time.substring(0,16).replace('T',' ')}</Typography>
          <IconButton>
            <EditIcon  onClick={() => {openModalCompose(); setPk(message.id); setRecipient(message.recipient_username); setSubject(message.subject); setBody(message.body);}} />
          </IconButton>
        </AccordionSummary>
        <AccordionDetails >
          <Typography className={classes.messageBody}>
            {message.body}
          </Typography>
        </AccordionDetails>
      </Accordion>
    )
  })

  function refreshPage() {
    window.location.reload(false);
  }

  const EmptyDrafts = () => {
    return (
      <div className={classes.emptyList}>
        You don't have any saved drafts yet!
      </div>
    )
  }

  const [pk, setPk] = React.useState('');
  const [recipient, setRecipient] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [body, setBody] = React.useState('');
  const [scheduledDate, setScheduledDate] = React.useState('');

  function send(status) {
    let data = {'recipient': recipient, 'subject': subject, 'body': body, 'status': status, 'key': pk}
    if (status == 'scheduled') {
      data['time'] = scheduledDate;
    }
    fetch('http://127.0.0.1:8000/api/messaging/edit', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
          },
            body: JSON.stringify(data)
        }).then(data => data.json())
        .then(
            data => {
              if (data.username) {
                alert(data.username);
              }
              else if (data.relationships) {
                alert(data.relationships);
              }
              else {
                alert(data);
              }
            }
        ).catch(error =>{
          console.error(error);
          return(
              alert("Something went wrong. Please retry.")
          )
      })
  }

  return (
    <div className={classes.root}>
        <h1 className = {classes.justMargin}>Drafts</h1>
          <ComposeModal ref={modalRefCompose}>
            <div className="modal-body">
              <Paper elevation={14} square={true} className={classes.paper} >
                <br></br>
                <form>
                  <button type="submit" className="sendbuttons" onClick={() => send("sent")}>
                    Instant Send
                            </button>
                  <button type="submit" className="sendbuttons" onClick={() => send("delayed")}>
                    Delayed Send
                            </button>
                  <button type="button" className="sendbuttons" onClick={openModal2}>
                    Scheduled Send
                            </button>
                  <Modal2 ref={modalRef2}>
                    <div className="modal-top">
                      <button onClick={() => modalRef2.current.close2()} className="x"> &times;</button>
                    </div>
                    <div className="modal-header">
                      <form className={classes.container} noValidate>
                        <TextField
                          id="datetime-local"
                          label="Fletter Arrival Date and Time"
                          type="datetime-local"
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(event) => setScheduledDate(event.target.value)}
                        />
                      </form>
                    </div>
                    <div className="modal-body">
                      <button onClick={() => modalRef2.current.close2()} className="cancel-button">
                        Cancel
                                  </button>
                      <button type="submit" onClick={() => { send("scheduled"); modalRef2.current.close2(); refreshPage(); }} className="continue-button">
                        Continue
                                  </button>
                    </div>
                  </Modal2>
                  <button type="submit" className="savebutton" onClick={() => send("draft")}>
                    Save
                            </button>

                  <button type="button" onClick={openModal3} className="x-maincompose"> &times; </button>

                  <br/>

                  <Modal3 ref={modalRef3}>
                    <div className="modal-top">
                      <button onClick={() => modalRef3.current.close3()} className="x"> &times;</button>
                    </div>
                    <div className="modal-header">
                      <h2>Are you sure you want to exit? Exiting this page will delete all of your work.</h2>
                    </div>
                    <div className="modal-body">
                      <button onClick={() => {modalRef3.current.close3(); modalRefCompose.current.closeCompose(); }} className="cancel-button">
                        Cancel
                                </button>
                      <button className="exit-button" onClick={() => { modalRef3.current.close3(); modalRefCompose.current.closeCompose(); refreshPage();}}>
                        Exit
                                </button>
                    </div>
                  </Modal3>


                  <Typography className={classes.heading2}>
                    To:
                                </Typography>
                  <textarea rows="1" cols="18" name="recipient" placeholder="Enter an username." onInput={(event) => setRecipient(event.target.value)} 
                            required className={classes.text} value={recipient} maxLength="16"> </textarea>
                  <Typography className={classes.heading2}>
                    Subject:
                                </Typography>
                  <textarea rows="1" cols="37" name="subject" placeholder="Enter a subject line." onInput={(event) => setSubject(event.target.value)} 
                            required className={classes.text} value={subject} maxLength="35"> </textarea>
                  <Typography className={classes.bodyheading}>
                    Body:
                                </Typography>
                  <textarea rows="20" cols="88" name="body" placeholder="Enter email body here." onInput={(event) => setBody(event.target.value)} 
                            required className={classes.body} value={body}> </textarea>
                </form>
              </Paper >
            </div>
          </ComposeModal>

          <button type="button" class='trash' onClick={openModal}>
              < DeleteOutlinedIcon fontSize="large"/>
              Delete Selected Messages
          </button>
          <Modal ref={modalRef}>
          <div className="modal-top">
            <button onClick={() => modalRef.current.close()} className="x"> &times;</button>
          </div>
            <div className="modal-header">
              <h2>Are you sure you want to delete these fletters?</h2>
            </div>
            <div className="modal-body">
              <button onClick={() => modalRef.current.close()} className="cancel-button">
                Cancel
              </button>
              <button onClick={() => {modalRef.current.close(); deleteMessages(); refreshPage();}}  className="continue-button">
                Continue
              </button>
            </div>
          </Modal>
          <br></br>
          <List style={{maxHeight: '50%', overflow: 'auto'}}>
            <div>{Array.from(draftsData).length===0 ? EmptyDrafts() : null}</div>
            { draftsDisplay }
          </List>
    </div>
  );
}
