
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Icon, divIcon, point } from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { IoIosArrowForward } from "react-icons/io";
// import 'leaflet.markercluster/dist/MarkerCluster.css';
// import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
// import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
// import MarkerClusterGroup from 'react-leaflet-cluster';
// import googleMapIcon from '../../../Images/google-maps.png';
// import gDirectonsIcon from '../../../Images/location.png';
// import './PropertyLocation.scss';

// import schoolIcon from '../../../Images/location/school.svg';
// import hospitalIcon from '../../../Images/location/hospital.svg';
// import shoppingCenterIcon from '../../../Images/location/shoppingbag.svg';
// import parkIcon from '../../../Images/location/park.svg';
// import restaurantIcon from '../../../Images/location/restaurant.svg';
// import bankIcon from '../../../Images/location/mapBankIcon.svg';


// const useMapEventsHandler = (setposition) => {
//     useMapEvents({
//         click(e) {
//             setposition([e.latlng.lat, e.latlng.lng]);
//         }
//     });
//     return null;
// };

// const PropertyLocation = ({ propItem }) => {
//     const [position, setPosition] = useState([12.9716, 77.5946]); // Initial position for Bengaluru
//     const [markers, setMarkers] = useState([
//         { geocode: [12.9716, 77.5946], popup: 'Bengaluru, India' },
//         { geocode: [12.2958, 76.6394], popup: 'Mysuru, India' },
//         { geocode: [13.0827, 80.2707], popup: 'Chennai, India' }
//     ]);
//     const [nearbyPlaces, setNearbyPlaces] = useState({
//         schools: [],
//         hospitals: [],
//         shoppingCenters: [],
//         parks: [],
//         restaurants: [],
//         banks: []
//     });
//     const [selectedCategory, setSelectedCategory] = useState('hospitals');

//     const customIcon = new Icon({
//         iconUrl: googleMapIcon,
//         iconSize: [38, 38]
//     });

//     const createCustomClusterIcon = (cluster) => {
//         return new divIcon({
//             html: `<div class='cluster-icon'>${cluster.getChildCount()}</div>`,
//             className: 'custom-marker-cluster',
//             iconSize: point(33, 33, true)
//         });
//     };

//     const fetchNearbyPlaces = async (position) => {
//         const apiKey = 'YOUR_GOOGLE_API_KEY';
//         const location = `${position[0]},${position[1]}`;
//         const radius = 1500; // Adjust the radius as needed

//         try {
//             const types = ['school', 'hospital', 'shopping_mall', 'park', 'restaurant', 'bank'];
//             const responses = await Promise.all(types.map(type =>
//                 axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${apiKey}`)
//             ));

//             setNearbyPlaces({
//                 schools: responses[0].data.results,
//                 hospitals: responses[1].data.results,
//                 shoppingCenters: responses[2].data.results,
//                 parks: responses[3].data.results,
//                 restaurants: responses[4].data.results,
//                 banks: responses[5].data.results,
//             });
//         } catch (error) {
//             console.error("Error fetching nearby places:", error);
//         }
//     };

//     useEffect(() => {
//         fetchNearbyPlaces(position);
//     }, [position]);

//     const handleCategoryChange = (category) => {
//         setSelectedCategory(category);
//     };

//     const categories = [
//         { key: 'schools', label: 'Schools', icon: schoolIcon },
//         { key: 'hospitals', label: 'Hospitals', icon: hospitalIcon },
//         { key: 'shoppingCenters', label: 'Shopping Center', icon: shoppingCenterIcon },
//         { key: 'parks', label: 'Park', icon: parkIcon },
//         { key: 'restaurants', label: 'Restaurant', icon: restaurantIcon },
//         { key: 'banks', label: 'Bank', icon: bankIcon }, // Using shoppingCenterIcon as placeholder for banks
//     ];

//     return (
//         <div className='s-property-location-container' id='locality'>
//             <section className='s-property-location-map'>
//                 <h2>Location</h2>
//                 <p>Explore Bannerghatta - Map View</p>
//                 <MapContainer center={position} zoom={13}>
//                     <TileLayer
//                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                         url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
//                     />
//                     <MarkerClusterGroup chunkedLoading iconCreateFunction={createCustomClusterIcon}>
//                         {markers.map((marker, index) => (
//                             <Marker position={marker.geocode} icon={customIcon} key={index}>
//                                 <Popup>
//                                     <h2>{marker.popup}</h2>
//                                 </Popup>
//                             </Marker>
//                         ))}
//                     </MarkerClusterGroup>
//                     <useMapEventsHandler setPosition={setPosition} />
//                 </MapContainer>

//                 <div className="categories-wrapper">
//                     <div className="categories">
//                         {categories.map(category => (
//                             <button
//                                 key={category.key}
//                                 type="button"
//                                 className={`btn-category ${selectedCategory === category.key ? 'active' : ''}`}
//                                 onClick={() => handleCategoryChange(category.key)}
//                             >
//                                 <span className="icon">
//                                     <img src={category.icon} alt={category.label} />
//                                 </span> {category.label}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 <ul className="details-wrapper">
//                     {nearbyPlaces[selectedCategory].map((place, index) => (
//                         <li key={index} className="detail-item">
//                             <a
//                                 href={`https://www.google.com/maps/dir/?api=1&destination=${place.geometry.location.lat},${place.geometry.location.lng}`}
//                                 title={place.name}
//                                 className="detail-link"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                             >
//                                 <span className="icon">
//                                     <img src={categories.find(cat => cat.key === selectedCategory)?.icon} alt={selectedCategory} />
//                                 </span>
//                                 <span className="name-wrapper">
//                                     <span className="name">{place.name}</span>&nbsp;
//                                     <span className="detail-distance">({(place.geometry.location.lat - position[0]).toFixed(2)} km, {(place.geometry.location.lng - position[1]).toFixed(2)} km)</span>
//                                 </span>
//                                 <span className="d-none d-lg-inline detail-light">
//                                     •&nbsp;<span className="directions icon"></span>&nbsp;Directions
//                                 </span>
//                             </a>
//                             <div className="ml-20 ml-lg-auto">
//                                 <a
//                                     href={`https://www.google.com/maps/dir/?api=1&destination=${place.geometry.location.lat},${place.geometry.location.lng}`}
//                                     className="d-lg-none detail-light"
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                 >
//                                     <span>Directions</span>
//                                     <span className="icon chevron"></span>
//                                 </a>
//                                 <a
//                                     href="#"
//                                     className="detail-light"
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                 >
//                                     <span>Nearby Properties</span>
//                                     <span className="icon chevron"></span>
//                                 </a>
//                             </div>
//                         </li>
//                     ))}
//                 </ul>

//                 <div className="text-center mt-4">
//                     <button className="btn-more" data-toggle="modal" data-target="#neighbourhoodModal">Show all</button>
//                 </div>
//             </section>
//             <hr />
//             <section className="s-property-location-commute">
//                 <h2>Commute Time from {propItem.name}</h2>

//                 <div className='s-prop-directions'>
//                     <p> <img src={gDirectonsIcon} alt="map icon" width={22} />{propItem.name}, {propItem.city}</p>
//                     <p>< input type='text' placeholder='Enter a location to view travel time' /><span>Show Travel Time</span></p>
//                 </div>
//             </section>
//             <hr />
//         </div>
//     );
// };

// export default PropertyLocation;
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import googleMapIcon from '../../../Images/google-maps.png';
import gDirectonsIcon from '../../../Images/location.png';
import schoolIcon from '../../../Images/location/school.svg';
import hospitalIcon from '../../../Images/location/hospital.svg';
import shoppingCenterIcon from '../../../Images/location/shoppingbag.svg';
import parkIcon from '../../../Images/location/park.svg';
import restaurantIcon from '../../../Images/location/restaurant.svg';
import bankIcon from '../../../Images/location/mapBankIcon.svg';
import './PropertyLocation.scss';

// Define your custom icons
const createIcon = (iconUrl) => L.icon({
    iconUrl,
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Anchor point of the icon
    popupAnchor: [0, -32] // Popup position
});

const PropertyLocation = ({ propItem }) => {
    const [position, setPosition] = useState([12.9716, 77.5946]); // Default position
    const [markers, setMarkers] = useState([
        { geocode: [12.9716, 77.5946], popup: 'Bengaluru, India' },
        { geocode: [12.2958, 76.6394], popup: 'Mysuru, India' },
        { geocode: [13.0827, 80.2707], popup: 'Chennai, India' }
    ]);
    const [nearbyPlaces, setNearbyPlaces] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('hospital');
    // const linksContainerRef = useRef(null);


    // Define categories and corresponding icons
    const categories = [
        { key: 'school', label: 'Schools', icon: schoolIcon },
        { key: 'hospital', label: 'Hospitals', icon: hospitalIcon },
        { key: 'shopping_mall', label: 'Shopping Centers', icon: shoppingCenterIcon },
        { key: 'park', label: 'Parks', icon: parkIcon },
        { key: 'restaurant', label: 'Restaurants', icon: restaurantIcon },
        { key: 'bank', label: 'Banks', icon: bankIcon },
    ];

    useEffect(() => {
        // Load Google Maps API if not already loaded
        const loadGoogleMapsApi = () => {
            if (window.google && window.google.maps) return;
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_API_KEY&libraries=places`;
            script.async = true;
            document.body.appendChild(script);
            script.onload = () => {
                // Fetch nearby places when API is loaded
                fetchNearbyPlaces(position);
            };
        };
        loadGoogleMapsApi();
    }, [position]); // Empty dependency array ensures this runs only once

    useEffect(() => {
        // Fetch nearby places whenever position or selectedCategory changes
        if (window.google && window.google.maps) {
            fetchNearbyPlaces(position);
        }
    }, [position, selectedCategory]);

    const fetchNearbyPlaces = (position) => {
        if (!window.google || !window.google.maps) return;

        const service = new window.google.maps.places.PlacesService(
            new window.google.maps.Map(document.createElement('div'))
        );

        const request = {
            location: new window.google.maps.LatLng(position[0], position[1]),
            radius: '1500', // Adjust the radius as needed
            type: selectedCategory,
        };

        service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                console.log("Nearby places fetched:", results); // Debugging
                setNearbyPlaces(results);
            } else {
                console.error("Error fetching nearby places:", status);
            }
        });
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        fetchNearbyPlaces(position); // Fetch places for new category
    };

    // const scrollLinks = (direction) => {
    //     if (linksContainerRef.current) {
    //         const scrollAmount = direction === 'left' ? -100 : 100;
    //         linksContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    //     }
    // };

    return (
        <div className='s-property-location-container' id='locality'>
            <section className='s-property-location-map'>
                <h2>Location</h2>
                <p>Explore Bannerghatta - Map View</p>
                <MapContainer center={position} zoom={13}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    {markers.map((marker, index) => (
                        <Marker
                            position={marker.geocode}
                            icon={createIcon(googleMapIcon)}
                            key={index}
                        >
                            <Popup>
                                <h2>{marker.popup}</h2>
                            </Popup>
                        </Marker>
                    ))}
                    {nearbyPlaces.map((place, index) => (
                        <Marker
                            position={[place.geometry.location.lat(), place.geometry.location.lng()]}
                            key={index}
                            icon={createIcon(googleMapIcon)}
                        >
                            <Popup>
                                <h2>{place.name}</h2>
                                <a
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${place.geometry.location.lat()},${place.geometry.location.lng()}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Get Directions
                                </a>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                <div className="categories-wrapper">

                    <div className="categories">
                        {categories.map(category => (
                            <button
                                key={category.key}
                                type="button"
                                className={`btn-category ${selectedCategory === category.key ? 'active' : ''}`}
                                onClick={() => handleCategoryChange(category.key)}
                            >
                                <span className="icon">
                                    <img src={category.icon} alt={category.label} />
                                </span> {category.label}
                            </button>
                        ))}
                    </div>

                </div>
            </section>
            <hr />
            <section className="s-property-location-commute">
                <h2>Commute Time from {propItem.name}</h2>
                <div className='s-prop-directions'>
                    <p> <img src={gDirectonsIcon} alt="map icon" width={22} />{propItem.name}, {propItem.city}</p>
                    <p><input type='text' placeholder='Enter a location to view travel time' /><span>Show Travel Time</span></p>
                </div>
            </section>
            <hr />
        </div>
    );
};

export default PropertyLocation;

