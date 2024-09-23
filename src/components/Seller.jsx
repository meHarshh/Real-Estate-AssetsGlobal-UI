import React, { useState } from "react";
import "../pages/BecomeSeller.css";
import axios from "axios";
import Popup from "./ContactPgPopup";
const SellerForm = () => {
    const initialState = {
        propertyType: "",
        transactionType: "",
        constructionStatus: "",
        bhk: "",
        bathroom: "",
        balcony: "",
        furnishedType: "",
        parking: "",
        openParking: 0,
        possessionDate: "",
        cost: "",
        maintainanceCharges: "",
        brokerageCharges: "",
        area: "",
        landType: "",
        builtUpArea: "",
        carpetArea: "",
        facing: "",
        propertyAddress: "",
        reraId: "",
        propertyDescription: "",
        city: "",
        propertyLocation: "",
        state: "",
        // images: [],
        // videos: []
    }

    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const [selectedValues, setSelectedValues] = useState(initialState);
    const [selectedPropertyType, setSelectedPropertyType] = useState("");
    const handleChange = (e, form) => {
        const { name, value } = e.target; {
            if (name === "propertyType") {
                console.log(value)
                setSelectedPropertyType(value);
            }
            setSelectedValues((prevDetails) => ({
                ...prevDetails,
                [name]: name === "facing" ? value.toUpperCase().replace(/ /g, "_") : value
            }));
        };
    }



    console.log(selectedPropertyType)

    const handleButtonClick = (name, value) => {
        setSelectedValues((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
        if (name === "propertyType") {
            console.log(value)
            setSelectedPropertyType(value);
        }
    };

    const handleFileChange = (e, type) => {
        setSelectedValues((prevDetails) => ({
            ...prevDetails,
            [type]: Array.from(e.target.files),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const valuesToSubmit = { ...selectedValues };

        // Remove specific fields based on property type
        if (selectedPropertyType === 'LAND' || selectedPropertyType === 'PLOTS') {
            delete valuesToSubmit.constructionStatus;
            delete valuesToSubmit.bhk;
            delete valuesToSubmit.balcony;
            delete valuesToSubmit.carpetArea;
            delete valuesToSubmit.builtUpArea;
            delete valuesToSubmit.bathroom;
            delete valuesToSubmit.facing;
            delete valuesToSubmit.furnishedType;
            delete valuesToSubmit.parking;
            delete valuesToSubmit.openParking;
        } else {
            delete valuesToSubmit.landType; // Only remove landType if not LAND or PLOTS
        }

        // Filter out any empty values
        Object.keys(valuesToSubmit).forEach((key) => {
            if (valuesToSubmit[key] === '' || valuesToSubmit[key] === null || valuesToSubmit[key] === undefined) {
                delete valuesToSubmit[key];
            }
        });

        console.log(valuesToSubmit);

        axios.post('http://localhost:8080/addSellerWithProperty', valuesToSubmit)
            .then(response => {
                console.log('Form submitted successfully', response.data);
                // Handle success (optional)
                setShowPopup(true)
                setPopupMessage(response.message)
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                // Handle error (optional)
                setShowPopup(true)
                setPopupMessage("ERROR: ", error)
            });
    };


    const handleClear = () => {
        setSelectedValues(initialState)
        setSelectedPropertyType("");
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="scrollable-form">
                <div className="filter-container">
                    <div className="filter-content">
                        {/* Property Type Specific */}
                        <div className="filter-section">
                            <label>Property Type*</label>
                            <div className="selection-box">
                                {[
                                    "Apartment",
                                    "Villa",
                                    "Independent House",
                                    "Plots",
                                    "Land",
                                    "Office Space",
                                    "Commercial Properties",
                                    "Others",
                                ].map((type) => (
                                    <div className="option" key={type}>
                                        <input
                                            type="button"
                                            value={type}
                                            className={
                                                selectedValues["propertyType"] === type.toUpperCase().replace(/ /g, "_") ? "selected" : ""
                                            }
                                            onClick={() => handleButtonClick("propertyType", type.toUpperCase().replace(/ /g, "_"))}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Transaction Type */}
                        <div className="filter-section">
                            <label>Transaction Type*</label>
                            <div className="selection-box">
                                {["New Booking", "Resale", "others"].map((type) => (
                                    <div className="option" key={type}>
                                        <input
                                            type="button"
                                            value={type}
                                            className={
                                                selectedValues["transactionType"] === type.toUpperCase().replace(/ /g, "_") ? "selected" : ""
                                            }
                                            onClick={() => handleButtonClick("transactionType", type.toUpperCase().replace(/ /g, "_"))}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Facing */}
                        <div className="filter-section">
                            <label>Facing*</label>
                            <div className="input-container">
                                <input
                                    type="text"
                                    id="facing"
                                    name="facing"
                                    placeholder="Enter Facing"
                                    value={selectedValues.facing}
                                    onChange={(e) => handleChange(e, "property")}
                                />
                            </div>
                        </div>
                        {/* Conditional Rendering Based on Property Type */}
                        {(selectedPropertyType === "PLOTS" || selectedPropertyType === "LAND") ? null : (
                            <>
                                {/* Construction Status */}
                                <div className="filter-section">
                                    <label>Construction Status*</label>
                                    <div className="selection-box">
                                        {["Ready to Move", "Under Construction"].map((type) => (
                                            <div className="option" key={type}>
                                                <input
                                                    type="button"
                                                    value={type}
                                                    className={
                                                        selectedValues["constructionStatus"] === type.toUpperCase().replace(/ /g, "_")
                                                            ? "selected"
                                                            : ""
                                                    }
                                                    onClick={() => handleButtonClick("constructionStatus", type.toUpperCase().replace(/ /g, "_"))}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* BHK */}

                                {/* Bathroom */}
                                <div className="filter-section">
                                    <label>Bathroom*</label>
                                    <div className="selection-box" id="bathroom">
                                        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((number) => (
                                            <div className="option" key={number}>
                                                <input
                                                    type="button"
                                                    value={number}
                                                    data-value={number}
                                                    className={
                                                        selectedValues["bathroom"] === number ? "selected" : ""
                                                    }
                                                    onClick={() => handleButtonClick("bathroom", number)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Balcony */}


                                {/* Furnish Type */}
                                <div className="filter-section">
                                    <label>Furnish Type*</label>
                                    <div className="selection-box" id="furnish-type">
                                        {["Fully Furnished", "Semi Furnished", "Unfurnished"].map(
                                            (type) => (
                                                <div className="option" key={type}>
                                                    <input
                                                        type="button"
                                                        value={type}
                                                        data-value={type.toLowerCase().replace(" ", "-")}
                                                        className={
                                                            selectedValues["furnishedType"] === type.toUpperCase().replace(/ /g, "_") ? "selected" : ""
                                                        }
                                                        onClick={() => handleButtonClick("furnishedType", type.toUpperCase().replace(/ /g, "_"))}
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* Parking */}
                                <div className="filter-section">
                                    <label>Parking*</label>
                                    <div className="selection-box" id="parking">
                                        {["No Parking", "Bike Parking", "Car Parking", "Both"].map(
                                            (type) => (
                                                <div className="option" key={type}>
                                                    <input
                                                        type="button"
                                                        value={type}
                                                        data-value={type.toLowerCase().replace(" ", "-")}
                                                        className={
                                                            selectedValues["parking"] === type.toUpperCase().replace(/ /g, "_") ? "selected" : ""
                                                        }
                                                        onClick={() => handleButtonClick("parking", type.toUpperCase().replace(/ /g, "_"))}
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* Open Parking */}
                                <div className="filter-section">
                                    <label>Open Parking*</label>
                                    <div className="selection-box" id="open-parking">
                                        {["0", "1", "2", "3", "4", "5", "6"].map((number) => (
                                            <div className="option" key={number}>
                                                <input
                                                    type="button"
                                                    value={number}
                                                    data-value={number}
                                                    className={
                                                        selectedValues["openParking"] === number ? "selected" : ""
                                                    }
                                                    onClick={() => handleButtonClick("openParking", parseInt(number))}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>




                                {/* Built Up Area */}
                                <div className="filter-section">
                                    <label>BuiltUp Area</label>
                                    <div className="input-container">
                                        <input
                                            type="number"
                                            id="built-area"
                                            name="builtUpArea"
                                            placeholder="Enter BuiltUp Area"
                                            value={selectedValues.builtUpArea}
                                            onChange={(e) => handleChange(e, "property")}
                                        />
                                    </div>
                                </div>

                                {/* Carpet Area */}
                                <div className="filter-section">
                                    <label>Carpet Area*</label>
                                    <div className="input-container">
                                        <input
                                            type="number"
                                            id="carpet-area"
                                            name="carpetArea"
                                            placeholder="Enter Carpet Area"
                                            value={selectedValues.carpetArea}
                                            onChange={(e) => handleChange(e, "property")}
                                        />
                                    </div>
                                </div>
                            </>
                        )}




                        {(selectedPropertyType === "LAND") ? (
                            <div className="filter-section">
                                <label>Land Type*</label>
                                <div className="selection-box">
                                    {[
                                        "Commercial",
                                        "Agricultural",
                                        "Others",
                                    ].map((type) => (
                                        <div className="option" key={type}>
                                            <input
                                                type="button"
                                                value={type}
                                                className={
                                                    selectedValues["landType"] === type.toUpperCase().replace(/ /g, "_") ? "selected" : ""
                                                }
                                                onClick={() => handleButtonClick("landType", type.toUpperCase().replace(/ /g, "_"))}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (null)}
                        {(selectedPropertyType === "LAND") ? (null) : (

                            <div className="filter-section">
                                <label>RERA ID*</label>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        id="rera-id"
                                        name="reraId"
                                        placeholder="Enter RERA ID"
                                        value={selectedValues.reraId}
                                        onChange={(e) => handleChange(e, "property")}
                                    />
                                </div>
                            </div>
                        )}
                        {(selectedPropertyType === "OFFICE_SPACE" || selectedPropertyType === "COMMERCIAL_PROPERTIES") ? (null) : (
                            <>
                                <div className="filter-section">
                                    <label>BHK*</label>
                                    <div className="selection-box" id="bhk">
                                        {[
                                            "1 BHK",
                                            "2 BHK",
                                            "3 BHK",
                                            "4 BHK",
                                            "5 BHK",
                                            "6 BHK",
                                            "7 BHK",
                                            "8 BHK",
                                            "9 BHK",
                                            "10 BHK",
                                        ].map((type) => (
                                            <div className="option" key={type}>
                                                <input
                                                    type="button"
                                                    value={type}
                                                    className={
                                                        selectedValues["bhk"] === (type.split(" ")[0], 10) ? "selected" : ""
                                                    }
                                                    onClick={() => handleButtonClick("bhk", type.split(" ")[0], 10)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="filter-section">
                                    <label>Balcony*</label>
                                    <div className="selection-box" id="balcony">
                                        {["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((number) => (
                                            <div className="option" key={number}>
                                                <input
                                                    type="button"
                                                    value={number}
                                                    data-value={number}
                                                    className={
                                                        selectedValues["balcony"] === number ? "selected" : ""
                                                    }
                                                    onClick={() => handleButtonClick("balcony", number)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {(selectedPropertyType === "APARTMENT" || selectedPropertyType === "VILLA" || selectedPropertyType === "OFFICE_SPACE") ? (null) : (
                            <div className="filter-section">
                                <label>Area*</label>
                                <div className="input-container">
                                    <input
                                        type="number"
                                        id="total-area"
                                        name="area"
                                        placeholder="Enter total  Area"
                                        value={selectedValues.area}
                                        onChange={(e) => handleChange(e, "property")}
                                    />
                                </div>
                            </div>
                        )}
                        {(selectedPropertyType === "INDEPENDENT_HOUSE" || selectedPropertyType === "LAND") ? (null) : (
                            <div className="filter-section">
                                <label>Maintainance Charges*</label>
                                <div className="input-container">
                                    <input
                                        type="number"
                                        id="maintenance-charges"
                                        name="maintainanceCharges"
                                        placeholder="Enter Maintainance Charges"
                                        value={selectedValues.maintainanceCharges}
                                        onChange={(e) => handleChange(e, "property")}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Remaining Fields Common to All Property Types */}
                        {/* Possession Date */}
                        <div className="filter-section">
                            <label>Possession Date*</label>
                            <div className="date-picker">
                                <input
                                    type="date"
                                    id="possession-date"
                                    name="possessionDate"
                                    value={selectedValues.possessionDate}
                                    onChange={(e) => handleChange(e, "property")}
                                />
                            </div>
                        </div>

                        {/* Cost */}
                        <div className="filter-section">
                            <label>Cost*</label>
                            <div className="input-container">
                                <input
                                    type="number"
                                    id="cost"
                                    name="cost"
                                    placeholder="Enter Cost"
                                    value={selectedValues.cost}
                                    onChange={(e) => handleChange(e, "property")}
                                />
                            </div>
                        </div>

                        {/*  */}


                        {/* Brokerage Charges */}
                        <div className="filter-section">
                            <label>Do you charge brokerage ?*</label>
                            <div className="selection-box">
                                {["Yes", "No"].map((type) => (
                                    <div className="option" key={type}>
                                        <input
                                            type="button"
                                            value={type}
                                            className={
                                                selectedValues["brokerageCharges"] === type.toUpperCase().replace(/ /g, "_")
                                                    ? "selected"
                                                    : ""
                                            }
                                            onClick={() => handleButtonClick("brokerageCharges", type.toUpperCase().replace(/ /g, "_"))}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Property Address */}
                        <div className="filter-section">
                            <label>Property Address*</label>
                            <div className="input-container">
                                <input
                                    type="text"
                                    id="property-address"
                                    name="propertyAddress"
                                    placeholder="Enter Property Address"
                                    value={selectedValues.propertyAddress}
                                    onChange={(e) => handleChange(e, "property")}
                                />
                            </div>
                        </div>



                        {/* Property Description */}
                        <div className="filter-section">
                            <label>Property Description*</label>
                            <div className="input-container">
                                <textarea
                                    id="property-description"
                                    name="propertyDescription"
                                    placeholder="Enter Property Description"
                                    value={selectedValues.propertyDescription}
                                    onChange={(e) => handleChange(e, "property")}
                                />
                            </div>
                        </div>

                        {/* Property Location */}
                        <div className="filter-section">
                            <label>Property Location*</label>
                            <div className="input-container">
                                <input
                                    type="text"
                                    id="property-location"
                                    name="propertyLocation"
                                    placeholder="Enter Property Location"
                                    value={selectedValues.propertyLocation}
                                    onChange={(e) => handleChange(e, "property")}
                                />
                            </div>
                        </div>

                        {/* City */}
                        <div className="filter-section">
                            <label>City*</label>
                            <div className="input-container">
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    placeholder="Enter City"
                                    value={selectedValues.city}
                                    onChange={(e) => handleChange(e, "property")}
                                />
                            </div>
                        </div>



                        {/* State */}
                        <div className="filter-section">
                            <label>State*</label>
                            <div className="input-container">
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    placeholder="Enter State"
                                    value={selectedValues.state}
                                    onChange={(e) => handleChange(e, "property")}
                                />
                            </div>
                        </div>

                        {/* Images */}
                        <div className="filter-section">
                            <label>Images*</label>
                            <div className="input-container">
                                <input
                                    type="file"
                                    id="images"
                                    name="images"
                                    multiple
                                    onChange={(e) => handleFileChange(e, "images")}
                                />
                            </div>
                        </div>

                        {/* Videos */}
                        <div className="filter-section">
                            <label>Videos*</label>
                            <div className="input-container">
                                <input
                                    type="file"
                                    id="videos"
                                    name="videos"
                                    multiple
                                    onChange={(e) => handleFileChange(e, "videos")}
                                />
                            </div>
                        </div>
                        <button type="submit" className="submit-button">
                            SUBMIT
                        </button>
                        <button type="button" className="seller-form-clear-button" onClick={handleClear}>
                            CLEAR
                        </button>
                    </div>
                </div>
            </form>
            {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
        </>
    );
};

export default SellerForm;
