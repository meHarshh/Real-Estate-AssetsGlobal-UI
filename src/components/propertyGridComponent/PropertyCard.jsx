import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PopupAllPgForm from "../PopupAllPgForm";
import ContactForm from "../AboutUsContactForm";
import { useComparison } from "../context/comparisionContext"; // Importing the context

const responsive = {
  0: { items: 1 },
  568: { items: 1 },
  1024: { items: 1 },
};

const PropertyCard = ({ property = {}, maxWidth = "470px" }) => {
  const [toggle, setToggle] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const navigate = useNavigate();
  const { selectedProperties, addProperty, isPropertySelected } = useComparison(); // Use the comparison context

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleViewProperty = () => {
    const propertySlug = (property.name || "").replace(/\s+/g, "-").toLowerCase();
    navigate(`/singleProperty/${propertySlug}`, { state: { property } });
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % propImages.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + propImages.length) % propImages.length);
  };

  const handleClick = () => {
    setShowPopup(true);
  };

  const closePopupModal = () => {
    setShowPopup(false);
  };

  const handleCheckboxChange = () => {
    addProperty(property.id); // Add/remove property to/from comparison stack
  };

  const propImages = (property.images || []).map((img, index) => (
    <div className="prop-grid-property-card-image" style={{ borderRadius: "10px" }} key={index}>
      <img src={img} alt="Property" onClick={handleViewProperty} />
    </div>
  ));

  return (
    <div className="property-card-wrapper" style={{ maxWidth }}>
      <div className="property-card-header">
        <AliceCarousel
          mouseTracking
          items={propImages}
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
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "2px solid gray",
            paddingBottom: "2px",
          }}
        >
          <div onClick={handleViewProperty} style={{ display: "flex", flexDirection: "column", marginTop: "-25px", width: "80%" }}>
            <h3 className="property-card-prop-name" style={{whiteSpace:"nowrap",overflow:"hidden", textOverflow:"ellipsis"}}>
              {property.name || "Property Name"}
            </h3>
            <div className="prop-card-loc-p-div">
              <p className="prop-card-loc" style={{ textAlign: "left", marginTop: "-.7rem", whiteSpace:"nowrap",overflow:"hidden", textOverflow:"ellipsis" }}>
                Located at {property.propertyLocation || "Location"}, {property.city || "City"}
              </p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FavoriteIcon
              color={toggle ? "error" : "disabled"}
              sx={{ fontSize: "25px", cursor: "pointer" }}
              onClick={handleToggle}
            />
          </div>
        </div>

        <div onClick={handleViewProperty} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h4>Configurations</h4>
          {property.bhk && (
            <p>
              <b style={{ color: "black" }}>BHK:</b> {property.bhk}
            </p>
          )}
        </div>

        <div
          onClick={handleViewProperty}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            // border:"1px solid blue",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <p style={{ fontWeight: "bold", color: "black",margin:"0" }}>Builtup Area</p>
            <span>
            {property.builtUpArea === "On request" ? "On Request" : `${property.builtUpArea || "N/A"} sqft`}
            </span>
            
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <p style={{ fontWeight: "bold", color: "black", margin: "0", textAlign: "right" }}>Carpet Area</p>
            <span>
            {property.carpetArea === "On request" ? "On Request" : `${property.carpetArea || "N/A"} sqft`}
            </span>
          </div>
        </div>

        <p
          onClick={handleViewProperty}
          style={{
            display: "flex",
            alignItems: "baseline",
            color: "black",
            fontSize: "20px",
            marginTop: "1rem",
            fontWeight: "bold",
          }}
        >
          {!property.cost.includes("AED") && property.cost !== "Collecting EOI" && "INR "}
          {property.cost || "0"}&nbsp;
          {property.cost !== "Collecting EOI" && !property.cost.includes("AED") && (
            <span style={{ fontWeight: "normal", fontSize: "12px" }}>
              Onwards
            </span>
          )}
        </p>
        <div className="card-button-container">
          <button className="card-view-button" onClick={handleViewProperty}>
            View
          </button>
          <button className="contact-button" onClick={handleClick}>
            Contact
          </button>
        </div>
        {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginTop: "1rem" }}>
  <label style={{ whiteSpace: "nowrap",textAlign:"right",marginLeft:"-3rem" }}>
    <input
    style={{marginLeft:"7rem",marginRight:"-4rem"}}
      type="checkbox"
      checked={isPropertySelected(property.id)}
      onChange={handleCheckboxChange}
    />
    Add to Compare
  </label>
</div> */}


      </div>

      {showPopup && (
        <PopupAllPgForm onClose={closePopupModal}>
          <ContactForm />
        </PopupAllPgForm>
      )}
    </div>
  );
};

export default PropertyCard;
