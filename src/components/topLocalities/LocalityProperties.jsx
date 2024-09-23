import { useParams } from 'react-router-dom'
import './LocalityProperties.scss'
import whitefield from '../../Images/top-localities/whitefield.jpg'
import electronicCity from '../../Images/top-localities/electronic-city.jpg'
import sarjapuraRoad from '../../Images/top-localities/sarjapura-road.jpg'
import varthur from '../../Images/top-localities/varthur.avif'
import krPuram from '../../Images/top-localities/kr-puram.jpg'

import PropertyCard from '../propertyGridComponent/PropertyCard'
import PropertDetailsJson from '../../services/propertyDetailsJson/PropertDetailsJson.json'
import { useEffect, useState } from 'react'

const localities = [
    { img: whitefield, name: 'Whitefield', overview: 'INR 7.12 K ', totalProperties: 0 },
    { img: electronicCity, name: 'Electronic City', overview: 'INR 5.44 K ', totalProperties: 0 },
    { img: sarjapuraRoad, name: 'Sarjapura Road', 
        overview: 'Sarjapur Road is a prominent residential and commercial hub located in the heart of Bangalore. It is known for its well-planned infrastructure, good connectivity to major IT hubs, and easy access to other parts of the city. ',
        location:' Sarjapur Road is situated on the eastern side of Bangalore, about 20 kilometers from the city center.', 
        connectivity:'The area is well-connected to major IT hubs like Electronic City, Whitefield, and Outer Ring Road (ORR) through various roads and highways.', totalProperties: 0 },
    { img: varthur, name: 'Varthur', overview: 'INR 4.94 K ', totalProperties: 0 },
    { img: krPuram, name: 'KR Puram', overview: 'INR 7.1 K ', totalProperties: 0 },
]

const LocalityProperties = () => {
    const { propertyLocation } = useParams()
    const [properties, setProperties] = useState([])

    useEffect(() => {
        const filteredProperties = PropertDetailsJson.filter(
            (item => item.propertyLocation === propertyLocation)
        )
        setProperties(filteredProperties)
    }, [propertyLocation])
    return (
        <div> kjljcchey</div>
    )
}

export default LocalityProperties