import './TopLocalities.scss'
import whitefield from '../../Images/top-localities/whitefield.jpg'
import electronicCity from '../../Images/top-localities/electronic-city.jpg'
import sarjapuraRoad from '../../Images/top-localities/sarjapura-road.jpg'
import varthur from '../../Images/top-localities/varthur.avif'
import krPuram from '../../Images/top-localities/kr-puram.jpg'
import PropertDetailsJson from '../../services/propertyDetailsJson/PropertDetailsJson.json'

import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { propTypes } from 'react-bootstrap/esm/Image'
import { Link } from 'react-router-dom'

// const localityProperties = PropertDetailsJson.filter((item)=>
// )
// const topLocalitiesImg = [whitefield,electronicCity,sarjapuraRoad,varthur,krPuram]
const topLocalities = [
    { img: whitefield, name: 'Whitefield', desc: 'INR 7.12 K ', totalProperties: 0 },
    { img: electronicCity, name: 'Electronic City', desc: 'INR 5.44 K ', totalProperties: 0 },
    { img: sarjapuraRoad, name: 'Sarjapura Road', desc: 'INR 5.75 K ', totalProperties: 0 },
    { img: varthur, name: 'Varthur', desc: 'INR 4.94 K ', totalProperties: 0 },
    { img: krPuram, name: 'KR Puram', desc: 'INR 7.1 K ', totalProperties: 0 },
]

const TopLocalities = () => {

    const updatedLocalities = topLocalities.map(locality => {
        const filteredProperties = PropertDetailsJson.filter(property => {
            // Normalize and compare both strings
            const normalizedPropertyLocation = property.propertyLocation.trim().toLowerCase();
            const normalizedLocalityName = locality.name.trim().toLowerCase();

            // Check for exact locality or if it's part of a larger name
            if (normalizedLocalityName === 'sarjapura road') {
                // Capture both "Sarjapura" and "Sarjapura Road"
                return normalizedPropertyLocation.includes('sarjapura');
            } else {
                // For other localities, do a normal includes comparison
                return normalizedPropertyLocation.includes(normalizedLocalityName);
            }
        });

        return {
            ...locality,
            totalProperties: filteredProperties.length
        };
    });

    return (
        <div className='top-localities-main-container'>
            <div className='top-localities-heading'>
                <h2>Top Localities</h2>
            </div>
            <div className='top-localities-card-container'>
                {updatedLocalities.map((item, idx) => {
                    return (
                        <Link to={`/property-in/${item.name}`} key={idx} className={`top-localities-card top-localities-card${idx + 1}`}>
                            <div
                                className='top-localities-img'
                                style={{ backgroundImage: `url(${item.img})` }}>
                                <div className={`top-localities-div-img-details img-details-${idx + 1}`}>
                                    <h3>{item.name}</h3>
                                    <h5>{item.desc} <span>Avg price per sq.ft</span></h5>
                                </div>
                            </div>
                            <div className='top-localities-details'>
                                <p>New Projects</p>
                                <p>{item.totalProperties} <LiaLongArrowAltRightSolid /></p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
export default TopLocalities