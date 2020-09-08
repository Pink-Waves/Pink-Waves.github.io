import React, {Component} from 'react';
import { useEffect, useState } from "react";
import './Welcome.css';
import logo from '../image/Logo.png';
import downarrow from '../image/downarrow.png';
import uparrow from '../image/uparrow.png';
import earth from '../image/earth.png';
import birdiegif from '../image/welcomegif.gif';
import computerscreen from '../image/computerscreen.png';
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
            width: "350px"
        }

        const computerscreenspecs = {
            width: "500px"
        }

        const birdiegifspecs = {
            width: "300px"
        }

        const postbirdiespecs = {
            width: "500px"
        }

        const downarrowstyle = {
            width: "80px"
        }

        const uparrowstyle = {
            width: "80px"
        }

        const block1 = {
            top: "75px"
        }

        const arrow1 = {
            top: "625px",
            zIndex: '10000',
            cursor: 'pointer'
        }

        const block2 = {
            top: "800px"
        }

        const arrow2 = {
            top: "1345px",
            zIndex: '10000',
            cursor: 'pointer'
        }

        const block3 = {
            top: "1510px"
        }

        const arrow3 = {
            top: "2067px",
            zIndex: '10000',
            cursor: 'pointer'
        }

        const block4 = {
            top: "2225px"
        }

        const arrow4 = {
            top: "2790px",
            zIndex: '10000',
            cursor: 'pointer'
        }

        const goResources = () => {
            window.open("/resources", "_blank");
        }

            return (
                <div className="welcomebody">
                    <header className="header" id="myHeader">
                        <img src={logo}  alt="Fletter" style={logospecs}/>
                        <button class="boxbutton button3" onClick={goResources}> Resources</button>
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
                            <h1>WHO WE ARE</h1>
                            <p style={{fontSize:"20px"}}> <i>Fletter</i> is a messaging web application developed by <i>Pink Waves</i>, in which bridges the gap between communication of the past and the present. By bringing together exceptional qualities such as the <b>convenience</b> of digital communication and the <b>personalization</b> of traditional snail-mail, <i>Fletter</i> provides its users with the best of both worlds and an unforgettable experience.</p>
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
                            <img src={computerscreen}  alt="computerscreen" style={computerscreenspecs}/>
                        </div>
                    </div>
                    <div className="split right" style={block2}>
                        <div className="centered">
                            <h1>WHAT WE OFFER</h1>
                            <p style={{fontSize:"20px"}}>In addition to instant and scheduled send, which can be found in most messaging apps, users of <i>Fletter</i> enjoy a unique feature that reminisce of the past, known as “delayed send.” “Delayed send” replicates the process and timeframe of sending letters by the postal service -- the difference with us is that we are digital, so you are able to experience that without having to leave the comfort of your home.</p>
                        
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
                            <h1>WHY US</h1>
                            <p style={{fontSize:"20px"}}> <b>We value our users, their experiences, their happiness, and their mental health.</b> Each user has their own pet bird, which can keep them company and interact with on a daily basis. In addition, each user has access to an abundance of mental health resources. Whether you are looking to stay connected with your loved ones, reach out to a new virtual pen pal, or seek a place of comfort and tranquility, <b><i>Fletter</i> is here for you.</b></p>
                        </div>
                    </div>
                    <div className="split right" style={block3}>
                        <div className="centered">
                            <img src={birdiegif}  alt="birdie gif" style={birdiegifspecs}/>
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
                            <img src={earth}  alt="eart" style={earthspecs}/>
                            
                        </div>
                    </div>
                    <div className="split right" style={block4}>
                        <div className="centered">
                            <h1>GET STARTED</h1>
                            <p style={{fontSize:"20px"}}>Click on the “Sign Up” button  to get started with your free <i>Fletter</i> account today!</p>
                            <br></br>
                            <a href = "/register" className="hyperlink">
                                <button class="boxbutton bigbutton"> Sign Up</button>
                            </a>
                        </div>
                    </div> 
                    <div className="centered" style={arrow4}>
                        <Link to="block1" smooth={true}>
                            <img src={uparrow}  alt="uparrow" style={uparrowstyle}/>
                        </Link>
                    </div>  
                    </div>
                    <div className="footer">
                        <p>Copyright © 2020 Pink Waves</p>
                    </div> 
                </div>
                    
            );
        }

export default Welcome;
