import { useLocation } from "react-router-dom";
import HomeLoancalculator from "../components/HomeLoancalculator";
import Banks from "../components/bankpartners";
import Homeloanform from "../components/homeLoanForm";

import AOS from "aos"
import "aos/dist/aos.css"

import { Helmet } from "react-helmet";
import { useEffect } from "react";


AOS.init()

const HomeLoan = () => {
    const location = useLocation();

    useEffect(() => {
        // Check if the URL has a hash and scroll to the corresponding section
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);


    return (
        <>
            <Helmet>
                <title>Keys to Happiness: AssetsGlobal Home Loan Support</title>
                <meta name="description" content="Keys to happiness with AssetsGlobal Home Loan Support. 
                Elevate your home-buying journey with expert guidance and financial solutions. 
                Your dream home, our commitment."/>
                <meta name="keywords" content=" AssetsGlobal real estate" />
            </Helmet>
            <div data-aos="fade-up"><Homeloanform /></div>
            {/* <div data-aos="fade-up"><Banks/></div> */}
            <div data-aos="fade-up" id="emiCalci"><HomeLoancalculator /></div>
        </>
    )
}
export default HomeLoan;