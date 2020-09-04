import React, {Component} from 'react';
import logo from '../image/Logo.png';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './style.css';
import { BrowserRouter as Redirect, Link } from 'react-router-dom';
import { withRouter } from "react-router";

class Login extends Component{

    state = {
        credentials: {username: '', password: ''},
    }


    render() {
        
        const logoClassName = `logo`;
        const titleClassName = `title`;
        const footerClassName = `footer`;

        return (
                <div className="introbody">
                    <img src={logo} className={logoClassName} alt="Fletter" />
                        <h1 className={titleClassName} >User Login</h1>

                        <Formik
                        initialValues={{username:'',password:''}}
                        validationSchema={Yup.object().shape({
                            username: Yup.string()
                                .required("Username is required."),
                            password: Yup.string()
                                .required("Password is required.")
                        })}
                        onSubmit={ values => {
                            let cred = this.state.credentials;
                            cred["username"] = values.username;
                            cred["password"] = values.password;
                            this.setState({
                                credentials: cred
                            });
                            fetch('http://127.0.0.1:8000/api/auth/login', {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify(this.state.credentials)
                            }).then(data => data.json())
                            .then(
                                data => {
                                    if(data.non_field_errors){
                                        alert(data.non_field_errors);
                                    }
                                    else{
                                        localStorage.setItem('token', data.token);
                                        localStorage.setItem('username', data.user.username);
                                        localStorage.setItem('bird_color', data.user.bird_color);
                                        localStorage.setItem('address', data.user.address);
                                        localStorage.setItem('date_joined', data.user.date_joined);
                                        alert("You have logged into "+ data.user.username+"!");
                                        this.props.history.push('/main');
                                    }
                                }
                            ).catch(error => {
                                console.error(error);
                                return(
                                    alert("Something went wrong. Please retry.")
                                )
                            })
                        }}              
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <label for="username" className="fieldLabel">Username *  </label> <br/>
                                <Field type="text" name="username" 
                                    className={(errors.username && touched.username)?"errorField":"field"}
                                    onChange={handleChange} onBlur={handleBlur} value={values.username}
                                    title="Please enter your username to log in."
                                    maxLength="16"/><br/>
                                <ErrorMessage name="username" className="errors" component="div" />
        
                                <label for="password" className="fieldLabel">Password *  </label> <br/>
                                <Field type="password" name="password"
                                    className={(errors.password && touched.password)?"errorField":"field"}
                                    onChange={handleChange} onBlur={handleBlur} value={values.password}
                                    title="Please enter your password to log in. " 
                                    maxLength="16"/><br/>
                                <ErrorMessage name="password" className="errors" component="div" />
            
                                <button type="sumbit" className="button" style={{paddingTop: '50px', paddingLeft: '30px'}}>Log In</button>
                            </form>
                        )}
                        </Formik>
                        
                        <div className="center"> 
                            <Link to="/forgotPassword" style={{ textDecoration: 'underline', color: 'blue'}}> Forgot Password</Link>?   
                        </div>

                        <div className="center">
                            Don't have an account? 
                            <Link to="/register" style={{ textDecoration: 'underline', color: 'blue'}}> Sign Up</Link>.
                        </div>

                    <div className={footerClassName} className="stylefooter" >Copyright © 2020 Pink Waves</div>
                </div>

        );
    }
}

export default withRouter(Login);
