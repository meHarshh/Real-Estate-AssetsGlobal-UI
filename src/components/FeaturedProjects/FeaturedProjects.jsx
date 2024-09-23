import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PopupAllPgForm from "../PopupAllPgForm";
import ContactForm from "../AboutUsContactForm";
import { Link } from "react-router-dom";
import "./FeaturedProjects.scss"; // Ensure the CSS file is correctly imported

const responsive = {
    0: { items: 1 },
    568: { items: 1 },
    1024: { items: 1 },
};

const FeaturedProjects = () => {
    const [toggle, setToggle] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const projects = [
        
            {
                "id":267,
                "developerName": "TVS EMERLD",
                "name":"TVS ISLE TREES",
                "propertyType": "APARTMENT",
                "transactionType": "NEW_BOOKING",
                "constructionStatus": "UNDER_CONSTRUCTION",
                "bhk": "3BHK /4BHK",
                "bathroom": "3 BHK: 1500 Sqft, 3 BHK: 1801-1830 Sqft, 4 BHK + 4T: 2323-2379 Sqft",
                "balcony": 2,
                "furnishedType": "UNFURNISHED",
                "parking": "BIKE_PARKING/ CAR_PARKING/ BOTH",
                "openParking": 1,
                "possessionDate": 2028,
                "cost": "3BHK: 1.60CR TO 1.69CR",
                "maintainceCharge": "12500/0",
                "brockrageCharge": "YES/NO",
                "area": "2.71 Acres Development with 3 Towers & 154 Residences",
                "landType": "RESIDENTIAL",
                "builtUpArea": "Structure - 2B+S+14 floors",
                "carpetArea": "68%",
                "facing": "EAST/WEST",
                "propertyAddress": "RACHENAHALLI",
                "reraId": "",
                "propertyDescription": "It’s a property with WORLD CLASS AMENITIES AND NEAR TO AIRPORT, METRO STATION & MALLS",
                "city": "Bengaluru",
                "propertyLocation": "RACHENAHALLI",
                "state": "Karnataka",
                "images":[
                  "https://www.homznspace.com/wp-content/uploads/2024/07/Main-Elevation-TVS-Emerald-Isle-of-Trees-Rachenahalli.jpg",
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMNjYrn-2I6pN00hyFl209Lyof_HsRvoX6Yw&s"
                ],
                "amenities":[
                  "Swimming Pool",
                  "park",
                  "Play Area"
                ]
        },
        {
            id: 205,
            name: "Brigade Laguna",
            developerName: "Brigade Group",
            propertyType: "Apartment",
            transactionType: "Available",
            constructionStatus: "Under Construction",
            bhk: "2/3",
            bathroom: "Not specified",
            balcony: "Not specified",
            furnishedType: "Not specified",
            parking: "Not specified",
            possessionDate: "Dec 2025",
            cost: "1.35 Cr",
            maintenanceCharge: "Not specified",
            brokerageCharge: "Zero Brokerage",
            area: "763 - 1,208",
            landType: "Residential",
            builtUpArea: "On request",
            carpetArea: "763 - 1,208",
            facing: "Not specified",
            propertyAddress: "Hobli, opp. Rachenahalli, Krishnarajapuram, Bengaluru, Karnataka, India",
            reraId: "PRM/KA/RERA/1251/309/PR/170322/004775",
            propertyDescription: "Brigade Laguna by Brigade Group is an under-construction residential project located in Hobli, opp. Rachenahalli, Krishnarajapuram, Bengaluru. The development offers 2 BHK and 3 BHK apartments with carpet areas ranging from 763 sq.ft. to 1,208 sq.ft. Possession is expected in December 2025.",
            city: "Bengaluru",
            propertyLocation: "Hobli, opp. Rachenahalli, Krishnarajapuram",
            state: "Karnataka",
            images: [
                "https://s3.ap-south-1.amazonaws.com/website-prod-public/home/ubuntu/pp-website/public/assets/images/36811/original/Capture.JPG?1653560134"
            ],
            amenities: [
                "Zero Brokerage",
                "Best Price Guarantee"
            ]
        }
    ];


    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) =>
            (prevIndex - 1 + projects.length) % projects.length
        );
    };

    return (
        <div className="featured-projects-container">
            {projects.map((property, index) => (
                <div key={index} className="property-card-wrapper">
                    <div className="property-card-header">
                        <AliceCarousel
                            mouseTracking
                            items={property.images.map((img, imgIndex) => (
                                <div
                                    className="prop-grid-property-card-image"
                                    style={{ borderRadius: "10px" }}
                                    key={imgIndex}
                                >
                                    <img src={img} alt="Property" />
                                </div>
                            ))}
                            responsive={responsive}
                            controlsStrategy="alternate"
                            infinite
                            disableDotsControls
                            activeIndex={activeIndex}
                            onSlideChanged={({ item }) => setActiveIndex(item)}
                            renderPrevButton={() => (
                                <button className="custom-prev-btn" onClick={handlePrev}>
                                    <ArrowBackIosIcon />
                                </button>
                            )}
                            renderNextButton={() => (
                                <button className="custom-next-btn" onClick={handleNext}>
                                    <ArrowForwardIosIcon />
                                </button>
                            )}
                        />
                    </div>
                    <div className="property-card-content">
                        <div className="details-row">
                            <div>
                                <h4>Price</h4>
                                <p>
                                    <CurrencyRupeeIcon sx={{ fontSize: "20px", color: "black" }} />
                                    {property.cost}&nbsp;&nbsp;
                                    <span style={{ fontWeight: "normal", fontSize: "12px" }}>Onwards</span>
                                </p>
                            </div>
                            <div>
                                <h4>Configurations</h4>
                                <p>{property.configurations}</p>
                            </div>
                            <div>
                                <h4>Carpet Area</h4>
                                <p>{property.carpetArea}</p>
                            </div>
                            <div>
                                <h4>Possession Date</h4>
                                <p>{property.possessionDate}</p>
                            </div>
                        </div>
                        <div className="property-details-hover">
                            <h4>Property Details</h4>
                            <p>{property.details}</p>
                        </div>
                    </div>
                    <div className="card-button-container">
                        <Link to={`/property/${property.id}`} className="card-view-button">
                            View Property
                        </Link>
                        <button
                            className="contact-button"
                            onClick={() => {
                                setToggle(true);
                                setShowPopup(true);
                            }}
                        >
                            Contact Us
                        </button>
                    </div>
                </div>
            ))}
            {toggle && (
                <PopupAllPgForm
                    onClose={() => setToggle(false)}
                    onShowPopup={setShowPopup}
                />
            )}
            {showPopup && <ContactForm />}
        </div>
    );
};

export default FeaturedProjects;
