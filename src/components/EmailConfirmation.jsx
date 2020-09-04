import React, {Component} from 'react';
import logo from '../image/Logo.png';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './style.css';
import { withRouter } from "react-router";

class EmailConfirmation extends Component{

    state = {
        credentials: {email: '', key: ''},
    }

    render() {

        const form = {
            position: "absolute",
            top: "20%",
            left: "20%",
            width: "70%",
            fontSize: "18px",
            color: "#000000"
        };

        const infotext1 = {
            position: "absolute",
            top: "22%",
            left: "5%",
            width: "90%",
            fontSize: "18px",
            textAlign: "center",
            color: "#000000"
        };

        const infotext2 = {
            position: "absolute",
            top: "32%",
            left: "5%",
            width: "90%",
            fontSize: "18px",
            textAlign: "center",
            color: "#000000"
        };

        const formstyle = {
            position: "absolute",
            top: "40%",
            left: "20%",
            width: "70%",
            fontSize: "18px",
            color: "#000000"
        };

        const logoClassName = `logo`;
        const titleClassName = `title`;
        const footerClassName = `footer`;
        const fieldLabelClassName = 'fieldLabel';
        const fieldClassName = 'field';
        
        return (

            <div className="introbody">
                <img src={logo} className={logoClassName} alt="Fletter" />
                <h1 className={titleClassName} >Just one more step ...</h1>
                <div >
                    <p style={infotext1}>
                        We have sent an email to your inbox to confirm the validity of your email address. <br/>
                        After receiving the email, input your unique code to activate your account.
                    </p>
                    <p style={infotext2}> If you did not receive an email, resend the email confirmation.</p>

                    <Formik
                            initialValues={{email:'', key: ''}}
                            validationSchema={Yup.object().shape({
                                email: Yup.string()
                                    .email("Please enter a valid email address.")
                                    .required("Email is required."),
                                key: Yup.string()
                                    .required("Code is required."),
                            })}
                            onSubmit={ values => {
                                let cred = this.state.credentials;
                                cred["email"] = values.email;
                                cred["key"] = values.key;
                                this.setState({
                                    credentials: cred
                                });
                                fetch('http://127.0.0.1:8000/api/auth/confirmEmail', {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify(this.state.credentials)
                                }).then(data => data.json())
                                .then(
                                    data => {
                                        if(data.non_field_errors){
                                            alert(data.non_field_errors);
                                        }
                                        else if(data.login){
                                            alert(data.login);
                                            this.props.history.push('/login');
                                        }
                                        else if(data.key){
                                            alert(data.key);
                                        }
                                        else{
                                            this.props.history.push('/emailverified');
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
                                <form onSubmit={handleSubmit} style={formstyle}>                                
                                    <label for="email" className="sFieldLabel">Email *  </label> <br/>
                                    <Field type="text" name="email"
                                        className={(errors.email && touched.email)?"errorSField":"sField"}
                                        onChange={handleChange} onBlur={handleBlur} value={values.email}
                                        title="Please enter a valid email address."/><br/>
                                    <ErrorMessage name="email" className="errors" component="div" />

                                    <label for="key" className="sFieldLabel">Code *  </label> <br/>
                                    <Field type="text" name="key"
                                        className={(errors.key && touched.key)?"errorSField":"sField"}
                                        onChange={handleChange} onBlur={handleBlur} value={values.key}
                                        placeholder="Please enter the verification code that has been sent to your email."
                                        title="Please enter the verification code that has been sent to your email."/><br/>
                                    <ErrorMessage name="key" className="errors" component="div" />

                                    <button type="submit" className="button" style={{paddingTop: '50px', paddingLeft: '25px', position: "absolute", top: '105%', left: '39%'}}> 
                                        Submit
                                    </button>
                                </form>
                            )}
                        </Formik>

                </div>
                <div className={footerClassName} className="stylefooter" >Copyright © 2020 Pink Waves</div>

            </div>
        );

    }
}

export default withRouter(EmailConfirmation);
 