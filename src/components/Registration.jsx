import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import logo from '../image/Logo.png';
import './style.css';
import { BrowserRouter as Redirect, Link } from 'react-router-dom';
import TermsAndConditions from './TermsAndConditions';
import { withRouter } from "react-router";
import Loading from "../mainComponents/loading";
 
class Registration extends React.Component {
 
    state = {
        credentials: {username: '', email: '', password: '', nickname: ''},
        seen: false,
        spinner: false,
    }

    togglePop = event => {
        this.setState({
            seen: !this.state.seen
        });
    }

    render() {
        return (
            this.state.spinner ? <Loading/> :
            <div className="introbody">
                <img src={logo} className="logo" alt="Fletter" />
 
                    {this.state.seen ? <TermsAndConditions toggle={this.togglePop} /> : null}
                    <h1 className="title" >User Registration</h1>

                    <Formik
                        initialValues={{username:'', email:'', nickname:'',password:'', confirmPassword:'', agreeTerms: false}}
                        validationSchema={Yup.object().shape({
                            username: Yup.string()
                                .required("Username is required.")
                                .min(3, "Username should be at least 3 characters.")
                                .matches(/^[a-zA-Z0-9]+$/, "Letters and digits only."),
                            email: Yup.string()
                                .email("Please enter a valid email address.")
                                .required("Email is required."),
                            nickname: Yup.string()
                                .required("Nickname is required."),
                            password: Yup.string()
                                .required("Password is required.")
                                .min(8, "Password should be at least 8 characters.")
                                .matches(/(?=.*[0-9])(?=.*[a-zA-Z])/, "Password should include both letters and digits."),
                            confirmPassword: Yup.string()
                                .required("Please enter your password again for verification.")
                                .oneOf([Yup.ref('password'), null], "Passwords don't match."),
                            agreeTerms: Yup.boolean()
                                .oneOf([true], "You must agree to the Terms and Conditions in order to sign up.")
                        })}
                        onSubmit={ values => {
                            this.setState({
                                spinner: true
                            })
                            let cred = this.state.credentials;
                            cred["username"] = values.username;
                            cred["email"] = values.email;
                            cred["password"] = values.password;
                            cred["nickname"] = values.nickname;
                            this.setState({
                                credentials: cred
                            });
                            fetch('http://127.0.0.1:8000/api/auth/register', {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify(this.state.credentials)
                            })
                                .then(data => data.json())
                                .then(data => {
                                    if(data.email){   
                                        this.setState({
                                            spinner: false
                                        })
                                        alert("An account with this email address already exists. \nPlease try logging in with this email.");                 
                                        this.props.history.push('/login');
                                    }
                                    else if (data.username) {
                                        alert("This username has been taken already. \nPlease try another one.");
                                    }
                                    else{
                                        this.setState({
                                            spinner: false
                                        })
                                        this.props.history.push('/emailconfirmation');
                                    }
                                }
                                ).catch(error => {
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
                                    title="3-16 characters. Letters and digits only."
                                    placeholder="3-16 characters. Letters and digits only."
                                    maxLength="16"/><br/>
                                <ErrorMessage name="username" className="errors" component="div" />
                                
                                <label for="email" className="fieldLabel">Email *  </label> <br/>
                                <Field type="text" name="email"
                                    className={(errors.email && touched.email)?"errorField":"field"}
                                    onChange={handleChange} onBlur={handleBlur} value={values.email}
                                    title="Please enter a valid email address."/><br/>
                                <ErrorMessage name="email" className="errors" component="div" />

                                <label for="nickname" className="fieldLabel">Nickname *  </label> <br/>
                                <Field type="text" name="nickname"
                                    className={(errors.nickname && touched.nickname)?"errorField":"field"}
                                    onChange={handleChange} onBlur={handleBlur} value={values.nickname}
                                    title="Optional."/><br/>
                                <ErrorMessage name="nickname" className="errors" component="div" />
        
                                <label for="password" className="fieldLabel">Password *  </label> <br/>
                                <Field type="password" name="password"
                                    className={(errors.password && touched.password)?"errorField":"field"}
                                    onChange={handleChange} onBlur={handleBlur} value={values.password}
                                    title="8-16 characters. Must include both letters and digits. " 
                                    placeholder="8-16 characters. Must include both letters and digits. "  
                                    maxLength="16"/><br/>
                                <ErrorMessage name="password" className="errors" component="div" />
        
                                <label for="confirmPassword" className="fieldLabel">Confirm Password *  </label> <br/>
                                <Field type="password" name="confirmPassword"
                                    className={(errors.confirmPassword && touched.confirmPassword)?"errorField":"field"}
                                    onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword}
                                    title="Please enter the same password for verification."
                                     maxLength="16"/><br/>
                                <ErrorMessage name="confirmPassword" className="errors" component="div" />

                                <Field type="checkbox" className="checkbox" name="agreeTerms" />
                                    I agree to the <span onClick={this.togglePop} className="popup">Terms and Conditions.</span><br/>
                                <ErrorMessage name="agreeTerms" className="errors" component="div" />
            
                                <button type="sumbit" className="button" style={{paddingTop: '50px', paddingLeft: '25px'}}>Sign Up</button>
                            </form>
                        )}
                    </Formik>

                    <div className="center">
                        Already have an account? 
                        <Link to="/login" style={{ textDecoration: 'underline', color: 'blue'}}> Log In</Link>.
                    </div>

                    <div className="stylefooter" >Copyright © 2020 Pink Waves</div>
            </div>
        );
    }
}
 
export default withRouter(Registration);
 
 

