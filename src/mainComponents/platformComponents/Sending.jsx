import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
// Egg favorite pngs 
// import theFavorite from '../../image/eggfavorite.png';
// import unFavorite from '../../image/eggunfav.png';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '95%',
      justifyContent: 'center'
    },
    justMargin: {
        margin: 30,
        fontSize: 50
    },
    heading: {
      fontSize: theme.typography.pxToRem(18),
      flex: 1
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(16),
      color: theme.palette.text.secondary,
      flex: 2
    },
    pendingMess: {
        fontSize: theme.typography.pxToRem(16),
        color: '#D70909',
        flex: 1
    },
    coloring: {
          backgroundColor: '#f0f2f2',
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
  const [sendingData, setSendingData] = useState({});

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const token = localStorage.getItem('token');
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/messaging/sending/'.concat(token), {
          method: 'GET',
          headers: {'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        }
      }).then(data => data.json())
      .then(
          data => {
            console.log(data);
            setSendingData(data);
          }
    ).catch(error => console.error(error))
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
  setExpanded(isExpanded ? panel : false);
  };

  const modalRef = React.useRef();

  const openModal = () => {
    modalRef.current.openModal();
  };

  const sendingDisplay = Array.from(sendingData).map(message => {
    return (
      <Accordion key={message.id} expanded={expanded === message.id} onChange={handleChange(message.id)} className={classes.coloring}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >

          <Typography className={classes.heading}>To: {message.recipient_username}</Typography>
          <Typography className={classes.secondaryHeading}>{message.subject}</Typography>
          <Typography className={classes.pendingMess}>Message set to arrive at <br/>{message.time.substring(0,16).replace('T',' ')}</Typography>
        </AccordionSummary>
        <AccordionDetails >
          <Typography className={classes.body}>
            {message.body}
          </Typography>
        </AccordionDetails>
      </Accordion>
    )
  })

  const EmptySending = () => {
    return (
      <div className={classes.emptyList}>
        You don't have any fletters sending right now.
      </div>
    )
  }

  return (
    <>
    <div className={classes.root}>
        <h1 className = {classes.justMargin}>Sending</h1>
        <List style={{maxHeight: '50%', overflow: 'auto'}}>
          <div>{Array.from(sendingData).length===0 ? EmptySending() : null}</div>
          { sendingDisplay }
        </List>
    </div>
    </>
  );
}
