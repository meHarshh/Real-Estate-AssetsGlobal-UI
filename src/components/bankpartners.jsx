import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./bankparters.css"; // Import your CSS file for styling
import one from "../Images/bankparters/1.jpeg"
import two from "../Images/bankparters/2.jpeg"
import three from "../Images/bankparters/3.jpeg"
import four from "../Images/bankparters/4.jpeg"
import five from "../Images/bankparters/5.jpeg"
import six from "../Images/bankparters/6.jpeg"
// import seven from "../Images/bankparters/"

const Banks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (e) => {
    setCurrentIndex(e.item);
  };

  const handlePrevClick = () => {
    const newIndex = currentIndex - 1;
    if (newIndex >= 0) {
      setCurrentIndex(newIndex);
    }
  };

  const handleNextClick = () => {
    const newIndex = currentIndex + 1;
    if (newIndex < items.length) {
      setCurrentIndex(newIndex);
    }
  };

  const handleOnDragStart = (e) => e.preventDefault();

  const items = [
    one,two,three,four,five,six
  ];

  const slides = items.map((item, index) => (
    
    <img style={{borderRadius:"10px"}}
      key={index}
      src={item}
      width={150}
      onDragStart={handleOnDragStart}
      className="yours-custom-class"
      alt={`Slide ${index + 1}`}
    />
  ));

  return (
    <div className="clients-carousel">
      <h1>Our Bank Partners</h1>
      <AliceCarousel
        mouseTrackingEnabled
        items={slides}
        startIndex={currentIndex}
        onSlideChanged={handleSlideChange}
        responsive={{
          0: { items: 1 },
          600: { items: 3 },
          1024: { items: 5 },
        }}
        disableButtonsControls
        // disableDotsControls
        duration={400} // Adjust duration for the slide transition (in milliseconds)
      />
      {/* <div className="carousel-navigation">
        <button
          className="prev-button"
          onClick={handlePrevClick}
          style={{ display: currentIndex === 0 ? "none" : "block" }}
        >
          Previous
        </button>
        <button
          className="next-button"
          onClick={handleNextClick}
          style={{
            display:
              currentIndex + 5 >= items.length ? "none" : "block",
          }}
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default Banks;
