// import { useEffect, useState } from "react";
// import "../pages/BecomeSeller.css";

// const keyPoints = [
//   { title: "Zero Brokerage", desc: " Keep 100% of your sale." },
//   { title: "Exclusive Seller Perks", desc: "Enjoy unbeatable offers and benefits." },
//   { title: "Expert Assistance", desc: "Professional guidance every step of the way." },
//   { title: "Massive Reach", desc: "Connect with over 550,000 potential buyers." }
// ]

// const renderKeyPoints = () =>
//   keyPoints.map((item, index) => (
//     <div
//       key={index}
//       className="key_points"
//     >
//       <h2
//         style={{ color: "#ff6600", fontSize: "28px", letterSpacing: "1px" }}
//       >
//         {item.title}
//       </h2>
//       <p style={{ fontSize: "18px", fontWeight: "bold" }}>{item.desc}</p>
//     </div>
//   ));
// const BecomeSellerAnemation = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const elements = document.querySelectorAll('.key_points');
//     const animationDuration = 2000; // Duration of the animation in milliseconds
//     const intervalDuration = 1500; // Time between animations in milliseconds

//     // Function to handle the animation
//     const animateElement = (index) => {
//       elements[index].style.display = 'block'; // Ensure the element is visible
//       elements[index].classList.add('animate__animated', 'animate__rotateInUpRight');

//       // Remove animation class after animation ends
//       elements[index].addEventListener('animationend', () => {
//         elements[index].classList.remove('animate__rotateInUpRight');
//         elements[index].style.display = 'none'; // Hide the element after the animation ends
//       }, { once: true }); // Use { once: true } to remove the event listener after it's called
//     };

//     // Hide all elements initially
//     elements.forEach(el => el.style.display = 'none');

//     // Initial animation
//     animateElement(currentIndex);

//     // Set up the interval to loop through elements
//     const intervalId = setInterval(() => {
//       elements[currentIndex].style.display = 'none'; // Hide the current element
//       setCurrentIndex((prevIndex) => {
//         const newIndex = (prevIndex + 1) % elements.length;
//         animateElement(newIndex); // Animate the next element
//         return newIndex;
//       });
//     }, intervalDuration);

//     // Clean up the interval on component unmount
//     return () => clearInterval(intervalId);
//   }, [currentIndex]);

//   return (
//     <>
//       {renderKeyPoints()}
//     </>
//   )
// }
// export default BecomeSellerAnemation


import { useEffect, useState } from "react";
import "../pages/BecomeSeller.css";

const keyPoints = [
  { title: "Zero Brokerage", desc: " Keep 100% of your sale." },
  { title: "Exclusive Seller Perks", desc: "Enjoy unbeatable offers and benefits." },
  { title: "Expert Assistance", desc: "Professional guidance every step of the way." },
  { title: "Massive Reach", desc: "Connect with over 10,000 potential buyers." }
];

const BecomeSellerAnemation = () => {
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

  return (
    <>
      {keyPoints.map((item, index) => (
        <div key={index} className="key_points">
          <h2 className='animation-heading-h2' style={{ color: "#7ab945", margin: '0', textShadow: "2px 2px 2px #071739, 0 0 4em rgba(7, 7, 7, 0.3), 0 0 0.5em black" }}>
            {item.title}
          </h2>
          <p className='animation-heading-p' style={{ margin: '0.5rem', fontWeight: "800", color: "#7ab945", textShadow: "2px 2px 2px #071739, 0 0 4em rgba(7, 7, 7, 0.3), 0 0 0.8em black" }}>{item.desc}</p>
        </div>
      ))}
    </>
  );
};

export default BecomeSellerAnemation;
