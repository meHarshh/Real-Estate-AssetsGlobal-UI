// import { useEffect, useState } from "react";

// import PropertyCard from "../../propertyGridComponent/PropertyCard";

// import './SimilarProjects.scss';

// const SimilarProjects = ({ propType }) => {
//     const [properties, setProperties] = useState([])

//     useEffect(() => {
//         propertiesAPI()
//     }, [propType]);

//     const propertiesAPI = async () => {
//         try {
//             const response = await fetch(`https://samplemockserver-1.onrender.com/projects?type=${propType}`)

//             const data = await response.json();
//             setProperties(data);
//         }
//         catch (error) {
//             console.error('There was a problem with the fetch operation:', error.message);
//         }
//     }

//     return (
//         <div className="s-property-similar-projects-container" id="similar-projects">
//             <h2>Similar Projects</h2>
//             <div className="s-prop-similar-projects-content" >
//                 {properties.map((prop, index) => (
//                     <div className="s-property-similar-projects" key={index} >
//                         <PropertyCard property={prop} maxWidth="380px" />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }
// export default SimilarProjects

import { useEffect, useState } from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import PropertyCard from "../../propertyGridComponent/PropertyCard";
import './SimilarProjects.scss';

const SimilarProjects = ({ propType }) => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.PUBLIC_URL}/propertyDetailsJson/PropertDetailsJson.json`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const filteredData = data.filter(d => d.propertyType === propType);
                setProperties(filteredData);
            } catch (error) {
                console.error('Error fetching the data:', error);
            }
        };

        fetchData();
    }, [propType]);

    const responsive = {
        0: { items: 1 },
        768: { items: 2 }
    };

    return (
        <div className="s-property-similar-projects-container" id="similar-projects">
            <h2>Similar Projects</h2>
            <div className="s-prop-similar-projects-content">
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

export default SimilarProjects;
