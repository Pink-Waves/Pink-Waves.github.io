import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import './Modals.css';
import Modal from './Modal.jsx';
import Modal2 from './Modal2.jsx';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '95%',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: '#f5f2d5',
    marginLeft: 30,
    justifyContent: 'center',
    maxHeight: "450px",
    minHeight: "450px"
  },
  heading: {
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
  justMargin: {
      margin: 30,
      fontSize: 50
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
    height: "250px"
  }
}));

export default function ControlledAccordions() {
  const classes = useStyles();
  
  const modalRef = React.useRef();

  const openModal = () => {
    modalRef.current.openModal();
  };

  const modalRef2 = React.useRef();
  
  const openModal2 = () => {
      modalRef2.current.openModal2();
  };

  const [recipient, setRecipient] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [body, setBody] = React.useState("");
  const [scheduledDate, setScheduledDate] = React.useState("");

  function send(status) {
    let data = {'recipient': recipient, 'subject': subject, 'body': body, 'status': status}
    if (status == 'scheduled') {
      data['time'] = scheduledDate;
    }
    fetch('http://127.0.0.1:8000/api/messaging/message', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
          },
            body: JSON.stringify(data)
        }).then(data => data.json())
        .then(
            data => {
              console.log(data.subject);
              if (data.username) {
                alert(data.username);
              }
              else if (data.relationships) {
                alert(data.relationships);
              }
              else {
                alert(data);
                refreshPage();
              }
            }
        ).catch(error =>{
          console.error(error);
          return(
              alert("Something went wrong. Please retry.")
          )
      })
  }
  
  function refreshPage() {
    window.location.reload(false);
  }

    return (
        <div className={classes.root}>
            <h1 className = {classes.justMargin}>Compose</h1>
                <div>
                    <Paper elevation={14} square={true} className={classes.paper}>
                        <br></br>
                        <form>
                        <button type="submit" className="sendbuttons" onClick={() => {send("sent");}}>
                            Instant Send
                        </button>
                        <button type="submit" className="sendbuttons" onClick={() => {send("delayed");}}>
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
                              <button type="submit" onClick={() => {send("scheduled"); modalRef2.current.close2(); refreshPage();}} className="continue-button">
                                Continue
                              </button>
                            </div>
                          </Modal2>
                        <button type="submit" className="savebutton" onClick={() => {send("draft");}}>
                            Save
                        </button>

                        <button onClick={openModal} className="x-maincompose"> &times;</button>
                        <br/>
                        <Modal ref={modalRef}>
                            <div className="modal-top">
                              <button onClick={() => modalRef.current.close()} className="x"> &times;</button>
                            </div>
                            <div className="modal-header">
                                <h2>Are you sure you want to exit? Exiting this page will delete all of your work.</h2>
                            </div>
                            <div className="modal-body">
                            <button onClick={() => modalRef.current.close()} className="cancel-button">
                                Cancel
                            </button>
                            <button className="exit-button" onClick={() => {modalRef.current.close(); refreshPage();}}>
                                Exit
                            </button>
                            </div>
                        </Modal>

                        
                            <Typography className={classes.heading}>
                                To:
                            </Typography>
                            <textarea rows="1" cols="18" name="recipient" placeholder="Enter a username."  onInput={(event) => setRecipient(event.target.value)} 
                                      required className={classes.text} maxLength="16" ></textarea>
                            <Typography className={classes.heading}>
                                Subject:
                            </Typography>
                            <textarea rows="1" cols="37" name="subject" placeholder="Enter a subject line." onInput={(event) => setSubject(event.target.value)}
                                      required className={classes.text} maxLength="35"></textarea>
                            <Typography className={classes.bodyheading}>
                                Body:
                            </Typography>
                            <textarea rows="15" cols="88" name="body" placeholder="Enter email body here." onInput={(event) => setBody(event.target.value)} required className={classes.body}></textarea>
                        </form>
                    </Paper>
                </div>
        </div>
    )

}
