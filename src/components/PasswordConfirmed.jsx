import React, {Component} from 'react';
import logo from '../image/Logo.png';
import checkmark from '../image/checkmark.png';
import { BrowserRouter as Redirect, Link } from 'react-router-dom';
import './style.css';

class PasswordConfirmed extends Component{
    render() {

        const infotext1 = {
            position: "absolute",
            top: "65%",
            left: "5%",
            width: "90%",
            fontSize: "18px",
            textAlign: "center",
            color: "#000000"
        };

        const infotext2 = {
            position: "absolute",
            top: "70%",
            left: "5%",
            width: "90%",
            fontSize: "18px",
            textAlign: "center",
            color: "#000000"
        };

        const checkmarkspecs = {
            display: "block",
            marginTop: "-4%",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "30px"
        };

        const logoClassName = `logo`;
        const titleClassName = `title`;
        const footerClassName = `footer`;
        const fieldLabelClassName = 'fieldLabel';
        const fieldClassName = 'field';
        
        return (
            <div className="introbody">
                <img src={logo}  alt="Fletter" className={logoClassName}/>
                <br></br>
                <h1 className={titleClassName}>Your password has been reset!</h1>
                <img src={checkmark} alt="Checkmark" style={checkmarkspecs}/>
                <p style={infotext1}>
                Your password has been changed.
                </p>
                <p style={infotext2}> 
                You many now close the screen or proceed to the <Link to="/login" style={{ textDecoration: 'underline', color: 'blue'}}> login page</Link>.
                </p>
                <div className={footerClassName} className="stylefooter" >Copyright © 2020 Pink Waves</div>

            </div>
        );
    }
}

export default PasswordConfirmed;