import React from 'react';
import './style.css'

class TermsAndConditions extends React.Component {
    handleClick = () => {
        this.props.toggle();
    }

    render() {
        return(
            <div className="modal">
                <div className="modalContent">
                    <span className="close" onClick={this.handleClick}>
                        &times;
                    </span>
                    <div className="title"> Terms and Conditions </div>
                    Last Updated: July 2020
                    <p>
                        Please read these Terms and Conditions carefully before using the fletter.com website operated by Pink Waves. Your ability to access and use our service is conditioned upon your acceptance of these terms and conditions. These terms and conditions apply to all visitors, users, and others who have access to our service.
                    </p>
                    <p className="bold">
                        By accessing or using our service, you agree to follow these terms and conditions. If you disagree with any terms or conditions, you may not have access to our service.
                    </p>
                    <p>
                        <div className="bold">Our Mission and Statement</div>
                        Our mission for Fletter is to foster old-school communications while having fun raising your pet Fletter bird. We do not tolerate any attack or bullying based on religion, sexual orientation, or race. Any incidents of these should be reported to us and we will take the necessary actions. Any bots abusing our product will be terminated. We are a student-run project, therefore our service is free of charge and we do not sell your personal data.
                    </p>
                    <p>
                        <div className="bold">Contact Us</div>
                        If you have any questions about these terms and conditions or would like to report bullying, user abuse, or site errors, please contact us at fletter.pw@gmail.com.
                    </p>
                    <div className="footer">Copyright © 2020 Pink Waves® </div>
                </div>
            </div>
        );
    }
}

export default TermsAndConditions
