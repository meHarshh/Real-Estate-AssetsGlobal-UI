import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { Helmet } from "react-helmet";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useLocation } from "react-router-dom";
import "./Home.css";
import Aos from "aos";
import "aos/dist/aos.css";
import home from "../Images/Images/building.jpg";
import home2 from "../Images/Images/eugene-chystiakov-OflP2eE5pnU-unsplash.jpg";
import home3 from "../Images/Images/tobias-wilden-4453DIQWtsQ-unsplash.jpg";
import bangalore from "../Images/cities/banglore.webp";
import delhi from "../Images/cities/delhi.jpg";
import dubai from "../Images/cities/dubai.webp";
import chennai from "../Images/cities/chennai.avif";
import pune from "../Images/cities/pune2.jpg";
import mumbai from "../Images/cities/mumbai.jpg";
import kochi from "../Images/cities/kochi.jpg";
import kolkata from "../Images/cities/kolkata.jpg";
import noida from "../Images/cities/noida.jpg";
import hyderabad from "../Images/cities/hydrabad.jpg";
import lucknow from "../Images/cities/lucknow.jpg";
import gurugram from "../Images/cities/gurugram2.webp";
import ServicesHome from "../components/ServicesHome";
import Clients from "../components/Clients";
import ContactForm from "../components/Contactform";
import Projects from "../components/Projects";
import Statistics from "../components/statistics";
import HappyCustomers from "../components/HappyCustomers";
import Testimonials from "../components/Testimonials";
import RecomendedProperties from "../components/RecommendedProperties";
import HomeFilter from "../components/HomeFilter";
import NewlyAddedProps from "../components/NewlyAddedProps";
import Facilities from "../components/Facilities";
import AssetsGlobalFAQs from "../components/Faqs/faq";
import OurVision from "../components/VissionMission/Vision";
import FeaturedProjects from "../components/FeaturedProjects/FeaturedProjects";
import PropertyFetchAreaWise from "../components/propertyFetchAreaWise/PropertyFetchAreaWise";

import { useCity } from "../components/context/CityContext";
import TopLocalities from "../components/topLocalities/TopLocalities";


const cities = [
  { title: "Bengaluru", url: bangalore },
  { title: "Chennai", url: chennai },
  { title: "New Delhi", url: delhi },
  { title: "Pune", url: pune },
  { title: "Gurugram", url: gurugram },
  { title: "Hyderabad", url: hyderabad },
  { title: "Kochi", url: kochi },
  { title: "Kolkata", url: kolkata },
  { title: "Lucknow", url: lucknow },
  { title: "Mumbai", url: mumbai },
  { title: "Noida", url: noida },
  { title: "Dubai", url: dubai },
];

Aos.init();

const Home = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [city, setCity] = useState("Bengaluru");
  const { city, setCity } = useCity(); // Use city context
  const [currentSlide, setCurrentSlide] = useState(0);
  const [location, setLocation] = useState({
    city: "Bengaluru",
    subCity: "",
  });

  const newlyAddedPropsRef = useRef(null);


  const slides = useMemo(
    () => [
      {
        image: home,
        title: (
          <h1
            key={0}
            className="home-page-title"
            data-aos="zoom-in-up"
            style={{
              fontFamily: "montserrat",
              fontWeight: "bolder",
              letterSpacing: ".2rem",
            }}
          >
            Your <span className="home_span">Partner</span> In Amplifying{" "}
            <span className="home_span">Asset Returns</span>
          </h1>
        ),
      },
      {
        image: home2,
        title: (
          <h1
            key={1}
            className="home-page-title"
            data-aos="zoom-in-up"
            style={{
              fontFamily: "montserrat",
              fontWeight: "bolder",
              letterSpacing: ".2rem",
            }}
          >
            Leading <span className="home_span">in Real Estate </span> Services{" "}
            <span className="home_span">Across India</span>
          </h1>
        ),
      },
      {
        image: home3,
        title: (
          <h1
            key={2}
            className="home-page-title"
            data-aos="zoom-in-up"
            style={{
              fontFamily: "montserrat",
              fontWeight: "bolder",
              letterSpacing: ".2rem",
            }}
          >
            India's <span className="home_span">Top-notch</span> Real Estate{" "}
            <span className="home_span">Service Providers</span>
          </h1>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleEnquireClick = useCallback(() => {
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const openPopup = useCallback((e) => {
    e.preventDefault();
    setIsPopupOpen(true);
  }, []);

  const closePopup = useCallback(() => {
    setIsPopupOpen(false);
  }, []);

  const handlePopupClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const handleTitleClick = useCallback((title) => {
    setCity(title);
    setLocation((prevLocation) => ({
      ...prevLocation,
      city: title,
    }));
    closePopup();
  }, [closePopup, setCity]);

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    const subCityValue = e.target.elements.subCity.value;
    setLocation((prevLocation) => ({
      ...prevLocation,
      city: city,
      subCity: subCityValue,
    }));

    if (newlyAddedPropsRef.current) {
      newlyAddedPropsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [city]);
  console.log(location)

  const preventEnterKey = useCallback((e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.form.requestSubmit(); // Trigger the form submission manually
    }
  }, []);

  const currentSlideData = slides[currentSlide];

  return (
    <div className="main-home-container">
      <Helmet>
        <title>Elevate Your Living Experience with AssetsGlobal Homes</title>
        <meta
          name="description"
          content="Elevate your lifestyle with AssetsGlobal Homes. Discover premier properties and redefine luxury living. Your perfect home awaits in our exclusive real estate collection."
        />
        <meta name="keywords" content="AssetsGlobal real estate" />
      </Helmet>
      <div
        className="home_image_container"
        style={{
          backgroundImage: `url(${currentSlideData.image})`,
        }}
      >
        <div className="home_page_image_overlay">
          <div className="home_page_title">
            <div className="home-page-title-text">
              {currentSlideData.title}
            </div>
            <div className="home-page-filter_hero_div">
              <form className="home-page-filter_div" onSubmit={handleFormSubmit}>
                <button
                  id="home-page-search_location"
                  className="home-page-search_location"
                  onClick={openPopup}
                  onKeyDown={preventEnterKey}
                >
                  <FmdGoodIcon sx={{ fontSize: 25 }} />
                  {location.city}
                </button>
                {isPopupOpen && (
                  <div className="popup" onClick={closePopup}>
                    <div className="popup-content" onClick={handlePopupClick}>
                      <span className="close" onClick={closePopup}>
                        &times;
                      </span>
                      <h2>Select a City</h2>
                      <div className="image-options">
                        {cities.map((item, index) => (
                          <div
                            key={index}
                            onClick={() => handleTitleClick(item.title)}
                          >
                            <div
                              className="city-image"
                              style={{
                                backgroundImage: `url(${item.url})`,
                              }}
                            >
                              <h5>{item.title}</h5>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div className="search_container">
                  <SearchIcon className="search_icon" sx={{ fontSize: 25 }} />
                  <input
                    className="search_input"
                    type="text"
                    name="subCity"
                    placeholder="Search a Locality, Property or Developer"
                    onKeyDown={preventEnterKey}
                  />
                </div>
                <button className="home_page_search_submit" type="submit">
                  Find
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* -----------featured properties */}

      {/* <div data-aos="fade-up" className="Property_container" ref={newlyAddedPropsRef}>
        <h2>Featured Projects in {location.city} </h2>
        <Link to={`/propertyGrid/${location.city}`} className="view-all-prop-link">
          View all properties
        </Link>
        <FeaturedProjects city={location.city} subCity={location.subCity} />
      </div> */}
      {/* -------------------most recent properties------------------ */}
      <div data-aos="fade-up" className="Property_container" ref={newlyAddedPropsRef}>
        <h2>New Projects in {location.city}</h2>
        <Link to={`/propertyGrid/${location.city}`} className="view-all-prop-link">
          View all properties
        </Link>
        <NewlyAddedProps city={location.city} subCity={location.subCity} />
      </div>
      {/* -------------------property Recommendation------------------ */}
      <div data-aos="fade-up" className="Property_container">
        <h2>Property Recommendations in {location.city}</h2>
        <Link to={`/propertyGrid/${location.city}`} className="view-all-prop-link">
          View all properties
        </Link>
        <RecomendedProperties city={location.city} subCity={location.subCity} />
      </div>

      {/* ------------------------projects----------------- */}

      <div data-aos="fade-up" className="Property_container">
        <div style={{ marginTop: "2rem" }}>
          <h2>
            Our Featured <b>Projects In</b>
          </h2>
        </div>
        <Projects />
      </div>

      {/* ------------------------Top Localities----------------- */}
      {/* <div data-aos="fade-up" className="Property_container">
        <TopLocalities />
      </div> */}



      {/* ------------------------Services----------------- */}
      <div data-aos="fade-up" className="Property_container">
        <div>
          <h2>End to End Real Estate Services Platform</h2>
        </div>
        <ServicesHome />
      </div>
      {/* ------------------------facilities----------------- */}
      <div data-aos="fade-up" className="Property_container">
        <div>
          <h2>Assets Global Prime Choices</h2>
        </div>
        <Facilities />
      </div>

      {/* ----------------------clients------------------------- */}

      <div data-aos="fade-up" className="Property_container">
        <Clients />
      </div>

      {/* ......................statistics------------------------- */}

      <div data-aos="fade-up" className="Property_container">
        {" "}
        <Statistics />
      </div>

      <div
        data-aos="fade-up"
        className="Property_container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <h2>Assets Global Free Consultation Service</h2>
        </div>
        <ContactForm />
      </div>

      <div
        data-aos="fade-up"
        className="Property_container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          {/* <h2>What our clients say</h2> */}
        </div>
        <OurVision />
      </div>


      <div
        className="Property_container"
        data-aos="fade-up"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <h2>What our clients say</h2>
        </div>
        <HappyCustomers />
      </div>

      <div
        data-aos="fade-up"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >

        <div
          className="Property_container">
          <h2>FAQs</h2>
        </div>
        <AssetsGlobalFAQs />
      </div>

      <div
        data-aos="fade-up"
        className="Property_container"
        id='testimonials'
      >
        <Testimonials />
      </div>
      <div
        data-aos="fade-up"
        className="Property_container">
        <PropertyFetchAreaWise />

      </div>

      {showModal && (
        <div className="home-page-modal-overlay">
          <div className="home-page-modal-content">
            <button className="home-page-close-button" onClick={closeModal}>
              &times;
            </button>
            <HomeFilter />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
