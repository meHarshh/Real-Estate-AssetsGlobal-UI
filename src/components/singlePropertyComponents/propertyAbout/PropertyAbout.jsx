import React, { useEffect, useState } from "react";
import "./PropertyAbout.scss";

// Import icons
import privateGardeningIcon from "../../../Images/amenities/gardening.png";
import clubHouseIcon from "../../../Images/amenities/Club_House.png";
import tennisCourtIcon from "../../../Images/amenities/tennis-equipment.png";
import amphitheatreIcon from "../../../Images/amenities/Amphitheatre.png";
import cafeteriaIcon from "../../../Images/amenities/Cafeteria.png";
import cctvSecurityIcon from "../../../Images/amenities/CCTV_Security.png";
import gymIcon from "../../../Images/amenities/Gym.png";
import joggingTrackIcon from "../../../Images/amenities/Jogging_Track.png";
import multiPurposeHallIcon from "../../../Images/amenities/Multipurpose_Hall.png";
import regularWaterSupplyIcon from "../../../Images/amenities/Regular_Water_Supply.png";
import seniorCitizenZoneIcon from "../../../Images/amenities/Senior_Citizen_Zone.png";
import swimmingPoolIcon from "../../../Images/amenities/Swimming_Pool.png";
import parkingIcon from "../../../Images/amenities/Parking.png";
import securityIcon from "../../../Images/amenities/24x7_Security.png";
import gardenIcon from "../../../Images/amenities/Garden.png";
import indoorGamesIcon from "../../../Images/amenities/Indoor_Games.png";

import AboutUsContactForm from "../../AboutUsContactForm"
// Import close icon
import { IoCloseSharp } from "react-icons/io5";

const propertiesAbout = [
    { label: "Project Status", value: "constructionStatus" },
    { label: "Project Type", value: "propertyType" },
    { label: "Total Floors", value: "floors" },
    { label: "Plot Area", value: "area" },
];

const amenityIcons = {
    "Private Garden": privateGardeningIcon,
    "Clubhouse": clubHouseIcon,
    "Tennis Court": tennisCourtIcon,
    "CCTV Security": cctvSecurityIcon,
    "Amphitheatre": amphitheatreIcon,
    "Jogging Track": joggingTrackIcon,
    "Gym": gymIcon,
    "Cafeteria": cafeteriaIcon,
    "MultiPropose Hall": multiPurposeHallIcon,
    "Regular Water Supply": regularWaterSupplyIcon,
    "Senior Citizen Zone": seniorCitizenZoneIcon,
    "Swimming Pool": swimmingPoolIcon,
    "Parking": parkingIcon,
    "24/7 Security": securityIcon,
    "Garden": gardenIcon,
    "Indoor Games": indoorGamesIcon,
    // Add more amenities and icons as needed
};

const defaultAmenities = [
    "Private Garden",
    "Clubhouse",
    "Tennis Court",
    "CCTV Security",
    "Senior Citizen Zone",
    "Gym",
    "Indoor Games",
    "Swimming Pool"

];

const PropertyAbout = ({ propItem }) => {
    const amenities = Array.isArray(propItem.amenities) ? propItem.amenities : [];
    const [showAllAmenities, setShowAllAmenities] = useState(false);
    const [selectedSection, setSelectedSection] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const propertyKeywords = [
        propItem.name,
        propItem.developerName,
        propItem.propertyLocation, // Add other properties as needed
    ];

    const keywords = propertyKeywords.filter(Boolean);

    const boldKeywords = (text, keywords) => {
        const regex = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");
        return text
            .split(regex)
            .map((part, index) =>
                regex.test(part) ? <strong key={index}>{part}</strong> : part
            );
    };

    useEffect(() => {
        if (propItem.bhk) {
            if (typeof propItem.bhk === "string") {
                // Handle string case
                setSelectedSection(propItem.bhk);
            } else if (Array.isArray(propItem.bhk)) {
                // Handle array case
                setSelectedSection(propItem.bhk.length > 0 ? propItem.bhk[0] : null);
            }
        }
    }, [propItem]);

    console.log(propItem.cost);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const truncateText = (text, maxLength) => {
        if (!text) return "";
        if (text.length <= maxLength) {
            return text;
        }
        return text.substr(0, maxLength) + "...";
    };

    const toggleShowAllAmenities = () => {
        setShowAllAmenities(!showAllAmenities);
    };

    return (
        <div className="s-property-about-container">
            <section className="s-property-about" id="overview">
                <h2>
                    About {propItem.name}, {propItem.city}
                </h2>
                <div>
                    <section className="s-property-about-config-container">
                        {propertiesAbout.map((abtItem) => (
                            <div key={abtItem.value} className="s-property-about-config">
                                <p>{abtItem.label}</p>
                                <p>{propItem[abtItem.value]}</p>
                            </div>
                        ))}
                    </section>
                    <section className="s-property-about-desc">
                        <p
                            style={{
                                textAlign: "justify",
                                lineHeight: "1.5",
                                letterSpacing: ".05",
                            }}
                            className={`description-text ${isExpanded ? "expanded" : ""}`}
                        >
                            {isExpanded
                                ? boldKeywords(propItem.propertyDescription, keywords)
                                : boldKeywords(
                                    truncateText(propItem.propertyDescription, 200),
                                    keywords
                                )}
                        </p>
                        {propItem.propertyDescription &&
                            propItem.propertyDescription.length > 200 && (
                                <button
                                    id="toggle-button-prop-desc"
                                    onClick={toggleExpanded}
                                    style={{
                                        color: "white",
                                        background: "#7ab945",
                                        border: "none",
                                        padding: "0.2rem 0.5rem",
                                    }}
                                >
                                    {isExpanded ? "Read less" : "Read more"}
                                </button>
                            )}
                    </section>
                </div>
            </section>
            <hr />
            <section className="s-property-configuration" id="configurations">
                <div className="s-property-configuration-unit">
                    <h2>Configurations</h2>
                    {/* <p className="plan">Unit Plan</p> */}
                </div>
                <div className="s-property-configuration-plan">
                    {/* <ul>
                        {propItem.bhk && (typeof propItem.bhk === 'string' ? [propItem.bhk] : propItem.bhk).map((config, index) => (
                            <li key={index} onClick={() => setSelectedSection(config)} className={selectedSection === config ? 'active' : ''}>
                                {config}
                            </li>
                        ))}
                    </ul> */}
                    <section>
                        {selectedSection && (
                            <div>
                                <section className="config-main">
                                    <div style={{ textAlign: "left" }}>
                                        {propItem.config && propItem.config.split(",").map((configItem, index) => {
                                            const [firstPart, secondPart] = configItem.split(":");
                                            return (
                                                <div key={index}>
                                                    <p className="s-property-about-congif-details">
                                                        <span style={{ fontWeight: "bold" }}>
                                                            {firstPart.trim()}:
                                                        </span>
                                                        <span> {secondPart.trim()}</span>
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div>
                                        <p> Carpet Area: <span>{propItem.carpetArea}</span></p>
                                        <p> Built-up Area: <span>{propItem.builtUpArea}</span> </p>
                                    </div>
                                </section>
                                <section className="config-details">
                                    <div>
                                        <p>
                                            Structure: <span>{propItem.Structure}</span>
                                        </p>
                                        <p>
                                            Floors: <span>{propItem.floors}</span>
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            Property Type: <span>{propItem.propertyType}</span>
                                        </p>
                                        <p>
                                            Price: <span>INR {propItem.cost}</span>
                                        </p>
                                    </div>
                                </section>
                            </div>
                        )}
                    </section>
                </div>
            </section>
            <hr />
            <section className="s-property-contact-form-display">
                <AboutUsContactForm />
            </section>
            <section className="s-property-amenities" id="amenities">
                <h2>Amenities</h2>
                <div className="amenities-flex-container">
                    {(() => {
                        // Filter amenities to include only those with icons
                        const amenitiesWithIcons = amenities.filter(amenity => amenityIcons[amenity]);

                        // Ensure at least 4 amenities are displayed if possible
                        const minAmenitiesCount = 8;
                        const defaultAmenitiesWithIcons = defaultAmenities.filter(amenity => amenityIcons[amenity]);
                        const displayAmenities = amenitiesWithIcons.length >= minAmenitiesCount
                            ? amenitiesWithIcons.slice(0, showAllAmenities ? amenitiesWithIcons.length : 10)
                            : [
                                ...amenitiesWithIcons,
                                ...defaultAmenitiesWithIcons.slice(0, minAmenitiesCount - amenitiesWithIcons.length)
                            ];

                        return displayAmenities.map((amenity, index) => (
                            <div key={index} className="amenity-item">
                                <img src={amenityIcons[amenity]} alt={amenity} className="amenity-icon" />
                                <p>{amenity}</p>
                            </div>
                        ));
                    })()}
                </div>
                {/* <section style={{ textAlign: 'center', width: '100%' }}>
                    {amenities.filter(amenity => amenityIcons[amenity]).length > 6 && (
                        <div className="show-more" onClick={toggleShowAllAmenities}>
                            <p>{showAllAmenities ? 'Show Less' : 'Show More'}</p>
                        </div>
                    )}
                </section>
                {showAllAmenities && (
                    <div className="popup-amenities">
                        <div className="popup-amenity-content">
                            <h3>All Amenities</h3>
                            <div className="popup-amenity-flex-container">
                                {amenities
                                    .filter(amenity => amenityIcons[amenity]) // Only include amenities with an icon
                                    .map((amenity, index) => (
                                        <div key={index} className="popup-amenity-item">
                                            <img src={amenityIcons[amenity]} alt={amenity} className="amenity-icon" />
                                            <p>{amenity}</p>
                                        </div>
                                    ))}
                            </div>
                            <button onClick={toggleShowAllAmenities} className="amenities-popup-btn"><IoCloseSharp /></button>
                        </div>
                    </div>
                )} */}
            </section>
            <hr />
        </div>
    );
};

export default PropertyAbout;
