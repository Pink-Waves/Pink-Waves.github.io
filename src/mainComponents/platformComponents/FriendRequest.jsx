import React, { useState, useEffect }  from 'react';
import Modal from './Modal.jsx';
import '../custom.css';
import './Modals.css';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';


const FriendRequest = (props) => {
        const [errorMessage, setErrorMessage] = useState("");

        function refreshPage() {
            window.location.reload(false);
        }

        const openModal = () => {
            modalRef.current.openModal();
        }

        const modalRef = React.useRef();

        const addContact = {
            display: 'flex',
            flexDirection: 'row',
            cursor: 'pointer',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 15,
            paddingLeft: 25,
            paddingRight: 25
        };

        const text = {
            resize: "none",
            outline: "none",
            marginLeft: "0%",
            border: "1px solid #ccc"
        };

        const x = {
            cursor: 'pointer',
            border: "none",
            outline: "none",
            background: "none",
            fontSize: "1.25rem",
            fontWeight: "bold"
        };

        const hyperlink = {
            color: "blue",
            textDecoration: "underline"
        };

        const [addressee, setAddressee] = React.useState('');

        function send() {
            let data = {'addressee': addressee, 'status': "pending"}
            console.log(data);
            console.log(localStorage.getItem('token'));
            fetch('http://127.0.0.1:8000/api/contact/relationship', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}`
                  },
                    body: JSON.stringify(data)
                }).then(data => data.json())
                .then(
                    data => {
                        return(
                            alert(data)
                        )
                    }
                ).catch(error => {
                    console.error(error);
                    return(
                        alert("Something went wrong. Please retry.")
                    )
                })
        }

        return(
            <div>
                <div style={addContact} onClick={openModal}>
                <ListItemIcon>
                    < PersonAddOutlinedIcon fontSize="large"/>
                </ListItemIcon>
                <span style={props.emptyList ? hyperlink : null}>
                    Want to send a friend request?
                </span>
                </div>
                <Modal ref={modalRef}>
                <div className="modal-header">
                    <h3>Enter their username.</h3>
                    <button onClick={() => modalRef.current.close()} style={x}>
                    &times;
                    </button>
                    </div>
                    <div className="modal-body">
                    <textarea rows="1" cols="18" name="receiver" 
                              onInput={(event) => setAddressee(event.target.value)} 
                              required style={text} maxLength="16"></textarea>
                    <button className="request-button" onClick={() => send()}>
                    Request
                    </button>
                    </div>
                </Modal>
            </div>
        )
}

export default FriendRequest