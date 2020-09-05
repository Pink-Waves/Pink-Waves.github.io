import React, {Component} from 'react';
import { useEffect, useState } from "react";
import './Welcome.css';
import logo from '../image/Logo.png';
import downarrow from '../image/downarrow.png';
import earth from '../image/earth.png';
import message from '../image/message.png';
import mailbox from '../image/mailbox.png';
import postbirdie from '../image/postbirdie.png';
import { Link, animateScroll } from "react-scroll";

function Welcome(props){
        useEffect(() => {
            const header = document.getElementById("myHeader");
            const sticky = header.offsetTop;
            const scrollCallBack = window.addEventListener("scroll", () => {
                if (window.pageYOffset > sticky) {
                    header.classList.add("sticky");
                }
            });

        return () => {
            window.removeEventListener("scroll", scrollCallBack);
        };
    }, []);

        const logospecs = {
            width: "100px",
            top: "24px",
            left: "20px",
            position: "fixed"
        }

        const earthspecs = {
            width: "400px"
        }

        const messagespecs = {
            width: "400px"
        }

        const mailboxspecs = {
            width: "300px"
        }

        const postbirdiespecs = {
            width: "500px"
        }

        const downarrowstyle = {
            width: "100px"
        }

        const block1 = {
            top: "75px"
        }

        const arrow1 = {
            top: "625px",
            zIndex: '10000'
        }

        const block2 = {
            top: "820px"
        }

        const arrow2 = {
            top: "1350px",
            zIndex: '10000'
        }

        const block3 = {
            top: "1550px"
        }

        const arrow3 = {
            top: "2070px",
            zIndex: '10000'
        }

        const block4 = {
            top: "2250px"
        }

        return (
            <div className="welcomebody">
                <header className="header" id="myHeader">
                    <img src={logo}  alt="Fletter" style={logospecs}/>
                    <a href = "/register" className="hyperlink">
                        <button class="boxbutton button1"> Sign Up</button>
                    </a>
                    <a href = "/login" className="hyperlink">
                        <button class="boxbutton button2"> Log In</button>
                    </a>
                </header>

                <div id="block1">
                <div className="split left" style={block1}>
                    <div className="centered">
                        <h1>Stay connected to those closest to you — old-school style.</h1>
                        <p>this is test 9</p>
                    </div>
                </div>
                <div className="split right" style={block1}>
                    <div className="centered">
                        <img src={postbirdie}  alt="post office birdie" style={postbirdiespecs}/>
                    </div>
                </div>
                <div className="centered" style={arrow1}>
                    <Link to="block2" smooth={true}>
                        <img src={downarrow}  alt="downarrow" style={downarrowstyle}/>
                    </Link>
                </div>  
                </div>


                <div id="block2">
                <div className="split left" style={block2}>
                    <div className="centered">
                        <img src={mailbox}  alt="mailbox" style={mailboxspecs}/>
                    </div>
                </div>
                <div className="split right" style={block2}>
                    <div className="centered">
                        <h1>Fletter isn’t just your everyday messaging platform.</h1>
                        <h2>Fletter combines modern electronic communication with traditional written communication.</h2>
                    </div>
                </div>
                <div className="centered" style={arrow2}>
                    <Link to="block3" smooth={true}>
                            <img src={downarrow}  alt="downarrow" style={downarrowstyle}/>
                    </Link>
                </div>
                </div>


                <div id="block3">
                <div className="split left" style={block3}>
                    <div className="centered">
                        <h1>Our fletter birds send your “fletters” or messages instantaneously, at scheduled times, or in a delayed manner.</h1>
                        <h2>Our unique feature, “delayed send,” replicates the process and timeframe of letters sent by mail.</h2>
                    </div>
                </div>
                <div className="split right" style={block3}>
                    <div className="centered">
                        <img src={message}  alt="message" style={messagespecs}/>
                    </div>
                </div>
                <div className="centered" style={arrow3}>
                    <Link to="block4" smooth={true}>
                        <img src={downarrow}  alt="downarrow" style={downarrowstyle}/>
                    </Link>
                </div>  
                </div>


                <div id="block4">
                <div className="split left" style={block4}>
                    <div className="centered">
                        <img src={earth}  alt="earth" style={earthspecs}/>
                    </div>
                </div>
                <div className="split right" style={block4}>
                    <div className="centered">
                        <h1>Send fletters across the globe.</h1>
                        <h1>Get started for free today.</h1>
                    </div>
                </div> 
                </div>
                <div className="footer">
                    <p>Copyright © 2020 Pink Waves</p>
                </div> 
            </div>
                
        );
    }

export default Welcome;
