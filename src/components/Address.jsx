import React, {Component} from 'react';
import './Address.css';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Redirect, Link } from 'react-router-dom';
import Oops from './Oops';

class Address extends Component{

    state = {
        streetname1: 'Sassy',
        streetname2: 'Shrimp',
        streetsuffix: 'Court',
        stateadd: 'AL',
        token: localStorage.getItem('token')
    }

    confirm = event => {
        console.log(this.state);
        console.log(localStorage.getItem('token'));
        fetch('http://127.0.0.1:8000/api/auth/address', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(this.state)
        }).then(data => data.json())
        .then(
            data => {
                localStorage.setItem('address', data.address);
                console.log(data);
            }
        ).catch(error => console.error(error))
        window.location.reload(false);
    }


    street1link = (event) => {
        console.log("Street1Success");
        this.setState({streetname1: event.target.value})
    }

    street2link = (event) => {
        console.log("Street2Success");
        this.setState({streetname2: event.target.value});
    }

    streetsuffixlink = (event) => {
        console.log("StreetSuffixSuccess");
        this.setState({streetsuffix: event.target.value})
    } 
    statelink = (event) => {
        console.log("StateSuccess");
        this.setState({stateadd: event.target.value})
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

        const infotext = {
            position: "absolute",
            top: "40%",
            left: "4%",
            width: "90%",
            fontSize: "18px",
            textAlign: "center",
            color: "#000000"
        };

        const statedropdown = {
            position: "absolute",
            top: "65%",
            left: "56%",
            fontSize: "14px",
            fontFamily: "Abel",
            textAlign: "center",
            color: "#000000"
        };

        const street1dropdown = {
            position: "absolute",
            top: "65%",
            left: "33%",
            fontSize: "14px",
            fontFamily: "Abel",
            textAlign: "center",
            color: "#000000"
        };

        const street2dropdown = {
            position: "absolute",
            top: "65%",
            left: "41%",
            fontSize: "14px",
            fontFamily: "Abel",
            textAlign: "center",
            color: "#000000"
        };

        const streetsuffix = {
            position: "absolute",
            top: "65%",
            left: "49%",
            fontSize: "14px",
            fontFamily: "Abel",
            textAlign: "center",
            color: "#000000"
        };

        return (
            <div className="halfback">
                <h1 style={titlestyle}>Address Setup </h1>
                <p style={infotext}> The timeframe for messages to transfer from sender to receiver 
                    relies largely on the user’s input for state, 
                    which is used to calculate the distance between the sender and receiver. 
                    To ensure everyone’s privacy (including yours), we will be using false street addresses,
                    which you can customize below.
                </p>
                <select id="streetname1" name="streetname1" style={street1dropdown} onChange = {this.street1link} value = {this.state.value}  >
                    <option value="Sassy">Sassy</option>
                    <option value="Charming">Charming</option>
                    <option value="Winter">Winter</option>
                    <option value="Fall">Fall</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                    <option value="Squeaky">Squeaky</option>
                    <option value="Colorful">Colorful</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Pink">Pink</option>
                    <option value="Brown">Brown</option>
                    <option value="Tweety">Tweety</option>
                    <option value="Chirpy">Chirpy</option>
                    <option value="Sweet">Sweet</option>
                    <option value="Kooky">Kooky</option>
                    <option value="Quirky">Quirky</option>
                    <option value="Super">Super</option>
                    <option value="Magical">Magical</option>
                    <option value="Eccentric">Eccentric</option>
                    <option value="Cheerful">Cheerful</option>
                    <option value="Fantastical">Fantastical</option>
                    <option value="Incredible">Incredible</option>
                    <option value="Wholesome">Wholesome</option>
                    <option value="Warm">Warm</option>
                    <option value="Cool">Cool</option>
                    <option value="Secret">Secret</option>
                    <option value="Zealous">Zealous</option>
                    <option value="Flappy">Flappy</option>
                    <option value="Glazed">Glazed</option>
                    <option value="Confused">Confused</option>
                    <option value="Chillin">Chillin'</option>
                    <option value="Innocent">Innocent</option>
                    <option value="Melodic">Melodic</option>
                    <option value="Fictional">Fictional</option>
                    <option value="Cute">Cute</option>
                    <option value="Chubby">Chubby</option>
                    <option value="One-and-Only">One-and-Only</option>
                    <option value="Screaming">Screaming</option>
                    <option value="Dazzling">Dazzling</option>
                    <option value="Calm">Calm</option>
                    <option value="Round">Round</option>
                    <option value="Circular">Circular</option>
                    <option value="Fabulous">Fabulous</option>
                    <option value="Wizarding">Wizarding</option>
                </select>
                <select id="streetname2" name="streetname2" style={street2dropdown} onChange = {this.street2link} value = {this.state.value} >
                    <option value="Shrimp">Shrimp</option>
                    <option value="Appa">Appa</option>
                    <option value="Momo">Momo</option>
                    <option value="Daisy">Daisy</option>
                    <option value="Cupid">Cupid</option>
                    <option value="Jay">Jay</option>
                    <option value="Macaw">Macaw</option>
                    <option value="Robin">Robin</option>
                    <option value="Hawk">Hawk</option>
                    <option value="Eagle">Eagle</option>
                    <option value="Starling">Starling</option>
                    <option value="Sparrow">Sparrow</option>
                    <option value="Woodpecker">Woodpecker</option>
                    <option value="Finch">Finch</option>
                    <option value="Raven">Raven</option>
                    <option value="Lark">Lark</option>
                    <option value="Bat">Bat</option>
                    <option value="Birdie">Birdie</option>
                    <option value="Chirp">Chirp</option>
                    <option value="Woodstock">Woodstock</option>
                    <option value="Duck">Duck</option>
                    <option value="Goose">Goose</option>
                    <option value="Stork">Stork</option>
                    <option value="Chickling">Chickling</option>
                    <option value="Penguin">Penguin</option>
                    <option value="Quack">Quack</option>
                    <option value="Kiwi">Kiwi</option>
                    <option value="Honey">Honey</option>
                    <option value="Parrot">Parrot</option>
                    <option value="Owl">Owl</option>
                    <option value="Bluejay">Bluejay</option>
                    <option value="Greg">Greg</option>
                    <option value="Hummingbird">Hummingbird</option>
                    <option value="Flamingo">Flamingo</option>
                    <option value="Ostrich">Ostrich</option>
                    <option value="Toucan">Toucan</option>
                    <option value="Peacock">Peacock</option>
                    <option value="">Swallow</option>
                    <option value="Fowl">Fowl</option>
                    <option value="Crow">Crow</option>
                    <option value="Crane">Crane</option>
                    <option value="Hatchling">Hatchling</option>
                    <option value="Phoenix">Phoenix</option>
                    <option value="Falcon">Falcon</option>
                    <option value="Dove">Dove</option>
                    <option value="Lark">Lark</option>
                    <option value="Sandpiper">Sandpiper</option>
                    <option value="Plover">Plover</option>
                    <option value="Birb">Birb</option>
                    <option value="Captain">Captain</option>
                    <option value="Baby">Baby</option>
                    <option value="Cactus">Cactus</option>
                    <option value="Jewel">Jewel</option>
                    <option value="Tweety">Tweety</option>
                </select>
                <select id="streetsuffix" name="streetsuffix" style={streetsuffix}  onChange = {this.streetsuffixlink} value = {this.state.value}>
                    <option value="Court">Court</option>
                    <option value="Boulevard">Boulevard</option>
                    <option value="Way">Way</option>
                    <option value="Street">Street</option>
                    <option value="Avenue">Avenue</option>
                    <option value="Road">Road</option>
                    <option value="Place">Place</option>
                    <option value="Way">Way</option>
                    <option value="Bend">Bend</option>
                    <option value="Drive">Drive</option>
                    <option value="Lane">Lane</option>
                    <option value="Alley">Alley</option>
                    <option value="Highway">Highway</option>
                    <option value="Meadows">Meadows</option>
                    <option value="Ridge">Ridge</option>
                    <option value="View">View</option>
                </select>
                <select id="stateadd" name="stateadd" style={statedropdown}  onChange = {this.statelink} value = {this.state.value}>
                    <option value="AL">Alabama (AL)</option>
                    <option value="AK">Alaska (AK)</option>
                    <option value="AZ">Arizona (AZ)</option>
                    <option value="AR">Arkansas (AR)</option>
                    <option value="CA">California (CA)</option>
                    <option value="CO">Colorado (CO)</option>
                    <option value="CT">Connecticut (CT)</option>
                    <option value="DE">Delaware (DE)</option>
                    <option value="DC">District Of Columbia (DC)</option>
                    <option value="FL">Florida (FL)</option>
                    <option value="GA">Georgia (GA)</option>
                    <option value="HI">Hawaii (HI)</option>
                    <option value="ID">Idaho (ID)</option>
                    <option value="IL">Illinois (IL)</option>
                    <option value="IN">Indiana (IN)</option>
                    <option value="IA">Iowa (IA)</option>
                    <option value="KS">Kansas (KS)</option>
                    <option value="KY">Kentucky (KY)</option>
                    <option value="LA">Louisiana (LA)</option>
                    <option value="ME">Maine (ME)</option>
                    <option value="MD">Maryland (MD)</option>
                    <option value="MA">Massachusetts (MA)</option>
                    <option value="MI">Michigan (MI)</option>
                    <option value="MN">Minnesota (MN)</option>
                    <option value="MS">Mississippi (MS)</option>
                    <option value="MO">Missouri (MO)</option>
                    <option value="MT">Montana (MT)</option>
                    <option value="NE">Nebraska (NE)</option>
                    <option value="NV">Nevada (NV)</option>
                    <option value="NH">New Hampshire (NH)</option>
                    <option value="NJ">New Jersey (NJ)</option>
                    <option value="NM">New Mexico (NM)</option>
                    <option value="NY">New York (NY)</option>
                    <option value="NC">North Carolina (NC)</option>
                    <option value="ND">North Dakota (ND)</option>
                    <option value="OH">Ohio (OH)</option>
                    <option value="OK">Oklahoma (OK)</option>
                    <option value="OR">Oregon (OR)</option>
                    <option value="PA">Pennsylvania (PA)</option>
                    <option value="RI">Rhode Island (RI)</option>
                    <option value="SC">South Carolina (SC)</option>
                    <option value="SD">South Dakota (SD)</option>
                    <option value="TN">Tennessee (TN)</option>
                    <option value="TX">Texas (TX)</option>
                    <option value="UT">Utah (UT)</option>
                    <option value="VT">Vermont (VT)</option>
                    <option value="VA">Virginia (VA)</option>
                    <option value="WA">Washington (WA)</option>
                    <option value="WV">West Virginia (WV)</option>
                    <option value="WI">Wisconsin (WI)</option>
                    <option value="WY">Wyoming (WY)</option>
                </select>

                <button className="nextbutton" onClick={this.confirm} style={{paddingTop: '25px', paddingLeft: '13px'}}> Next</button>
                         
            </div>
        );
    }
}


export default Address;
