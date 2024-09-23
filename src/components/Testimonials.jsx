import React, { useState, useEffect, useRef } from 'react';
import { IoStar, IoStarHalf } from "react-icons/io5";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import revieImage from '../Images/reviewImage.jpeg';


import aarav from '../Images/testimonials/aarav.jpg'
import ananya from '../Images/testimonials/ananya.jpg'
import aditya from '../Images/testimonials/aditya.jpg'
import diya from '../Images/testimonials/diya.jpg'
import krishna from '../Images/testimonials/krishna.jpg'
import lakshmiNair from '../Images/testimonials/lakshminair.jpg'
import rohan from '../Images/testimonials/rohan.jpg'
import meera from '../Images/testimonials/meera.jpg'
import siddharth from '../Images/testimonials/siddarth.jpg'
import shravan from '../Images/testimonials/shravan.jpg'
import nisha from '../Images/testimonials/nisha.jpg'



import './Testimonials.scss';
import "aos/dist/aos.css"
import Aos from "aos"
import { useLocation } from 'react-router-dom';


const responsive = {
    0: { items: 1 },
    568: { items: 1 },
    1024: { items: 1 },
};

const customerReviews = [
    { id: 1, name: 'Aarav Sharma (Software Engineer)', img: aarav, review: 'Purchasing a home from Assets Global was a seamless experience. The team was very professional and provided excellent support throughout. My new 3BHK apartment in Noida is perfect!', btnText: 'Read more' },
    { id: 2, name: 'Ananya Iyer (Marketing Manager)', img: ananya, review: 'Buying my first home through Assets Global was a delightful experience. They offered great guidance and support throughout. My 2BHK apartment in Chennai is everything I hoped for.', btnText: 'Read more' },
    { id: 3, name: 'Aditya Mehta (Financial Analyst)', img: aditya, review: 'Assets Global made the process of buying a property in Bangalore so easy and stress-free. Their attention to detail and customer service is top-notch. I am very satisfied with my new home!', btnText: 'Read more' },
    { id: 4, name: 'Diya Patel (Project Manager)', img: diya, review: "I can't thank Assets Global enough for helping me find my dream home in Ahmedabad. Their professionalism and dedication are truly commendable. The 3BHK apartment is perfect for my family.", btnText: 'Read more' },
    { id: 5, name: 'Krishna Reddy (Civil Engineer)', img: krishna, review: 'Purchasing a property from Assets Global was a wonderful experience. Their expertise and support made the entire process smooth and hassle-free. My new home in Bangalore is fantastic!', btnText: 'Read more' },
    { id: 6, name: 'Lakshmi Nair (Human Resources)', img: lakshmiNair, review: 'Assets Global exceeded my expectations in every way. The team was helpful, knowledgeable, and patient throughout the buying process. My 2BHK apartment in Kochi is beautiful and well-located.', btnText: 'Read more' },
    { id: 7, name: 'Rohan Desai (Entrepreneur)', img: rohan, review: "Assets Global made my property buying journey in Bangalore incredibly easy. Their team is professional, and the quality of service is unmatched. I'm thrilled with my new 3BHK apartment!", btnText: 'Read more' },
    { id: 8, name: 'Meera Rao (University Professor)', img: meera, review: 'I had a great experience with Assets Global while purchasing my new home in Mangalore. Their team was very supportive and provided excellent service. My 2BHK apartment is just what I wanted.', btnText: 'Read more' },
    { id: 9, name: 'Siddharth Gupta (Chartered Accountant)', img: siddharth, review: "Assets Global made the entire process of buying a property in Jaipur smooth and enjoyable. The team's professionalism and dedication are truly impressive. I love my new home!", btnText: 'Read more' },
    { id: 10, name: 'Shravan Kumar (Chartered Accountant)', img: shravan, review: "Purchasing a home from Assets Global was a seamless experience. The team was very professional and provided excellent support throughout. My new 3BHK apartment in Noida is perfect!", btnText: 'Read more' },
    { id: 11, name: 'Nisha Singh (IT Consultant)', img: nisha, review: "Purchasing a home from Assets Global was a seamless experience. The team was very professional and provided excellent support throughout. My new 3BHK apartment in Noida is perfect!", btnText: 'Read more' },
];

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [expandedReview, setExpandedReview] = useState(null);
    const expandedViewRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const elementId = location.hash.replace('#', '');
            const element = document.getElementById(elementId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    useEffect(() => {
        Aos.init({ duration: 1000 }); // Remove `once: true` for continuous animations
        console.log('aos')
    }, []);

    const handleExpandReview = (review) => {
        setExpandedReview(review);
    };


    // useEffect(() => {
    //     if (expandedReview) {
    //         const overlay = document.querySelector('.overlay-testimonial');
    //         if (overlay) {
    //             overlay.scrollIntoView({ behavior: 'smooth', block: 'center' });
    //         }
    //     }
    // }, [expandedReview]);


    const handleCloseReview = () => {
        setExpandedReview(null);
    };
    useEffect(() => {
        const scrollIntoViewOptions = {
            behavior: 'smooth',
            block: 'end', // Adjust as needed ('start', 'end', 'center')
        };

        if (expandedReview && expandedViewRef.current) {
            expandedViewRef.current.scrollIntoView(scrollIntoViewOptions);
        }
    }, [expandedReview]);

    const items = customerReviews.map(review => (
        <div key={review.id} className="item review-card" data-value={review.id}>
            <p className='review-desc'>{review.review}</p>
            <a onClick={() => handleExpandReview(review)}>{review.btnText}</a>
            <div className="review-name">
                <img src={review.img} alt={review.name} object-fit="" />
                <p>{review.name}</p>
            </div>
        </div>
    ));

    return (
        <div className="testimonial-container" id='testimonials'>
            <div className="left-testimonial" data-aos="fade-right">
                <h1>People love the Assets Global experience</h1>
                <AliceCarousel
                    mouseTracking
                    items={items}
                    responsive={responsive}
                    controlsStrategy="alternate"
                    disableDotsControls
                    activeIndex={activeIndex}
                    onSlideChanged={(e) => setActiveIndex(e.item)}
                    autoPlay
                    autoPlayInterval={1500}
                    infinite
                />
            </div>
            <div className="right-testimonial">
                <div className="img-ratings" data-aos="fade-left">
                    <img src={revieImage} alt="Review" height={300} width={300} />
                </div>
                <div className="ratings"  >
                    <h3>4.5</h3>
                    <p>1000+ google reviews</p>
                    <div className="stars">
                        <IoStar className='star-icon' />
                        <IoStar className='star-icon' />
                        <IoStar className='star-icon' />
                        <IoStar className='star-icon' />
                        <IoStarHalf className='star-icon' />
                    </div>
                </div>
            </div>

            {expandedReview && (
                <>
                    <div className="overlay-testimonial" onClick={handleCloseReview}></div>
                    <div className="expanded-testimonial-view" >
                        <div className='testimonial-expanded-header'>
                            <h3>{expandedReview.name}</h3>
                            <img src={expandedReview.img} alt={expandedReview.name} width={150} />
                        </div>
                        <div>
                            <p>{expandedReview.review}</p>
                        </div>
                        <button className='testimonial-btn-close' onClick={handleCloseReview}>Close</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Testimonials;