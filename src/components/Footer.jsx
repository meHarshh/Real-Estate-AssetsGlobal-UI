import React from 'react';
import { FaFacebookSquare } from "react-icons/fa";
import assetsLogo from '../Images/logoAssetsGlobal01.png';

import './Footer.scss';
// import { IoIosPhonePortrait } from "react-icons/io";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { IoLogoLinkedin } from "react-icons/io5";
import { RiInstagramFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

// const knowUs = ['Home', 'Why us', 'Testimonials', 'FAQ'];

const knowUs = [
  { text: 'Home', target: 'home', path: '/' },
  { text: 'About Us', target: 'whyUs', path: '/aboutUs' },
  { text: 'Testimonials', target: 'testimonials', path: '/#testimonials' },
  { text: 'FAQ', target: 'faq', id: 'faq' },
];

const ourServices = [
  { text: 'Solutions', path: '/solutions' },
  { text: 'Loan', path: '/loan' },
  { text: 'Sell', path: '/sell' },

]

const companyIcons = [
  { icon: FaFacebookSquare, url: 'https://www.facebook.com/assetsglobalofficial/' },
  { icon: FaSquareXTwitter, url: 'https://x.com/assetsgofficial' },
  { icon: RiInstagramFill, url: 'https://www.instagram.com/assetsglobalofficial/' },
  { icon: IoLogoLinkedin, url: 'https://www.linkedin.com/company/assets-global-official/' },
  { icon: IoLogoYoutube, url: 'https://www.youtube.com/@AssetsGlobal204' },

];

const reachUs = [
  { text: 'Contact Us', path: '/reachUs' },
  // { text: 'Offices', noLink: true },
  // { text: 'Toll Free', noLink: true },
  // { text: 'Toll Free :+91 77950 39691', url: 'tel:+91 77950 39691' },
  // { text: '+971 54 702 3435', url: 'tel:+971547023435' },
  { text: 'contact@assetsglobal.in', url: 'mailto:contact@assetsglobal.in' },

  { text: 'info@assetsglobal.in', url: 'mailto:info@assetsglobal.in' }
];

const policies = [
  { text: 'Privacy Policy', path: '/privacyPolicy' },
  { text: 'Terms And Conditions', path: '/termsAndConditions' },
  { text: 'Disclaimer', path: '/disclaimer' },
  { text: 'Cookies', path: '/cookies' },

]

const Footer = () => {


  const renderOurServices = () =>
    ourServices.map((service, index) => (
      <p className="our-services" key={index}>
        <Link to={service.path}>{service.text}</Link>
      </p>
    ));

  const renderKnowUs = () =>
    knowUs.map(knowUsItem => {
      if (knowUsItem.path) {
        return (
          <p className='know-us' key={knowUsItem.text}>
            <Link to={knowUsItem.path}>{knowUsItem.text}</Link>
          </p>
        );
      } else {
        const scrollToTarget = () => {
          const element = document.getElementById(knowUsItem.target);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        };

        return (
          <p className='know-us' key={knowUsItem.text}>
            <Link href={`#${knowUsItem.target}`} onClick={scrollToTarget}>{knowUsItem.text}</Link>
          </p>
        );
      }
    });


  const renderReachUs = () =>
    reachUs.map((reachUsItem, index) => (
      <p className='reach-us' key={index}>
        {reachUsItem.path ? (
          <Link to={reachUsItem.path}>{reachUsItem.text}</Link>
          // <a href={reachUsItem.path}>{reachUsItem.text}</a>
        ) : reachUsItem.url ? (
          <a href={reachUsItem.url}>
            {reachUsItem.text.startsWith('tel:') ? 'Call ' : ''}
            {reachUsItem.text}
          </a>
        ) : (
          <a>{reachUsItem.text}</a>
        )}
      </p>
    ));

  const renderPolicies = () =>
    policies.map((policy, index) => (
      <p className='policies' key={index}>
        <Link to={policy.path} style={{ textDecoration: 'none', color: '#fff' }}>{policy.text}</Link>
      </p>
    ))


  return (
    <div className='footer-container'>
      <section className="footer-details-container">
        <div className="logo-heading-container">
          <h1>Welcome to a new <br />age of home buying</h1>
          <img src={assetsLogo} alt="Assets company" width={280} />
          <section className="company-icons">
            {companyIcons.map(({ icon: Icon, url }, index) => (
              <a key={index} href={url} target="_blank" rel="noopener noreferrer" className='social-media-icons'>
                <Icon size={24} />
              </a>
            ))}
          </section>
        </div>
        <div className='comapany-about-container'>
          <section>
            <h1>Our Services</h1>
            {renderOurServices()}
          </section>
          <section>
            <h1>Know Us</h1>
            {renderKnowUs()}
          </section>
          <section >
            <h1>Reach Us</h1>
            {renderReachUs()}
          </section>
        </div>
      </section>
      <section className='footer-location-container'>
        <div className='location-container'>
          <section>
            <p className='location-name'>Corporate Office:</p>
            <p className='location-desc'> Dubai</p>
          </section>
          <section>
            <p className='location-name'>Regional Head Office:</p>
            <p> Bangalore, India
            </p>
          </section>
        </div>
        <div className='copyright-container'>
          <section>
            {renderPolicies()}
          </section>
          <p className='copyright'> All Rights Reserved. &copy; 2024 AssetsGlobal.</p>
        </div>
      </section>
    </div>
  )
}

export default Footer;
