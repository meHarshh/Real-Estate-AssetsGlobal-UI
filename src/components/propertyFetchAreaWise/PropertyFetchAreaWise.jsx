import { Link } from 'react-router-dom';

import './PropertyFetchAreaWise.scss';

const areaWise = ['Attibele', 'Avalahalli',
    'Bannerghatta Road', 'Begur', 'Bommasandra', 'Budigere Cross', 'Devanahalli', 'Electronic City', 'Gunjur',
    'Hebbal', 'Hesaraghatta', 'Hoodi', 'Hosur Road', 'HSR Layout', 'ITPL', 'Jakkur', 'JP Nagar', 'Kanakapura Road', 'Kengeri',
    'Kogilu', 'KR Puram', 'Mahadevpura', 'Marathahalli', 'Mysore Road', 'Nagasandra', 'Old Madras Road', 'Rachenahalli',
    'Sarjapura', 'Sarjapura Road', 'Talaghattapura', 'Thanisandra', 'Tumkur Road', 'Uttarahalli',
    'Varthur', 'Whitefield', 'Yelahanka', 'Yeshwanthpur'
];

const PropertyFetchAreaWise = () => {
    return (
        <div className='property-areawise-main-container'>
            <div className='areawise-heading'>
                <h2>Properties in Bangalore</h2>
            </div>
            <div className='areawise-property-list'>
                <ul className='ul-area-list'>
                    {areaWise.map((area) => (
                        <li className='areas-list' key={area}>
                            {/* <Link className='area-link' to={`/propertyGrid/${area}`}>Property in {area}</Link> */}
                            <Link className='area-link' to={`/property-in/${area}`}> Property in {area}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default PropertyFetchAreaWise


