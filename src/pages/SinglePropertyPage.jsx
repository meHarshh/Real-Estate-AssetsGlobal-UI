import { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';

import AboutUsContactForm from '../components/AboutUsContactForm';
import NearbyProjects from "../components/singlePropertyComponents/nearbyProjects/NearbyProjects";
import NearbyProperties from "../components/singlePropertyComponents/nearbyProperties/NearbyProperties";
import PropertyAbout from "../components/singlePropertyComponents/propertyAbout/PropertyAbout";
import PropertyDeveloper from "../components/singlePropertyComponents/propertyDeveloper/PropertyDeveloper";
import PropertyLocation from "../components/singlePropertyComponents/propertyLocation/PropertyLocation";
import PropertyNameImages from "../components/singlePropertyComponents/propertyNameImages/PropertyNameImages";
import SimilarProjects from "../components/singlePropertyComponents/similarProjects/SimilarProjects";
import './SinglePropertyPage.scss';
import { Height } from "@mui/icons-material";

const links = [
    { text: 'Overview', href: '#overview' },
    { text: 'Configurations', href: '#configurations' },
    { text: 'Amenities', href: '#amenities' },
    { text: 'Locality', href: '#locality' },
    { text: 'Bank Offers', href: '#bank-offers' },
    { text: 'Developer', href: '#developer' },
    { text: 'Nearby Projects', href: '#nearby-projects' },
    { text: 'Similar Projects', href: '#similar-projects' },
    // { text: 'Nearby Properties', href: '#nearby-properties' },
];

const SinglePropertyPage = () => {
    const [property, setProperty] = useState(null);
    // const [activeLink, setActiveLink] = useState('#overview'); 
    const [activeLink, setActiveLink] = useState('');

    const { id } = useParams();
    const propertyRef = useRef(null);
    const linksContainerRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            console.log('first', process.env.PUBLIC_URL)
            try {
                const response = await fetch(`/propertyDetailsJson/PropertDetailsJson.json`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                // Find property by id or name (slug)
                const propertyById = data.find(d => d.id === Number(id));
                const propertyByName = data.find(d =>
                    d.name.replace(/\s+/g, '-').toLowerCase() === id
                );

                setProperty(propertyById || propertyByName);
            } catch (error) {
                console.error('Error fetching the data:', error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 101.2 + 75.2

            links.forEach(link => {
                const element = document.getElementById(link.href.slice(1))

                if (!element) return

                const sectionTop = element.offsetTop
                const sectionHeight = element.offsetHeight

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight)
                    setActiveLink(link.href)
            })
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, []);

    const scrollToSection = (id) => {
        const section = document.querySelector(id);
        if (section) {
            const header = document.querySelector('header'); // Adjust this selector if needed
            const headerHeight = header ? header.offsetHeight : 200;

            const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset;
            const scrollToPosition = sectionPosition - headerHeight;

            window.scrollTo({
                top: scrollToPosition,
                behavior: 'smooth'
            });
            setActiveLink(id);
        }
    };

    const scrollLinks = (direction) => {
        if (linksContainerRef.current) {
            const scrollAmount = direction === 'left' ? -100 : 100;
            linksContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };


    // useEffect(() => {
    //     // Query sections based on the href attributes of the links
    //     const sections = links.map(link => document.querySelector(link.href));

    //     // Query the header to adjust for its height in the intersection calculations
    //     const header = document.querySelector('header'); // Adjust this selector if needed
    //     const headerHeight = header ? header.offsetHeight : 0;

    //     // Create an IntersectionObserver instance
    //     const observer = new IntersectionObserver(
    //         entries => {
    //             entries.forEach(entry => {
    //                 if (entry.isIntersecting) {
    //                     // Update the active link when a section is intersecting
    //                     setActiveLink(`#${entry.target.id}`);
    //                 }
    //             });
    //         },
    //         { rootMargin: `${-headerHeight}px 0px ${-headerHeight}px 0px` } // Adjust the rootMargin to account for the header height
    //     );

    //     // Observe each section
    //     sections.forEach(section => {
    //         if (section) observer.observe(section);
    //     });

    //     // Cleanup the observer when the component unmounts or dependencies change
    //     return () => {
    //         sections.forEach(section => {
    //             if (section) observer.unobserve(section);
    //         });
    //     };
    // }, [links]);

    // useEffect(() => {
    //     const sections = links.map(link => document.querySelector(link.href));

    //     const header = document.querySelector('header'); // Adjust this selector if needed
    //     const headerHeight = header ? header.offsetHeight : 0;

    //     const observer = new IntersectionObserver(
    //         entries => {
    //             entries.forEach(entry => {
    //                 if (entry.isIntersecting) {
    //                     setActiveLink(`#${entry.target.id}`);
    //                 }
    //             });
    //         },
    //         { rootMargin: `-50px 0px -50px 0px` } // Adjust the rootMargin to account for the header height
    //     );

    //     sections.forEach(section => {
    //         if (section) observer.observe(section);
    //     });

    //     return () => {
    //         sections.forEach(section => {
    //             if (section) observer.unobserve(section);
    //         });
    //     };
    // }, []);

    return (
        <div className="single-property-page-container">
            {property && (
                <>
                    <PropertyNameImages propItem={property} />
                    <div className="s-property-page-links-wrapper">
                        <button className="s-arrow left-arrow" onClick={() => scrollLinks('left')}>‹</button>
                        <div className="s-property-page-links" ref={linksContainerRef}>
                            {links.map((link, index) => (
                                <a key={index} className={`s-prop-link ${activeLink === link.href ? 'is-active' : ''}`} href={link.href} onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}>{link.text}</a>
                            ))}
                        </div>
                        <button className="s-arrow right-arrow" onClick={() => scrollLinks('right')}>›</button>
                    </div>
                    <div className="s-property-main-content">
                        <section className="s-property-main-content-left">
                            <PropertyAbout propItem={property} />
                            <PropertyLocation propItem={property} />
                            <PropertyDeveloper propItem={property} />
                            <NearbyProjects location={property.city} />
                            <SimilarProjects propType={property.propertyType} />
                            {/* <NearbyProperties location={property.city} /> */}
                        </section>
                        <section className="s-property-main-content-right">
                            <div className="flip-card sticky-fb-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <h3 className="title">Find your dream <br /> home today!</h3>
                                        <p>Call Us Toll Free</p>
                                        <a href="tel:+91 77950 39691">77950 39691</a>
                                    </div>
                                    <div className="flip-card-back">
                                        <p className="title">Call Us Toll Free</p>
                                        <a href="tel:+91 77950 39691">77950 39691</a>
                                    </div>
                                </div>
                            </div>
                            <AboutUsContactForm className='stickyForm' />
                        </section>
                    </div>
                </>
            )}
        </div>
    )
}

export default SinglePropertyPage;
