
import { useEffect, useState } from "react";
import "../pages/BecomeSeller.css";
import './HomeLoanAneme.scss';

const keyPoints = [
  { title: "Personalized Assistance", desc: "Tailored support." },
  { title: "Future-Oriented", desc: "Long-term security." },
  { title: "Achieving Dreams", desc: "Reachable goals" },
  { title: "Expert Guidance", desc: "Professional advice" }
];

const HomeLoanAnemation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const elements = document.querySelectorAll('.key_points');
    const intervalDuration = 1800; // Time between animations in milliseconds

    // Function to handle the animation
    const animateElement = (index) => {
      elements[index].style.display = 'block'; // Ensure the element is visible
      elements[index].classList.add('rotate-90-right-cw'); // Apply the animation class

      // Remove animation class after animation ends
      elements[index].addEventListener('animationend', () => {
        elements[index].classList.remove('rotate-90-right-cw');
        elements[index].style.display = 'none'; // Hide the element after the animation ends
      }, { once: true }); // Use { once: true } to remove the event listener after it's called
    };

    // Hide all elements initially
    elements.forEach(el => el.style.display = 'none');

    // Initial animation
    animateElement(currentIndex);

    // Set up the interval to loop through elements
    const intervalId = setInterval(() => {
      elements[currentIndex].style.display = 'none'; // Hide the current element
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % elements.length;
        animateElement(newIndex); // Animate the next element
        return newIndex;
      });
    }, intervalDuration);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const renderKeyPoints = () =>
    keyPoints.map((item, index) => (
      <div key={index} className="key_points">
        <h2 className="loan-animation-heading-h2" style={{ color: "#7ab945", margin: '0', textShadow: "2px 2px 2px #071739, 0 0 2em rgba(7, 7, 7, 0.3), 0 0 0.4em black" }}>
          {item.title}
        </h2>
        <p className="loan-animation-heading-p" style={{ margin: '0.5rem', fontWeight: "800", color: "#7ab945", textShadow: "2px 2px 2px #071739, 0 0 2em rgba(7, 7, 7, 0.3), 0 0 0.4em black" }}>
          {item.desc}
        </p>
      </div>
    ));

  return (
    <>
      {renderKeyPoints()}
    </>
  );
};

export default HomeLoanAnemation;
