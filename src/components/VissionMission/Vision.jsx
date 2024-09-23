import React from 'react';
import './vision.css';
import vision from "../../Images/visionmision/vision (2).png"
import mision from "../../Images/visionmision/mission (2).png"
import goal from "../../Images/visionmision/mission.png"
import Aos from "aos";
import "aos/dist/aos.css";// Importing the CSS file
const OurVision = () => {
  return (
    <div className='vision-container'>
      <div className='vision-left-side' data-aos="fade-right">
        <div className='vision-overlay'>
          <div className='vision-section vision-vision'>
            <div className='circle' ><span className='circle-title' ><img src={vision} /></span></div>
            <p className='hidden'>Vision</p> {/* Hidden but accessible for screen readers */}
          </div>
          <div className='vision-section vision-mission'>
            <div className='circle'><span className='circle-title' ><img src={mision} /></span></div>
            <p className='hidden'>Mission</p> {/* Hidden but accessible for screen readers */}
          </div>
          <div className='vision-section vision-goals'>
            <div className='circle'><span className='circle-title'><img src={goal} /></span></div>
            <p className='hidden'>Goals</p> {/* Hidden but accessible for screen readers */}
          </div>
        </div>
      </div>
      <div className='vision-right-side'>
        <div data-aos="fade-up">
          <h3 className='vision-right-title'>Our Vision</h3>
          <p>Our vision is to become the top real estate platform, helping people and businesses find, invest in, and grow with the best property opportunities worldwide.</p>
        </div>
        <div data-aos="fade-up">
          <h3 className='vision-right-title'>Our Mission</h3>
          <p>Our mission is to simplify real estate transactions by connecting buyers, sellers, and investors with great deals and delivering excellent customer service.</p>
        </div>
        <div data-aos="fade-up">
          <h3 className='vision-right-title'>Our Goals</h3>
          <p>
          Our goals are to expand globally, enhance user experience, ensure secure transactions, provide exceptional customer support, and promote sustainability.</p>
        </div>
      </div>
    </div>
  );
};

export default OurVision;
