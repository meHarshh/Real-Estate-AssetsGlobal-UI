
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import PropertyCard from "../../propertyGridComponent/PropertyCard"; // Assuming you have a PropertyCard component
import PropertDetailsJson from '../../../services/propertyDetailsJson/PropertDetailsJson.json';
import './AreaWisePropertyDisplay.scss'
import Pagination from "../../pagination/Pagination";

const AreaWisePropertyDisplay = () => {
    const { propertyLocation } = useParams();
    const [properties, setProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const propertiesPerPage = 10;
    // const [searchArea, setSearchArea] = useState(propertyLocation || "")

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch properties based on area from JSON or API
        const filteredProperties = PropertDetailsJson.filter(
            (item) => item.propertyLocation === propertyLocation
        );
        setProperties(filteredProperties);
    }, [propertyLocation]);


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);
    const totalPages = Math.ceil(properties.length / propertiesPerPage);


    // useEffect(() => {
    //     // Update searchArea when propertyLocation changes
    //     setSearchArea(propertyLocation);
    // }, [propertyLocation]);

    // const handleSearchChange = ({ target }) => {
    //     setSearchArea(target.value)
    // }

    // const handleSearchSubmit = (e) => {
    //     e.preventDefault();
    //     navigate(`/property-in/${searchArea}`)
    // }

    if (properties.length === 0) {
        return (
            <div className="area-wise-no-properties">
                {/* <form onSubmit={handleSearchSubmit} className="area-wise-form">
                    <input
                        type="text"
                        value={searchArea}
                        onChange={handleSearchChange}
                        placeholder="Search for an area..."
                    />
                    <button type="submit">Search</button>
                </form> */}
                <h2 >Properties in This Location Coming Soon</h2>
                <div>

                    <p>We’re currently working on bringing you the best property options in this location.
                        Our team is dedicated to finding the perfect homes for you, and new listings will be available soon.</p>
                    <p>In the meantime, please explore other areas or let us know your specific requirements,
                        and we’ll be happy to assist you in finding a property that suits your needs.</p>
                </div>
                <h4>Stay tuned for updates!</h4>
            </div>
        );
    }

    return (
        <div className="area-wise-property-display">
            {/* <form action="" className="area-wise-form" onSubmit={handleSearchSubmit}>
                <input type="text" value={searchArea} onChange={handleSearchChange} name="searchArea" id="" placeholder="Search for an area" />
                <button type="submit"> search</button>
            </form> */}
            <h2>{properties.length} Properties in {propertyLocation}</h2>
            <div className="property-area-wise-grid">
                {properties.map((property, index) => (
                    <PropertyCard key={index} property={property} />
                ))}
            </div>
            <div className='propertygrid-pagination-content'>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
                <p>Total {properties.length} properties in {propertyLocation}</p>
            </div>
        </div>
    );
};

export default AreaWisePropertyDisplay;
