import React from 'react';

import logo from '../image/Logo.png';
import './loading.css';

class Loading extends React.Component{
    render() {
        return(
            <div className="body">
                <img src={logo} className="loadingLogo" alt="Fletter" />
                <div className="loading"></div>
                <div className="text">Loading......</div>
                <div className="stylefooter" >Copyright © 2020 Pink Waves</div>
            </div>
        )
    }
}

export default Loading;
