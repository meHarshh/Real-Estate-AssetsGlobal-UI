import React from "react";
import "./Happycustomers.css";
import Aos from "aos";
import "aos/dist/aos.css";
const embedUrl =` https://www.youtube.com/embed/ec_fXMrD7Ow?start=2`;
// https://www.youtube.com/watch?v=ec_fXMrD7Ow&t=2s

const HappyCustomers = () => {
  return (
    <div className="happy-clients-container">
      <div className="background-overlay"></div>
      <div className="content-container">
        <div className="video-container" data-aos="fade-right">
          <iframe
            className="youtube-player"
            src={embedUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video player"
          ></iframe>
        </div>
        <div className="text-container" data-aos="fade-left">
          <h2> 😄 Our Happy Clients 😄</h2>
          <p>
            People of all backgrounds have been struggling with the answer to this question for centuries, and for almost as long, leaders in real estate property dealings have been pondering the secret to customer happiness.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HappyCustomers;
