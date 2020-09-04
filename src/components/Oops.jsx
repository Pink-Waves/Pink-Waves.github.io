import React, {Component} from 'react';
import logo from '../image/Logo.png';
import './style.css';
import { BrowserRouter as Redirect, Link } from 'react-router-dom';

class Oops extends Component{

    render() {
        
        const logoClassName = `logo`;
        const titleClassName = `title`;
        const footerClassName = `footer`;
        const fieldLabelClassName = 'fieldLabel';
        const fieldClassName = 'field'

        return (
            <div className="introbody">
                <img src={logo} className={logoClassName} alt="Fletter" />
                    <h1 className={titleClassName} >Oops! Please log in to continue</h1>

                    <a className="button" onClick={this.login} style={{paddingTop: '50px', paddingLeft: '30px'}}> 
                        <Link to="/login" style={{ textDecoration: 'none', color: 'black'}}> Log In </Link>  
                    </a>

                    <div className="center">
                        Don't have an account? 
                        <Link to="/register" style={{ textDecoration: 'underline', color: 'blue'}}> Sign Up</Link>.
                    </div>

                <div className={footerClassName} className="stylefooter" >Copyright © 2020 Pink Waves</div>
            </div>
        );
    }
}

export default Oops;
