
import AboutUsContactForm from '../components/AboutUsContactForm';
import PropDetails from "../components/AboutUsDetails";
import IntroPage from "../components/AboutUsIntro";
// import VideoContent from '../components/AboutUsVideoContent';
import Clients from "../components/Clients";
import ServicesHome from "../components/ServicesHome";
import Testimonials from '../components/Testimonials';
import AboutUsImageContent from '../components/AboutUsImageContent';
import AssetsIntroduction from '../components/assetsIntro/AssetsIntroduction';
import PropertyFetchAreaWise from '../components/propertyFetchAreaWise/PropertyFetchAreaWise';
import './About.scss'

import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect } from 'react';

import { Helmet } from 'react-helmet';
import OrganizationTree from '../components/organizationTree/OrganizationTree';


const About = () => {
    // const [location, setLocation] = useState({
    //     city: "Bengaluru",
    //     area: "",
    // });

    useEffect(() => {
        Aos.init({ duration: 1000 }); // Remove `once: true` for continuous animations
        console.log('aos')
    }, []);



    return (
        <main className='about-main-container'>
            <Helmet>
                <title>Read Before You Explore: AssetsGlobal Disclaimer</title>
                <meta name="description" content="Navigate with confidence! 
                Discover AssetsGlobal's Disclaimer – essential insights for informed exploration. 
                Read before delving into the world of assets and investments."/>
                <meta name="keywords" content="Real estate landscape" />
            </Helmet>
            <div data-aos="fade-up">
                <IntroPage />
            </div>
            <div data-aos="fade-up">
                {/* <h1 style={{ color: "black" }}>Introduction</h1> */}
                <AssetsIntroduction />
            </div>
            <div style={{ width: "100%" }} data-aos="fade-up">
                <h1 style={{ color: "black" }}>Our Services</h1>
                <ServicesHome />
            </div>

            <div data-aos="fade-up">
                <PropDetails data-aos="fade-up" />
            </div>

            {/* <div data-aos="fade-up" className='video-why-us'>
                <VideoContent data-aos="fade-up" />
            </div> */}

            <div data-aos="fade-up">
                <Clients data-aos="fade-up" />
            </div>
            <div data-aos="fade-up">
                <AboutUsImageContent data-aos="fade-up" />
            </div>
            {/* <div>
                <OrganizationTree />
            </div> */}
            <div data-aos="fade-up">
                <Testimonials data-aos="fade-up" />
            </div>

            <div data-aos="fade-up">
                <h3 style={{ marginBottom: '0' }}> Know Us</h3>
                <AboutUsContactForm data-aos="fade-up" />
            </div>
            <div data-aos="fade-up">
                <PropertyFetchAreaWise />
            </div>

        </main>
    )
}
export default About;
