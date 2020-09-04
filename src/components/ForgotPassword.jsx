import React, {Component} from 'react';
import logo from '../image/Logo.png';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './style.css';
import { withRouter } from "react-router";

class ForgotPassword extends Component{

    state = {
        credentials: {email: ''}
    }

    render() {

        const form = {
            position: "absolute",
            top: "35%",
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
            top: "27%",
            left: "5%",
            width: "90%",
            fontSize: "18px",
            textAlign: "center",
            color: "#000000"
        };

        const logoClassName = `logo`;
        const titleClassName = `title`;


        return (
            <div className="introbody">
                <img src={logo} className={logoClassName} alt="Fletter" />
                <h1 className={titleClassName} >Forget Password</h1>
                <div>
                    <p style={infotext1}>
                        Please enter your email address and we will send you a link to reset your password.
                    </p>
                    <p style={infotext2}> If you did not receive an email from us, resend the email.</p>
                    <br/>
                    <Formik
                            initialValues={{email:''}}
                            validationSchema={Yup.object().shape({
                                email: Yup.string()
                                    .email("Please enter a valid email address.")
                                    .required("Email is required."),
                            })}
                            onSubmit={ values => {
                                let cred = this.state.credentials;
                                cred["email"] = values.email;
                                this.setState({
                                    credentials: cred
                                });
                                fetch('http://127.0.0.1:8000/api/auth/forgotPassword', {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify(this.state.credentials)
                                }).then(data => data.json())
                                .then(
                                    data => {
                                        if(data.non_field_errors){
                                            alert(data.non_field_errors);
                                        }
                                        else if(data.email){
                                            alert(data.email);
                                        }
                                        else{
                                            this.props.history.push('/resetPassword');
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
                                <form onSubmit={handleSubmit} style={form}>                                
                                    <label for="email" className="sFieldLabel">Email *  </label> <br/>
                                    <Field type="text" name="email"
                                        className={(errors.email && touched.email)?"errorSField":"sField"}
                                        onChange={handleChange} onBlur={handleBlur} value={values.email}
                                        title="Please enter a valid email address."/><br/>
                                    <ErrorMessage name="email" className="errors" component="div" />

                                    <button type="submit" className="button" style={{paddingTop: '50px', paddingLeft: '32px', position: "absolute", top: '105%', left: '39%'}}> 
                                        Send

                                    </button>
                                </form>
                            )}
                        </Formik>
                </div>
                <div className="stylefooter" >Copyright © 2020 Pink Waves</div>

            </div>
        );

    }
}

export default withRouter(ForgotPassword);