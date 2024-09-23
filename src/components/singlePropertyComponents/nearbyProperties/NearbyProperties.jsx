

// import { useEffect, useState } from "react";

// import PropertyCard from "../../propertyGridComponent/PropertyCard";

// import './NearbyProperties.scss';

// const NearbyProperties = ({ location }) => {
//     const [properties, setProperties] = useState([])

//     useEffect(() => { propertiesAPI() }, [location]);

//     const propertiesAPI = async () => {
//         try {
//             const response = await fetch(`https://samplemockserver-1.onrender.com/projects?city=${location}`)
//             const data = await response.json();
//             setProperties(data);
//         }
//         catch (error) {
//             console.error('There was a problem with the fetch operation:', error.message);
//         }
//     }



//     return (
//         <div className="s-property-nearby-properties-container" id="nearby-properties">
//             <h2>Nearby Properties</h2>
//             <div className="s-prop-nearby-properties-content" >
//                 {properties.map((prop, index) => (
//                     <div className="s-property-nearby-properties" key={index}>
//                         <PropertyCard property={prop} maxWidth="380px" />
//                     </div>
//                 ))}
//             </div>


//         </div>

//     )
// }
// export default NearbyProperties

import { useEffect, useState } from "react";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import PropertyCard from "../../propertyGridComponent/PropertyCard";
import './NearbyProperties.scss';

const NearbyProperties = ({ location }) => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.PUBLIC_URL}/propertyDetailsJson/PropertDetailsJson.json`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const filteredData = data.filter(d => d.city === location);
                setProperties(filteredData);
            } catch (error) {
                console.error('Error fetching the data:', error);
            }
        };

        fetchData();
    }, [location]);

    const responsive = {
        0: { items: 1 },
        768: { items: 2 },
        1024: { items: 2 }
    };

    // const items = properties.map((prop, index) => (
    //     <div className="s-property-nearby-properties" key={index}>
    //         <PropertyCard property={prop} maxWidth="380px" />
    //     </div>
    // ));

    return (
        <div className="s-property-nearby-properties-container" id="nearby-properties">
            <h2>Nearby Properties</h2>
            <div className="s-prop-nearby-properties-content">

                <AliceCarousel
                    // items={items}
                    items={properties.map((prop) => (
                        <PropertyCard key={prop.id} property={prop} maxWidth="380px" />
                    ))}
                    responsive={responsive}
                    controlsStrategy="responsive"
                    disableDotsControls
                    infinite
                />
            </div>
        </div>
    );
};

export default NearbyProperties;
