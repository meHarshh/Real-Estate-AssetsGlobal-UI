import React, { useState } from 'react';
import './HomeFilter.css';

const HomeFilter = () => {
  const [activeButtons, setActiveButtons] = useState({});

  const handleButtonClick = (group, value) => {
    setActiveButtons(prevState => ({
      ...prevState,
      [group]: value
    }));
  };

  const clearAll = () => {
    setActiveButtons({});
    document.getElementById('budget-range').value = document.getElementById('budget-range').min;
    document.querySelectorAll('input[type="text"], input[type="number"]').forEach(input => {
      input.value = '';
    });
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = false;
    });
  };

  return (
    <div className="property-filter-wrapper">
      <div className="property-filter-container">
        <div className="property-filter-header">
          <h2>Filters</h2>
          <button className="clear-button" onClick={clearAll}>Clear All</button>
        </div>
        <div className="home-property-filter-content">
          <div className="property-filter-section">
            <label htmlFor="locality">Search a Locality</label>
            <input type="text" id="locality" placeholder="Search a Locality, Building or Developer" />
          </div>
          <div className="property-filter-section">
            <label>I want to</label>
            <div className="options" data-group="want">
              <button
                className={`option-button ${activeButtons.want === 'Buy' ? 'active' : ''}`}
                onClick={() => handleButtonClick('want', 'Buy')}
              >
                Buy
              </button>
              <button
                className={`option-button ${activeButtons.want === 'Rent' ? 'active' : ''}`}
                onClick={() => handleButtonClick('want', 'Rent')}
              >
                Rent
              </button>
            </div>
          </div>
          <div className="property-filter-section">
            <label>Configuration</label>
            <div className="options" data-group="configuration">
              {['1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK'].map(config => (
                <button
                  key={config}
                  className={`option-button ${activeButtons.configuration === config ? 'active' : ''}`}
                  onClick={() => handleButtonClick('configuration', config)}
                >
                  {config}
                </button>
              ))}
            </div>
          </div>
          <div className="property-filter-section">
            <label>Budget</label>
            <input type="range" min="1000000" max="33000000" defaultValue="1000000" id="budget-range" />
            <div className="budget-inputs">
              <input type="number" id="budget-min" placeholder="Minimum INR" />
              <input type="number" id="budget-max" placeholder="Maximum INR" />
            </div>
          </div>
          <div className="property-filter-section">
            <label>Purchase Type</label>
            <div className="options" data-group="purchase-type">
              <button id='home-filter-purchase-type-1'
                className={`toggle-button ${activeButtons['purchase-type'] === 'New Projects' ? 'active' : ''}`}
                onClick={() => handleButtonClick('purchase-type', 'New Projects')}
              >
                New Projects
              </button>
              <button id='home-filter-purchase-type-1'
                className={`toggle-button ${activeButtons['purchase-type'] === 'Resale' ? 'active' : ''}`}
                onClick={() => handleButtonClick('purchase-type', 'Resale')}
              >
                Resale
              </button>
            </div>
          </div>
          <div className="property-filter-section">
            <label>Possession</label>
            <div className="options" data-group="possession">
              {['Ready to Move', 'In 1 Year', 'In 2 Years', 'In 3 Years', 'After 3 Years'].map(possession => (
                <button
                  key={possession}
                  className={`option-button ${activeButtons.possession === possession ? 'active' : ''}`}
                  onClick={() => handleButtonClick('possession', possession)}
                >
                  {possession}
                </button>
              ))}
            </div>
          </div>
          <div className="property-filter-section">
            <label>Listed By</label>
            <div className="options" data-group="listed-by">
              {['Owner', 'Agent', 'Developer'].map(listedBy => (
                <button
                  key={listedBy}
                  className={`option-button ${activeButtons['listed-by'] === listedBy ? 'active' : ''}`}
                  onClick={() => handleButtonClick('listed-by', listedBy)}
                >
                  {listedBy}
                </button>
              ))}
            </div>
          </div>
          <div className="property-filter-section">
            <label>Age of Property</label>
            <div className="options" data-group="age-of-property">
              {['Less than a Year', 'Less than 2 Years', 'Less than 3 Years', 'Less than 4 Years'].map(age => (
                <button
                  key={age}
                  className={`option-button ${activeButtons['age-of-property'] === age ? 'active' : ''}`}
                  onClick={() => handleButtonClick('age-of-property', age)}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>
          <div className="property-filter-section">
            <label>Amenities</label>
            <div className="options">
              {['Parking', 'Swimming Pool', 'Lift', 'Gated Community', 'Gas Pipeline'].map(amenity => (
                <label key={amenity} className='home-filter-amenities'>
                  <input type="checkbox" />
                  {amenity}
                </label>
              ))}
            </div>
          </div>
          {/* <div className="property-filter-section">
            <label>
              <input type="checkbox" />
              Properties with Photos
            </label>
          </div> */}
          <button className="find-property-button">Find Property</button>
        </div>
      </div>
    </div>
  );
};

export default HomeFilter;
