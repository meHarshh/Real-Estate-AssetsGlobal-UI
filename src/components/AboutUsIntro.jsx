import './AboutUsIntro.scss'
import React, { useEffect, useState } from 'react';
import { GoShieldCheck } from "react-icons/go";
// import introBgImg from '../../assets/images/introBGImg.jpg'
import sampleVideo from '../videos/samplevideo1.mp4'

const subTitles = ['Trusted by 5,000+ Families', 'Global Presence in 30+ Cities', '100+ Employees', 'Avail Zero Brokerage']
const propertyShowVideo = `https://www.youtube.com/embed/V8vmHd2XvT8?autoplay=1&mute=1`;


const IntroPage = () => {


    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {
        const elements = document.querySelectorAll('.sub-title');
        const intervalDuration = 1800; // Time between animations in milliseconds

        // Function to handle the animation
        const animateElement = (index) => {
            elements[index].style.display = 'block'; // Ensure the element is visible
            elements[index].classList.add('rotate-90-right-cw');

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
    }, [currentIndex]); // Ensure useEffect updates when currentIndex changes


    const renderSubTitles = () =>
        subTitles.map((subTitle, index) => (
            <div className='render-subtitles' key={index}>
                <h2 className="sub-title ">{subTitle}</h2>
            </div>
        ));
    return (
        <div className='intro-container'>

            <section className="intro-heading">
                <div className="intro-content">
                    <section className='main-heading'>
                        <h2>India's Most Trusted
                            <br />
                            Real Estate Expert
                        </h2>
                    </section>
                    <section className='icon-heading'>
                        <GoShieldCheck className='icon h-icon' />
                        <h3>Your Shield in Real Estate Deals</h3>
                    </section>
                </div>
                <div className="slidingVertical">
                    {renderSubTitles()}
                </div>
            </section>
            <section className="intro-video-container">
                {/* <video controls autoPlay={false} width={500} >
                    <source src={sampleVideo} type='video/mp4' />
                </video> */}

                <iframe className='intro-prop-video' src={propertyShowVideo} frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="YouTube video player"  ></iframe>
            </section>

            {/* <section class="video-container">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/GHZBa_R93ag" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </section> */}

        </div>
    )
}
export default IntroPage