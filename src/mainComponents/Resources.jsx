import React, {Component} from 'react';
import '../components/style.css';
import logo from '../image/Logo.png';
import { BrowserRouter as Redirect, Link } from 'react-router-dom';

class Resources extends Component{
    
    render() {
        const logoClassName = `logo`;
        const titleClassName = `title`;
        const footerClassName = `footer`;

        return (
            <div className="resourcesbody">
                <img src={logo} className={logoClassName} alt="Fletter" />
                <h1 className={titleClassName} >Mental Health Resources</h1>
                <br></br> 
                <div className="centerpadding">
                    <h2>
                    National Suicide Prevention Lifeline: Call 1-800-273-TALK (8255)
                    </h2>
                    <p>	This hotline runs 24/7 and offers free and confidential support for those residing in the United States. Starting on July 16, 2022, you may dial 988 instead to reach the hotline. For assistance in Spanish: 1-888-628-9454. Assistance for those who are hard of hearing or have hearing loss via TTY: 1-800-799-4889. 
                        For more information, visit <a target="_blank" href="https://suicidepreventionlifeline.org" style={{ textDecoration: 'underline', color: 'blue'}}>here</a>.</p>
                        

                    <br></br> 
                    <h2>
                    Crisis Text Line: Text “HELLO” to 741741
                    </h2>
                    <p>This text line offers 24/7 free text support with crisis counselors to those residing in the United States. 
                        For more information, visit <a target="_blank" href="https://www.crisistextline.org/" style={{ textDecoration: 'underline', color: 'blue'}}>here</a>.</p>
                    <br></br> 
                    <h2>
                    Veterans Crisis Line: Call 1-800-273-TALK (8255) and press 1 or Text to 838255
                    </h2>
                    <p>This hotline runs 24/7 and offers free and confidential support with trained responders for all veterans, regardless if they are registered with the VA or enrolled in VA healthcare. Assistance for those who are hard of hearing or have hearing loss: 1-800-799-4889. 
                        For more information, visit <a target="_blank" href="https://www.veteranscrisisline.net/" style={{ textDecoration: 'underline', color: 'blue'}}>here</a>.</p>
                    <br></br> 
                    <h2>
                    SAMHSA National Helpline: Call 1-800-662-HELP (4357)
                    </h2>
                    <p>SAMHSA stands for Substance Abuse and Mental Health Services Administration. Their helpline runs for 24/7 and is free and confidential. This service is available in English and Spanish and is for individuals and families that are facing mental and/or substance use disorders. 
                        For more information, visit <a target="_blank" href="https://www.samhsa.gov/find-help/national-helpline" style={{ textDecoration: 'underline', color: 'blue'}}>here</a>.</p>
                    <br></br> 
                    <h2>
                    Disaster Distress Helpline: Call 1-800-985-5990 or Text “TalkWithUs” to 66746
                    </h2>
                    <p>This helpline is open 24/7 to aid those undergoing emotional distress due to natural or human-caused disasters. It iis free, confidential, and available in many different languages. 
                        For more information, visit <a target="_blank" href="https://www.samhsa.gov/find-help/disaster-distress-helpline" style={{ textDecoration: 'underline', color: 'blue'}}>here</a>.</p>
                    <br></br> 
                    <h2>
                    2.1.1: Call 211                     
                    </h2>
                    <p>	211 is a referral service to community and social services from healthcare, counseling, financial assistance, and more. They provide expert, confidential, free, multilingual and caring help 24/7. You do not have to give your name or personal details to get their help. 
                        For more information, visit <a target="_blank" href="https://www.211.org/" style={{ textDecoration: 'underline', color: 'blue'}}>here</a>.</p>
                    <br></br> 
                    <h2>
                    Mental Health Resources                  
                    </h2>
                    <p>	Mental Health Resources is a non-profit that provides community-based mental health services for adults who are suffering from serious medical, social,mental, or substance-related conditions. 
                        For more information, visit <a target="_blank" href="http://www.mhresources.org/" style={{ textDecoration: 'underline', color: 'blue'}}>here</a>.</p>
                    <br></br> 
                    <h2>
                    National Alliance on Mental Illness (NAMI)
                    </h2>
                    <p>	The National Alliance on Mental Illness is an organization that advocates for mental health and serves those residing in the United States. NAMI offers support groups, free education, and community advocacy. 
                        For more information, visit <a target="_blank" href="https://www.nami.org/Home" style={{ textDecoration: 'underline', color: 'blue'}}>here</a>.</p>
                    <br></br> 
                    <h2>
                    60 Digital Mental Resources                   
                    </h2>
                    <p className="breaker">For an extensive list of digital mental health resources, visit <a target="_blank" href="https://socialworklicensemap.com/social-work-resources/mental-health-resources-list/" style={{ textDecoration: 'underline', color: 'blue'}}>here</a>.
                        This was put together by the Social Work License Map and contains resources across the board, ranging from depression and anxiety, to eating disorders and substance abuse.</p>
                    <br className="breaker"></br> 
                </div>
                    <br className="breaker"></br> 
                <div className={footerClassName} className="stylefooter" >Copyright © 2020 Pink Waves</div>
            </div>
        );
    }
}


export default Resources;