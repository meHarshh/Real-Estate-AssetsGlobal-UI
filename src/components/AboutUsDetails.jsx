import reachingTopImg from "../Images/AchievingGoals.png"
import "./AboutUsDetails.scss";

import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect } from "react";

const PropDetails = () => {

    useEffect(() => {
        Aos.init({ duration: 1000 }); // Remove `once: true` for continuous animations
        console.log('aos')
    }, []);



    return (
        <div className="main-prop-details">
            <section className="leftside">
                <div className="left-info">
                    <h1>What Are We Aiming for?</h1>
                    <p>At Assets Global, we aspire to redefine the real estate experience in India by offering expert guidance and innovative solutions.</p>
                    <p>We simplify the home buying process through advanced technology, industry expertise, and a dedication to customer satisfaction. Our mission is to become the trusted partner for individuals pursuing their dream homes, providing a seamless and fulfilling journey in the realm of real estate.
                    </p>
                </div>
                <div className="left-img">
                    <img src={reachingTopImg} alt="Image" />
                    <p className="left-img-text">

                        In 2024, Assets Global is achieving new heights, solidifying its position as a top leader in the real estate industry.
                    </p>
                </div>
            </section>
            <section className="rightside">
                <div className="cards">
                    <section className="cards-container1">
                        <div className='card1' data-aos='flip-right' >
                            <h2>200 +</h2>
                            <p>Happy customers feedback</p>
                        </div>
                        <div className='card2' data-aos='flip-up'>
                            <h2>5,000+</h2>
                            <p>Properties Managed</p>
                        </div>
                        <div className='card3' data-aos='flip-up'>
                            <h2>50+</h2>
                            <p>Developers In One Roof</p>
                        </div>
                    </section>
                    <section className="cards-container1">
                        <div className='card4' data-aos='flip-up'>
                            <h2>5+</h2>
                            <p>Offices in India, Dubai, and Many More in Coming Days</p>
                        </div>
                        <div className='card5' data-aos='flip-up'>
                            <h2>2,000+</h2>
                            <p>Active Brokers</p>
                        </div>
                        <div className='card6' data-aos='flip-left'>
                            <h2>3,000+</h2>
                            <p>Monthly Visitors</p>
                        </div>
                    </section>

                </div>

            </section>
        </div>
    )
}
export default PropDetails