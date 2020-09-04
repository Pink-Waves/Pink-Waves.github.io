import React, {Component} from 'react';
import logo from '../image/Logo.png';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './style.css';
import { withRouter } from "react-router";


class ResetPassword extends Component{

    state = {
        credentials: {email: '', key: '', password: ''},
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

        const logoClassName = `logo`;
        const titleClassName = `title`;
        const footerClassName = `footer`;

        return (
            <div className="introbody">
                <img src={logo} className={logoClassName} alt="Fletter" />
                <h1 className={titleClassName} >Reset Password</h1>
                <Formik
                        initialValues={{email:'', key: '',password:'', confirmPassword:''}}
                        validationSchema={Yup.object().shape({
                            email: Yup.string()
                                .email("Please enter a valid email address.")
                                .required("Email is required."),
                            key: Yup.string()
                                .required("Code is required."),
                            password: Yup.string()
                                .required("Password is required.")
                                .min(8, "Password should be at least 8 characters.")
                                .matches(/(?=.*[0-9])(?=.*[a-zA-Z])/, "Password should include both letters and digits."),
                            confirmPassword: Yup.string()
                                .required("Please enter your password again for verification.")
                                .oneOf([Yup.ref('password'), null], "Passwords don't match."),
                        })}
                        onSubmit={ values => {
                            let cred = this.state.credentials;
                            cred["email"] = values.email;
                            cred["key"] = values.key;
                            cred["password"] = values.password;
                            this.setState({
                                credentials: cred
                            });
                            fetch('http://127.0.0.1:8000/api/auth/resetPassword', {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify(this.state.credentials)
                            }).then(data => data.json())
                            .then(
                                data => {
                                    if(data.non_field_errors){
                                        alert(data.non_field_errors);
                                    }
                                    else if(data.key){
                                        alert(data.key);
                                    }
                                    else{
                                        this.props.history.push('/passwordConfirmed');
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

                                <label for="key" className="sFieldLabel">Code *  </label> <br/>
                                <Field type="text" name="key"
                                    className={(errors.key && touched.key)?"errorSField":"sField"}
                                    onChange={handleChange} onBlur={handleBlur} value={values.key}
                                    placeholder="Please enter the verification code that has been sent to your email."
                                    title="Please enter the verification code that has been sent to your email."/><br/>
                                <ErrorMessage name="key" className="errors" component="div" />

                                <label for="password" className="sFieldLabel">New Password *  </label> <br/>
                                <Field type="password" name="password"
                                    className={(errors.password && touched.password)?"errorSField":"sField"}
                                    onChange={handleChange} onBlur={handleBlur} value={values.password}
                                    title="8-16 characters. Must include both letters and digits. " 
                                    placeholder="8-16 characters. Must include both letters and digits. "  
                                    maxLength="16"/><br/>
                                <ErrorMessage name="password" className="errors" component="div" />
        
                                <label for="confirmPassword" className="sFieldLabel">Confirm New Password *  </label> <br/>
                                <Field type="password" name="confirmPassword"
                                    className={(errors.confirmPassword && touched.confirmPassword)?"errorSField":"sField"}
                                    onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword}
                                    title="Please enter the same password for verification."
                                    maxLength="16"/><br/>
                                <ErrorMessage name="confirmPassword" className="errors" component="div" />

                                <button type="submit" className="button" style={{paddingTop: '50px', paddingLeft: '25px', position: "absolute", top: '105%', left: '39%'}}> 
                                    Submit
                                </button>
                            </form>
                        )}
                    </Formik>
                <div className={footerClassName} className="stylefooter" >Copyright © 2020 Pink Waves</div>

            </div>
        );

    }
}

export default withRouter(ResetPassword);
