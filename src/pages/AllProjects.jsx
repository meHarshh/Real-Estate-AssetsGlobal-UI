
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCity } from '../components/context/CityContext';

import Pagination from '../components/pagination/Pagination';
import PropertyCard from '../components/propertyGridComponent/PropertyCard';
import PropertDetailsJson from '../services/propertyDetailsJson/PropertDetailsJson.json';

import './AllProjects.scss';

const AllProjects = () => {
    // Use city from URL path or context
    const { city: contextCity, setCity: setContextCity } = useCity(); // Get city from context
    const { city: urlCity, status: urlStatus, bhk: urlBhk } = useParams(); // Get city and status from URL path

    const [bhk, setBhk] = useState(urlBhk || ''); // New state for BHK filtering

    const defaultCity = urlCity || contextCity || 'Bengaluru';
    const [city, setCity] = useState(defaultCity);

    const [currentPage, setCurrentPage] = useState(1);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [status, setStatus] = useState(urlStatus || '');

    const navigate = useNavigate();

    const propertiesPerPage = 10;

    useEffect(() => {
        // Sync city state with context
        if (contextCity && contextCity !== city) {
            setCity(contextCity);
        }
    }, [contextCity, city]);

    useEffect(() => {
        let filtered = PropertDetailsJson;

        // Filter by city if one is selected
        if (city && city !== 'ALL') {
            filtered = filtered.filter(
                (item) =>
                    item.city.toLowerCase() === city.toLowerCase()

            );
        }
        // Filter by construction status if selected
        if (status && status !== '') {
            filtered = filtered.filter(
                (item) =>
                    item.constructionStatus.toLowerCase() === status.toLowerCase().split('-').join(' ')
            );
        }

        // Filter by BHK
        if (bhk) {
            filtered = filtered.filter(
                (item) => item.bhk.split('/').includes(bhk)  // Check if the BHK value matches any value in the "bhk" field
            );
        }

        setFilteredProperties(filtered);
    }, [city, status, bhk]);

    useEffect(() => {
        const bhkPath = bhk ? bhk : ''; // Only include bhk if it's not empty
        const statusPath = status ? status.replace(/\s+/g, '-') : ''; // Only include status if it's not empty

        const newPath = `/projects/${city}${statusPath ? `/${statusPath}` : ''}${bhkPath ? `/${bhkPath}` : ''}`;

        navigate(newPath);
    }, [city, status, bhk, navigate]);

    const handleCityChange = (event) => {
        const newCity = event.target.value;
        setCity(newCity);
        setContextCity(newCity); // Update context value
    };

    const handleConstructionStatusChange = (event) => {
        const newStatus = event.target.value;
        setStatus(newStatus);
    };

    const handleBhkChange = (event) => {
        const newBhk = event.target.value;
        setBhk(newBhk); // Update BHK state
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;

    const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
    const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

    return (
        <div className='all-projects-main-container'>
            <div className='all-projects-filter-div'>
                <div>
                    <select name="city" className='city-all-projects' onChange={handleCityChange} value={city}>
                        <option value="ALL">ALL</option>
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="Chennai">Chennai</option>
                        <option value="New Delhi">New Delhi</option>
                        <option value="Pune">Pune</option>
                        <option value="Gurugram">Gurugram</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Kochi">Kochi</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Lucknow">Lucknow</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Noida">Noida</option>
                        <option value="Dubai">Dubai</option>
                    </select>
                </div>
                <div>
                    <select name="constructionStatus" className='construction-status-all-projects' onChange={handleConstructionStatusChange} value={status}>
                        <option value="">ALL</option>
                        <option value="Ready To Move In">Ready To Move In</option>
                        <option value="Under Construction">Under Construction</option>
                        <option value="Collecting EOI">Collecting EOI</option>
                    </select>
                </div>
                <div>
                    <select name="bhk" className='bhk-all-projects' onChange={handleBhkChange} value={bhk}>
                        <option value="">Configurations</option>
                        <option value="1">1 BHK</option>
                        <option value="2">2 BHK</option>
                        <option value="2.5">2.5 BHK</option>
                        <option value="3">3 BHK</option>
                        <option value="3.5">3.5 BHK</option>
                        <option value="4">4 BHK</option>
                    </select>
                </div>
                {/* <div>
                    <select name="cost" id="" className=''>
                        <option value="">All</option>
                        <option value="">Below 50 Lakhs</option>
                        <option value="">Above 50 Lakhs</option>
                    </select>
                </div> */}
            </div>
            <div className='all-projects-project-display-div'>
                <div className='all-projects-project-display'>
                    {filteredProperties.length ? (
                        currentProperties.map((property, index) => (
                            <PropertyCard key={index} property={property} />
                        ))
                    ) : (
                        <p>No projects found for the selected filters.</p>
                    )}
                </div>
            </div>
            <div className='propertygrid-pagination-content'>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
                <p>Total {filteredProperties.length} properties in {city || 'the specified city'}</p>
            </div>
        </div>
    );
};

export default AllProjects;
