// import { useEffect, useState } from "react";

// import PropertyCard from "../../propertyGridComponent/PropertyCard";

// import './NearbyProjects.scss';

// const NearbyProjects = ({ location }) => {
//     const [properties, setProperties] = useState([])

//     useEffect(() => {
//         propertiesAPI()
//     }, [location]);

//     const propertiesAPI = async () => {
//         try {
//             const url = `https://samplemockserver-1.onrender.com/projects?city=${location}`
//             const response = await fetch(url)
//             const data = await response.json();
//             setProperties(data);
//         }
//         catch (error) {
//             console.error('There was a problem with the fetch operation:', error.message);
//         }
//     }

//     return (
//         <div className="s-property-nearby-projects-container" id="nearby-projects">
//             <h2>Near by Projects</h2>
//             <div className="s-prop-nearby-projects-content">
//                 {properties.map((prop, index) => (
//                     <div className="s-property-nearby-projects"
//                         key={index}
//                     // style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)' }}
//                     >
//                         <PropertyCard property={prop} maxWidth="380px" />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default NearbyProjects


import { useEffect, useState } from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import PropertyCard from "../../propertyGridComponent/PropertyCard";
import './NearbyProjects.scss';

const NearbyProjects = ({ location }) => {



    const [properties, setProperties] = useState([]);

    useEffect(() => {

        if (location) {
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
        }
    }, [location]);

    const responsive = {
        0: { items: 1 },
        600: { items: 2 },
        1024: { items: 2 },
    };

    return (
        <div className="s-property-nearby-projects-container" id="nearby-projects">
            <h2>Nearby Projects</h2>
            <div className="s-prop-nearby-projects-content">

                <AliceCarousel
                    mouseTracking
                    items={properties.map((prop) => (
                        <PropertyCard key={prop.id} property={prop} maxWidth="380px" />
                    ))}
                    responsive={responsive}
                    dotsDisabled
                    buttonsDisabled
                    disableDotsControls
                    disableAutoPlayOnAction
                />
            </div>
        </div>
    );
};

export default NearbyProjects;
