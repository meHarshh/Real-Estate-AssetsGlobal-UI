import React, { useState, useEffect } from 'react';
import bg from '../Images/Images/leohoho-MCDtGUwHD7M-unsplash.jpg';
import { useInView } from 'react-intersection-observer';
import './Statistics.css';
import Aos from "aos";
import "aos/dist/aos.css";
const Statistics = () => {
  const [prop, setProp] = useState(0);
  const [dev, setDev] = useState(0);
  const [proj, setProj] = useState(0);
  const [cust, setCust] = useState(0);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      const animateCount = (setValue, endValue) => {
        let start = 0;
        const duration = 2000; // 2 seconds
        const increment = endValue / (duration / 10);

        const counter = setInterval(() => {
          start += increment;
          if (start >= endValue) {
            clearInterval(counter);
            setValue(endValue);
          } else {
            setValue(Math.ceil(start));
          }
        }, 10);
      };

      animateCount(setProp, 1255);
      animateCount(setDev, 48);
      animateCount(setProj, 165);
      animateCount(setCust, 84);
    }
  }, [inView]);

  return (
    <div className="stat_container">
      <div
        className="stat_background"
        style={{ backgroundImage: `url(${bg})`, width: '100%', height:'100%',backgroundSize: 'cover' }}
      >
        <div className="stat_image_overlay">
          <div className="stat_title" data-aos="zoom-out">
            <h1 className={`stat_title ${inView ? 'tracking-in-contract-bck' : ''}`}>A comprehensive <span className='stat-title-span'>solution for</span> all your <span className='stat-title-span'>global property needs!</span></h1>
          </div>
          <div className="stat_values" data-aos="fade-up">
            <div className="stat_card" ref={ref}>
              <h3>{prop}</h3>
              <p>Properties</p>
            </div>
            <div className="stat_card">
              <h3>{dev}</h3>
              <p>Developers</p>
            </div>
            <div className="stat_card">
              <h3>{cust}</h3>
              <p className='statistics-happy-p-tag'>Happy customers</p>
            </div>
            <div className="stat_card">
              <h3>{proj}</h3>
              <p>Projects</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
