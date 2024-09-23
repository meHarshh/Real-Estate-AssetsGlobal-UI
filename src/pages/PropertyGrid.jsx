import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import '../components/loading.scss';

import Pagination from '../components/pagination/Pagination';
import PropertyCard from '../components/propertyGridComponent/PropertyCard';

import './PropertyGrid.scss';

const PropertyGrid = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const { city } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const propertiesPerPage = 10;

    const [selectedFilters, setSelectedFilters] = useState({
        priceRange: [],
        type: [],
        propertyType: [],
        amenities: [],
        ageOfProperty: [],
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCheckboxChange = (category, value) => {
        setSelectedFilters((prevState) => {
            const isChecked = prevState[category].includes(value);
            const updatedCategory = isChecked
                ? prevState[category].filter((item) => item !== value)
                : [...prevState[category], value];
            return {
                ...prevState,
                [category]: updatedCategory,
            };
        });
    };

    const clearFilters = () => {
        setSelectedFilters({
            priceRange: [],
            type: [],
            propertyType: [],
            amenities: [],
            ageOfProperty: [],
        });
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('/propertyDetailsJson/PropertDetailsJson.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const filteredData = data.filter(item => item.city.toLowerCase() === city.toLowerCase());
                setProperties(filteredData);
                setFilteredProperties(filteredData);
            } catch (error) {
                console.error('Error fetching the data', error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [city]);

    useEffect(() => {
        setLoading(true);
        const filteredData = properties.filter(item => {
            return (
                (selectedFilters.priceRange.length === 0 || selectedFilters.priceRange.includes(item.priceRange)) &&
                (selectedFilters.type.length === 0 || selectedFilters.type.includes(item.type)) &&
                (selectedFilters.propertyType.length === 0 || selectedFilters.propertyType.includes(item.propertyType)) &&
                (selectedFilters.amenities.length === 0 || selectedFilters.amenities.some(amenity => item.amenities.includes(amenity))) &&
                (selectedFilters.ageOfProperty.length === 0 || selectedFilters.ageOfProperty.includes(item.ageOfProperty))
            );
        });
        setFilteredProperties(filteredData);
        setLoading(false);
    }, [selectedFilters, properties]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
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

    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
    const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

    return (
        <>
            {/* <div className="prop-grid-filter-menu" onClick={toggleModal}>
                Apply Filters
            </div> */}
            <div className="prop-grid-property-container">
                {/* <div className="prop-grid-property-filters">
                    <h4>Add filters for better search</h4>
                    <div className="prop-grid-clear-filters-container">
                        <button className="prop-grid-clear-filters-button" onClick={clearFilters}>
                            Clear Filters
                        </button>
                    </div>
                    <div className="prop-grid-filter-section">
                        <h5>Price Range</h5>
                        {[
                            'under-50-lacs',
                            '50-to-1-cr',
                            '1-to-1-5-cr',
                            '1-5-to-2-cr',
                            '2-to-5-cr',
                            '5-to-10-cr',
                            '10+-cr',
                        ].map((value) => (
                            <div className="filter-option" key={value}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={value}
                                        checked={selectedFilters.priceRange.includes(value)}
                                        onChange={() => handleCheckboxChange('priceRange', value)}
                                    />
                                    {value.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="prop-grid-filter-section">
                        <h5>Type</h5>
                        {['1-bhk', '2-bhk', '3-bhk', '4-bhk', '4+-bhk'].map((value) => (
                            <div className="filter-option" key={value}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={value}
                                        checked={selectedFilters.type.includes(value)}
                                        onChange={() => handleCheckboxChange('type', value)}
                                    />
                                    {value.replace(/-/g, ' ').toUpperCase()}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="prop-grid-filter-section">
                        <h5>Property Type</h5>
                        {['resale', 'newly-built', 'under-contruction'].map((value) => (
                            <div className="filter-option" key={value}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={value}
                                        checked={selectedFilters.propertyType.includes(value)}
                                        onChange={() => handleCheckboxChange('propertyType', value)}
                                    />
                                    {value.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="prop-grid-filter-section">
                        <h5>Amenities</h5>
                        {['parking', 'lift', 'club', 'gym', 'swimming', 'lift'].map((value) => (
                            <div className="filter-option" key={value}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={value}
                                        checked={selectedFilters.amenities.includes(value)}
                                        onChange={() => handleCheckboxChange('amenities', value)}
                                    />
                                    {value.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="prop-grid-filter-section">
                        <h5>Age of Property</h5>
                        {[
                            'newly-built',
                            '1-to-2-years',
                            '2-to-5-years',
                            '5-to-10-years',
                            '10+-years',
                        ].map((value) => (
                            <div className="filter-option" key={value}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={value}
                                        checked={selectedFilters.ageOfProperty.includes(value)}
                                        onChange={() => handleCheckboxChange('ageOfProperty', value)}
                                    />
                                    {value.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                                </label>
                            </div>
                        ))}
                    </div>
                </div> */}
                <div className="propertyGrid-container">
                    {currentProperties.length > 0 ? (
                        currentProperties.map((item, index) => (
                            <div style={{ borderRadius: '10px' }} key={index}>
                                <PropertyCard property={item} />
                            </div>
                        ))
                    ) : (
                        <h3>No properties found for the selected city.</h3>
                    )}
                </div>
            </div>
            <div className='propertygrid-pagination-content'>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
                <p>Total {filteredProperties.length} properties in {city}</p>
            </div>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className='modal-controls'>
                            <button className="modal-clear-button" onClick={clearFilters}>
                                Clear All
                            </button>
                            <button className="modal-close-button" onClick={toggleModal}>
                                Close
                            </button>
                        </div>
                        <div className="modal-filters">
                            {/* Repeat the filter sections here if you want the modal to have the same filter options */}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PropertyGrid;
