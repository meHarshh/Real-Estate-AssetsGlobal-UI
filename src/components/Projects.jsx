import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import "./Projects.css";  // Import the CSS file

import mumbai from "../Images/cities/mumbai.jpg";
import pune from "../Images/cities/pune2.jpg";
import bangalore from "../Images/cities/banglore.webp";
import delhi from "../Images/cities/delhi.jpg";
import kochi from "../Images/cities/kochi.jpg";
import chennai from "../Images/cities/chennai.avif";
import guru from "../Images/cities/gurugram.jpg";
import kolkatta from "../Images/cities/kolkata.jpg";
import noida from "../Images/cities/noida.jpg";
import lucknow from "../Images/cities/lucknow.jpg";
import hyder from "../Images/cities/hydrabad.jpg";
import dubai from "../Images/cities/dubai.webp";

const Projects = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/propertyDetailsJson/PropertDetailsJson.json');
        const data = await response.json();

        const cityCounts = {};
        data.forEach((property) => {
          const cityName = property.city;
          if (cityCounts[cityName]) {
            cityCounts[cityName]++;
          } else {
            cityCounts[cityName] = 1;
          }
        });

        const cityData = [
          { src: bangalore, name: "Bengaluru", count: cityCounts["Bengaluru"] || 0 },
          { src: chennai, name: "Chennai", count: cityCounts["Chennai"] || 0 },
          { src: delhi, name: "New Delhi", count: cityCounts["New Delhi"] || 0 },
          { src: mumbai, name: "Mumbai", count: cityCounts["Mumbai"] || 0 },
          { src: pune, name: "Pune", count: cityCounts["Pune"] || 0 },
          { src: guru, name: "Gurugram", count: cityCounts["Gurugram"] || 0 },
          { src: noida, name: "Noida", count: cityCounts["Noida"] || 0 },
          { src: lucknow, name: "Lucknow", count: cityCounts["Lucknow"] || 0 },
          { src: hyder, name: "Hyderabad", count: cityCounts["Hyderabad"] || 0 },
          { src: dubai, name: "Dubai", count: cityCounts["Dubai"] || 0 },
          { src: kochi, name: "Kochi", count: cityCounts["Kochi"] || 0 },
          { src: kolkatta, name: "Kolkata", count: cityCounts["Kolkata"] || 0 },
        ];

        setCities(cityData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching property data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chunkedCities = cities.map((city) => (
    <Link to={`/propertyGrid/${city.name}`} key={city.name}>
      <div className="project-card">
        <div className="project-card-body" style={{ backgroundImage: `url(${city.src})` }}>
          <div className="project-card-overlay"></div> {/* Dark overlay */}
          <img src={city.src} alt={city.name} className="project-card-img" />
          <div className="project-card-info">
            <h5>{city.name}</h5>
          </div>
          <div className="project-card-count">
            {city.count ? <p>{city.count} Properties</p> : <p>Coming Soon</p>}
          </div>
        </div>
      </div>
    </Link>
  ));

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,  // Enable autoplay
    autoplaySpeed: 2000,  // Speed of autoplay
    responsive: [
      {
        breakpoint: 1960,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="project-container">
      <div className="project-carousel">
        <Slider {...settings}>
          {chunkedCities}
        </Slider>
      </div>
    </div>
  );
};

export default Projects;
