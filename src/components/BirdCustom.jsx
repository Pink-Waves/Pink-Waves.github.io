import React, {Component} from 'react';
import bluebird from '../image/bluebird.png';
import greenbird from '../image/greenbird.png';
import yellowbird from '../image/yellowbird.png';
import pinkbird from '../image/pinkbird.png';
import brownbird from '../image/brownbird.png';
import './BirdCustom.css';
import Address from "./Address";
import Oops from './Oops';

class BirdCustom extends Component{
    state = {
        color: 'yellow',
        token: localStorage.getItem('token')
    }
    confirm = () => {
        console.log(this.state);
        console.log(localStorage.getItem('token'));
        fetch('http://127.0.0.1:8000/api/auth/customizeBird', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(this.state)
        }).then(data => data.json())
        .then(
            data => {
                localStorage.setItem('bird_color', data.color);
                console.log(data);
            }
        ).catch(error => console.error(error))
        window.location.reload(false);
    }

    render() {
        if (localStorage.getItem('token') == null || localStorage.getItem('token') == 'undefined') {
            return (
                <Oops/>
            );
        }

        const titlestyle = {
            position: "absolute",
            top: "10%",
            width: "100%",
            fontSize: "55px",
            textAlign: "center",
            color: "#FFFFE0"
        };

        const textstyle = {
            position: "absolute",
            top: "85%",
            width: "100%",
            fontSize: "20px",
            textAlign: "center",
            color: "#000000"
        };

        const birdstyle = {
            position: "absolute",
            top: "40%",
            left: "45%",
            alignItems: 'center',
            width: "120px",
            height: "120px"
        };

        const bluebutton = {
            position: "absolute",
            width: "134px",
            height: "114px",
            left: "25%",
            top: "65%",
            borderRadius: "50%",
            border: "none",
            background: "#ADEEED"
        };

        const greenbutton = {
            position: "absolute",
            width: "134px",
            height: "114px",
            left: "35%",
            top: "65%",
            borderRadius: "50%",
            border: "none",
            background: "#B5DFC0"
        };

        const pinkbutton = {
            position: "absolute",
            width: "134px",
            height: "114px",
            left: "45%",
            top: "65%",
            borderRadius: "50%",
            border: "none",
            background: "#FF9F98"
        };

        const brownbutton = {
            position: "absolute",
            width: "134px",
            height: "114px",
            left: "55%",
            top: "65%",
            borderRadius: "50%",
            border: "none",
            background: "#D4B285"
        };

        const yellowbutton = {
            position: "absolute",
            width: "134px",
            height: "114px",
            left: "65%",
            top: "65%",
            borderRadius: "50%",
            border: "none",
            background: "#FFF3AA"
        };

        const blueclick = () => {
            console.log('Clicked blue');
            this.setState({
                color: 'blue'
            })
          }

        const greenclick = () => {
            console.log('Clicked green');
            this.setState({
                color: 'green'
            })
          } 

        const pinkclick = () => {
            console.log('Clicked pink');
            this.setState({
                color: 'pink'
            })
          } 

        const brownclick = () => {
            console.log('Clicked brown');
            this.setState({
                color: 'brown'
            })
          } 
        
        const yellowclick = () => {
            console.log('Clicked yellow');
            this.setState({
                color: 'yellow'
            })
          } 

        return (
            <div className="halfback">
                <h1 style={titlestyle}>Bird Customization </h1>
                <button style={bluebutton} onClick={blueclick}></button>
                {
                    this.state.color == 'blue' &&
                    <img src={bluebird} style={birdstyle} alt="Blue Birdie" />
                }
                <button style={greenbutton} onClick={greenclick}></button>
                {
                    this.state.color == 'green' &&
                    <img src={greenbird} style={birdstyle} alt="Green Birdie" />
                }
                <button style={pinkbutton} onClick={pinkclick}></button>
                {
                    this.state.color == 'pink' &&
                    <img src={pinkbird} style={birdstyle} alt="Pink Birdie" />
                }
                <button style={brownbutton} onClick={brownclick}></button>
                {
                    this.state.color == 'brown' &&
                    <img src={brownbird} style={birdstyle} alt="Brown Birdie" />
                }
                <button style={yellowbutton} onClick={yellowclick}></button>
                {
                    this.state.color == 'yellow' &&
                    <img src={yellowbird} style={birdstyle} alt="Yellow Birdie" />
                }
                <p style={textstyle}>Warning: Once the color of the bird has been chosen, it cannot be changed later on. </p>
                
                <button className="nextbutton" onClick={this.confirm} style={{paddingTop: '25px', paddingLeft: '13px'}}> 
                    Next
                </button>
            </div>
        );
    }
}


export default BirdCustom;
