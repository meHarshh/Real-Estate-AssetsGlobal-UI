import { useEffect, useState } from "react";
import "./NewlyAddedProps.css";
import AliceCarousel from "react-alice-carousel";
import PropertyCard from "./propertyGridComponent/PropertyCard";

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};

const NewlyAddedProps = ({ city, subCity }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("propertyDetailsJson/PropertDetailsJson.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Convert city and subCity to lowercase for comparison
        const cityLower = city.toLowerCase();
        const subCityLower = subCity.toLowerCase();

        // Filter data based on city and whether propertyAddress includes subCity
        const filteredData = data.filter((item) => {
          const addressIncludesSubCity = item.propertyAddress?.toLowerCase().includes(subCityLower) || false;
          const developerIncludesSubCity = item.developerName?.toLowerCase().includes(subCityLower) || false;
          const nameIncludesSubCity = item.name?.toLowerCase().includes(subCityLower) || false;
          return item.city.toLowerCase() === cityLower && (addressIncludesSubCity || developerIncludesSubCity || nameIncludesSubCity);
        });

        console.log("Filtered Data:", filteredData); // Console the filtered data

        setProperties(filteredData);
      } catch (error) {
        setError("Error fetching the data");
        console.error("Error fetching the data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city, subCity]);

  // Get the last 5 properties for display
  const items = properties.slice(-8).map((property) => (
    <div className="property-card" key={property.id}>
      <PropertyCard property={property} />
    </div>
  ));

  return (
    <div className="property-container">
      {loading ? (
        <p>Loading properties...</p>
      ) : error ? (
        <h4>{error}</h4>
      ) : properties.length > 0 ? (
        <div className="property-carousel">
          <AliceCarousel
            mouseTracking
            items={items}
            responsive={responsive}
            controlsStrategy="alternate"
            infinite
            autoPlay
            autoPlayInterval={1500}
            animationDuration={1000}
            disableButtonsControls
            paddingLeft={0}
            paddingRight={0}
          />
        </div>
      ) : (
        <h4>No Properties found from the selected city and subcity</h4>
      )}
    </div>
  );
};

export default NewlyAddedProps;
