import React, {Component} from 'react';
import logo from '../image/Logo.png';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../components/style.css';
import { BrowserRouter as Redirect, Link } from 'react-router-dom';

class ChangePassword extends Component{

    state = {
        credentials: {email:'',username:'', currentPassword: '', newPassword:''},
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
                <h1 className={titleClassName} >Change Password</h1>
                <Formik
                        initialValues={{currentPassword:'', newPassword:'', confirmPassword:''}}
                        validationSchema={Yup.object().shape({
                            currentPassword: Yup.string()
                                .required("Please enter your old password for verification."),
                            newPassword: Yup.string()
                                .required("New password is required.")
                                .min(8, "Password should be at least 8 characters.")
                                .matches(/(?=.*[0-9])(?=.*[a-zA-Z])/, "Password should include both letters and digits."),
                            confirmPassword: Yup.string()
                                .required("Please enter the new password again for verification.")
                                .oneOf([Yup.ref('newPassword'), null], "Passwords don't match."),
                        })}
                        onSubmit={ values => {
                            let cred = this.state.credentials;
                            cred["email"] = localStorage.getItem('email');
                            cred["username"] = localStorage.getItem('username');
                            cred["currentPassword"] = values.currentPassword;
                            cred["newPassword"] = values.newPassword;
                            this.setState({
                                credentials: cred
                            });
                            const token = localStorage.getItem('token');
                            fetch('http://127.0.0.1:8000/api/auth/changePassword', {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'},
                                Authorization: `Token ${localStorage.getItem('token')}`,
                                body: JSON.stringify(this.state.credentials)
                                
                            }).then(data => data.json())
                            .then(
                                data => {
                                    console.log(data);
                                }
                            ).catch(error => {
                                console.error(error);
                                return(
                                    alert("Something went wrong. Please retry.")
                                )
                            })
                            alert("Password successfully changed")
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
                                <label for="currentPassword" className="sFieldLabel">Old Password *  </label> <br/>
                                <Field type="password" name="currentPassword"
                                    className={(errors.currentPassword && touched.currentPassword)?"errorSField":"sField"}
                                    onChange={handleChange} onBlur={handleBlur} value={values.currentPassword}
                                    title="Please enter your old password for verification." 
                                    placeholder="Please enter your old password for verification."  
                                    maxLength="16"/><br/>
                                <ErrorMessage name="currentPassword" className="errors" component="div" />

                                <label for="newPassword" className="sFieldLabel">New Password *  </label> <br/>
                                <Field type="password" name="newPassword"
                                    className={(errors.newPassword && touched.newPassword)?"errorSField":"sField"}
                                    onChange={handleChange} onBlur={handleBlur} value={values.newPassword}
                                    title="8-16 characters. Must include both letters and digits. " 
                                    placeholder="8-16 characters. Must include both letters and digits. "  
                                    maxLength="16"/><br/>
                                <ErrorMessage name="newPassword" className="errors" component="div" />
        
                                <label for="confirmPassword" className="sFieldLabel">Confirm New Password *  </label> <br/>
                                <Field type="password" name="confirmPassword"
                                    className={(errors.confirmPassword && touched.confirmPassword)?"errorSField":"sField"}
                                    onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword}
                                    title="Please enter the new password again for verification."
                                     maxLength="16"/><br/>
                                <ErrorMessage name="confirmPassword" className="errors" component="div" />

                                <button type="submit" className="button" style={{paddingTop: '50px', paddingLeft: '25px',position: 'absolute', top: '105%', left: '39%'}}> 
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

export default ChangePassword;