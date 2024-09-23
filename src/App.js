import React, { useState, useEffect } from "react";
import "./App.css";
import AllRoutes from "./components/AllRoutes";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PopupAllPgForm from "./components/PopupAllPgForm";
import ContactForm from "./components/AboutUsContactForm";
import PropertyFetchAreaWise from "./components/propertyFetchAreaWise/PropertyFetchAreaWise";
import { ComparisonProvider } from "./components/context/comparisionContext";
import { CityProvider } from "./components/context/CityContext";
function App() {
  const [showPopupModal, setShowPopupModal] = useState(false);
  const [city, setCity] = useState("Bengaluru"); // Default city

  useEffect(() => {
    // Show the modal after 10 seconds
    const initialTimer = setTimeout(() => {
      setShowPopupModal(true);

      // After initial display, set up an interval to show the modal every 1 minute
      const intervalTimer = setInterval(() => {
        setShowPopupModal(true);
      }, 360000); // 60000 milliseconds = 1 minute

      // Clear the interval on component unmount
      return () => clearInterval(intervalTimer);
    }, 50000); // 10000 milliseconds = 10 seconds

    // Clear the initial timeout on component unmount
    return () => clearTimeout(initialTimer);
  }, []); // Empty dependency array ensures this effect runs only once

  const closePopupModal = () => {
    setShowPopupModal(false);
  };

  return (
    <div className="App">
      <CityProvider>
        <ComparisonProvider>
          <Navbar city={city} />
          <AllRoutes setCity={setCity} />
          <Footer />
          {showPopupModal && (
            <PopupAllPgForm onClose={closePopupModal}>
              <ContactForm />
            </PopupAllPgForm>
          )}
        </ComparisonProvider>
      </CityProvider>
    </div>
  );
}

export default App;
