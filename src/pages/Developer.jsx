import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropertyCard from '../components/propertyGridComponent/PropertyCard';
import Pagination from '../components/pagination/Pagination';
import '../components/loading.scss';
import './Developer.scss';
import DeveloperDetails from '../services/propertyDetailsJson/DeveloperDetails.json'
import PropertDetailsJson from '../services/propertyDetailsJson/PropertDetailsJson.json'

// Import images
import prestige from "../Images/clients/1.jpeg";
import provident from "../Images/clients/2.jpeg";
import brigade from "../Images/clients/3.jpeg";
import puravankara from "../Images/clients/4.jpeg";
import casagrand from "../Images/clients/5.jpeg";
import godrej from "../Images/clients/6.jpeg";
import sobha from "../Images/clients/7.jpeg";
import abheeVentures from "../Images/clients/8.jpeg";
import LTRealty from "../Images/clients/9.jpeg";
import shriramProperties from "../Images/clients/10.jpeg";
import mantri from "../Images/clients/11.jpeg";
import sattva from "../Images/clients/12.jpeg";
import assets from "../Images/clients/13.jpeg";
import tvsEmerald from '../Images/clients/tvs-logo.jpeg';
import DSMax from "../Images/clients/14.jpeg";
import lodha from "../Images/clients/15.jpeg";
import bharatiya from "../Images/clients/16.jpeg";

// Developer Icons
const developerIcons = {
    'prestige': prestige,
    'provident': provident,
    'brigade': brigade,
    'godrej': godrej,
    'sobha': sobha,
    'abhee ventures': abheeVentures,
    'casagrand': casagrand,
    'shriram properties': shriramProperties,
    'sattva': sattva,
    'mantri': mantri,
    'assets': assets,
    'tvs emerald': tvsEmerald,
    'bharatiya': bharatiya,
    'puravankara': puravankara,
    'd s max': DSMax,
    'l t realty': LTRealty,
    'lodha': lodha
};

const Developer = () => {
    const [loading, setLoading] = useState(true);
    const [properties, setProperties] = useState([]);
    const [developerInfo, setDeveloperInfo] = useState({ about: '', description: '' });
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const propertiesPerPage = 10;

    const { developerName } = useParams();

    const normalizeString = (str) => str.trim().toLowerCase();

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);
    const totalPages = Math.ceil(properties.length / propertiesPerPage);

    useEffect(() => {
        console.log('Is it running', process.env.PUBLIC_URL)
        const fetchData = async () => {
            setLoading(true);
            try {
                // const response = await fetch(`${process.env.PUBLIC_URL}/propertyDetailsJson/propertDetailsJson.json`);
                // if (!response.ok) {
                //     throw new Error('Network response was not ok');
                // }
                // const data = await response.json();
                const data = PropertDetailsJson
                const normalizedDeveloperName = normalizeString(developerName);
                const developerProperties = data.filter(property =>
                    property.developerName &&
                    normalizeString(property.developerName).includes(normalizedDeveloperName)
                );

                console.log(developerProperties)
                setProperties(developerProperties);
            } catch (error) {
                console.error('Error fetching properties data:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchDeveloperData = async () => {
            setLoading(true);
            try {
                // const developerResponse = await fetch('/propertyDetailsJson/DeveloperDetails.json');
                // if (!developerResponse.ok) {
                //     throw new Error('Network response was not ok');
                // }
                // const developerData = await developerResponse.json();
                const developerData = DeveloperDetails
                const developerDetails = developerData.find(dev =>
                    normalizeString(dev.developerName).includes(normalizeString(developerName))
                );
                if (developerDetails) {
                    setDeveloperInfo({
                        about: developerDetails.about || '',
                        description: developerDetails.description || ''
                    });
                }
            } catch (error) {
                console.error("Error fetching developer data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        fetchDeveloperData();
    }, [developerName]);

    const developerLogo = developerIcons[normalizeString(developerName)];

    const toggleTextDisplay = () => {
        setIsExpanded(!isExpanded);
    };

    if (loading) {
        return (
            <div className="loader-container">
                <div className="progress-bar">
                    <div className="progress"></div>
                </div>
            </div>
        );
    }
    if (properties.length === 0) {
        return <div>No properties found for developer: {developerName}</div>;
    }

    return (
        <div className='developer-main-container'>
            <div className='developer-home-link'>
                <p><a href="/" style={{ color: "black", textDecoration: 'none', opacity: '0.8' }}>Home</a> &gt; {developerName} properties</p>
            </div>
            <div className='developer-logo-container'>
                <section className='developer-logo-name'>
                    {developerLogo && <img src={developerLogo} alt={`${developerName} logo`} />}
                </section>
                <section className='developer-logo-details'>
                    <div><h2>{developerName} Group</h2></div>
                    <div className='developer-logo-projects'>
                        <div>Total Projects : <span>{properties.length}</span></div>
                        <div>Ongoing Projects :  </div>
                    </div>
                </section>
            </div>
            <div className='developer-details-div'>
                <div>
                    <h3>About {developerName} </h3>
                    <p>{developerInfo.about}</p>
                </div>
                <div>
                    <h3>Description</h3>
                    <p className={isExpanded ? 'expanded' : 'collapsed'}>{developerInfo.description}</p>
                    <button onClick={toggleTextDisplay} className='developer-desc-btn'>
                        {isExpanded ? 'Read Less' : 'Read more'}
                    </button>
                </div>
            </div>
            <div className='developer-property-div'>
                <section className='developer-property'>
                    {properties.map(property => <PropertyCard key={property.id} property={property} />)}
                </section>
            </div>
            <div className='propertygrid-pagination-content'>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
                <p>Total {properties.length} properties in {developerName}</p>
            </div>
        </div>
    );
};

export default Developer;
