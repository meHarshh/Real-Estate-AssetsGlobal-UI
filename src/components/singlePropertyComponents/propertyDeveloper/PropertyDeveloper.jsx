import { useState } from 'react';
import { HiMiniArrowLongRight } from "react-icons/hi2";
import emiCalculatorIcon from '../../../Images/math-calculator.png';
import homeLoanIcon from '../../../Images/real-estate.png';
import './PropertyDeveloper.scss';

// Import your images
import prestige from "../../../Images/clients/1.jpeg"
import provident from "../../../Images/clients/2.jpeg"
import brigade from "../../../Images/clients/3.jpeg"
import puravankara from "../../../Images/clients/4.jpeg"
import casaGrand from "../../../Images/clients/5.jpeg"
import godrej from "../../../Images/clients/6.jpeg"
import sobha from "../../../Images/clients/7.jpeg"
import abheeVentures from "../../../Images/clients/8.jpeg"
import lTRealty from "../../../Images/clients/9.jpeg"
import shriRam from "../../../Images/clients/10.jpeg"
import tvsEmerald from '../../../Images/clients/tvs-logo.jpeg'

import mantri from "../../../Images/clients/11.jpeg";
import sattva from "../../../Images/clients/12.jpeg";
import assetz from "../../../Images/clients/13.jpeg";
import dsMax from "../../../Images/clients/14.jpeg";
import lodha from "../../../Images/clients/15.jpeg";
import bharatiya from "../../../Images/clients/16.jpeg";

import { Link } from 'react-router-dom';


// Mapping of developer names to their logos
// const developerLogos = {
//     'Prestige': prestige,
//     'Provident': provident,
//     'Brigade': brigade,
//     'Puravankara': puravankara,
//     'Casa Grand': casaGrand,
//     'Godrej': godrej,
//     'Sobha': sobha,
//     'Abhee Ventures': abheeVentures,
//     'LT Realty': lTRealty,
//     'Shri Ram': shriRam,
//     'TVS Emerald': tvsEmerald,
//     'Mantri': mantri,
//     'Sattva': sattva,
//     'Assetz': assetz,
//     'DS Max': dsMax,
//     'Lodha': lodha,
//     'Bharatiya': bharatiya,
// };


// Default project statistics for developers
const defaultProjectStats = {
    'Prestige': { total: 50, ongoing: 18, upcoming: 5 },
    'Provident': { total: 34, ongoing: 14, upcoming: 4 },
    'Brigade': { total: 48, ongoing: 22, upcoming: 6 },
    'Puravankara': { total: 42, ongoing: 19, upcoming: 3 },
    'Casa Grand': { total: 36, ongoing: 16, upcoming: 7 },
    'Godrej': { total: 54, ongoing: 25, upcoming: 8 },
    'Sobha': { total: 58, ongoing: 27, upcoming: 10 },
    'Abhee Ventures': { total: 32, ongoing: 12, upcoming: 4 },
    'LT Realty': { total: 29, ongoing: 10, upcoming: 5 },
    'Shri Ram': { total: 40, ongoing: 18, upcoming: 3 },
    'TVS Emerald': { total: 37, ongoing: 15, upcoming: 4 },
    'Mantri': { total: 43, ongoing: 20, upcoming: 6 },
    'Sattva': { total: 41, ongoing: 17, upcoming: 5 },
    'Assetz': { total: 38, ongoing: 16, upcoming: 6 },
    'DS Max': { total: 31, ongoing: 12, upcoming: 5 },
    'Lodha': { total: 57, ongoing: 28, upcoming: 9 },
    'Bharatiya': { total: 35, ongoing: 13, upcoming: 7 }
};

const defaultStats = { total: 40, ongoing: 10, upcoming: 4 };


const PropertyDeveloper = ({ propItem }) => {
    const developerName = propItem.developerName;


    const [isExpanded, setIsExpanded] = useState(false)

    const initialDescription = propItem.description || ''; // Ensure a default value for description

    const truncateText = (initialDescription, maxLength) => {
        if (!initialDescription) return ''; // Handle case where text is undefined or null

        if (initialDescription.length <= maxLength) {
            return initialDescription;
        }
        return initialDescription.substr(0, maxLength) + '...';
    };


    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    // const projectStats = defaultProjectStats[developerName] || defaultStats;
    // const { total, ongoing, upcoming } = projectStats;
    const matchedStats = Object.keys(defaultProjectStats).find(devName =>
        developerName.toLowerCase().includes(devName.toLowerCase())
    );
    const projectStats = defaultProjectStats[matchedStats] || defaultStats;
    const { total, ongoing, upcoming } = projectStats;

    console.log("Developer Name:", developerName);
    console.log("Project Stats:", projectStats);

    return (
        <div className='s-property-developer-main-container'>
            <section className="s-property-bank-container" id='bank-offers'>
                <h3>Bank Offers</h3>
                <div>
                    <div className="s-property-home-loan">
                        <Link to='/loan'>Get a home loan</Link>
                        <img src={homeLoanIcon} alt=" home loan icon" className='s-prop-icons' />


                    </div>
                    <div className="s-property-emi-calc">
                        {/* <a href='/HomeLoan#emiCalci'>EMI Calculator</a> */}
                        <Link to="/loan#emiCalci" >EMI Calculator</Link>
                        <img src={emiCalculatorIcon} alt="calculator icon" className='s-prop-icons' />
                    </div>
                </div>
            </section>
            <hr />
            <section className="s-property-developer-container" id='developer'>

                <div className='s-property-developer-left'>
                    <h3> Developer </h3>
                    <section>
                        {propItem.developerLogo ? (<img src={propItem.developerLogo} alt='DEveloper Logo' className='d-logo-img' />) : (<p>{propItem.developerName}</p>)}
                        {/* <p className='devolper-name'>{propItem.name}</p> */}
                        <Link to={`/developer/${developerName}`} style={{ color: '#7ab945', textDecoration: 'none' }}>
                            <p>View all projects <HiMiniArrowLongRight className='devloper-arrow' /></p>
                        </Link>
                    </section>
                </div>
                <div className='s-property-developer-right'>
                    <section className='developer-right-1'>
                        <div>
                            <p>Total Projects</p>
                            <p>{total}</p>
                        </div>
                        <div>
                            <p>Ongoing Projects</p>
                            <p>{ongoing}</p>
                        </div>
                        <div>
                            <p>Upcoming Projects</p>
                            <p>{upcoming}</p>
                        </div>
                    </section>
                    <section className='s-property-developer-info'>
                        <p className={`description - text ${isExpanded ? 'expanded' : ''}`}>
                            {isExpanded ? initialDescription : truncateText(initialDescription, 200)}
                        </p>
                        {initialDescription.length > 200 && ( // Show "Read more" button only if text exceeds certain length
                            <button className="toggle-button" onClick={toggleExpanded}>
                                {isExpanded ? 'Read less' : 'Read more'}
                            </button>
                        )}
                    </section>
                </div>

            </section>
            <hr />
        </div>
    )
}

export default PropertyDeveloper