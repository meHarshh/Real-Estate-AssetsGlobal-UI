import { useEffect, useRef, useState } from 'react';
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoCloseSharp, IoShareOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import { PiSealCheckFill } from "react-icons/pi";
import whatsappShareIcon from '../../../Images/shareicons/whatsapp.png';
import smsShareIcon from "../../../Images/shareicons/sms.png";
import linkShareIcon from '../../../Images/shareicons/attachments.png';

import SinglePropModal from '../../singlePropModal/SinglePropModal';

import './PropertNameImages.scss';

const propertyConfig = [
    { label: 'Configurations', value: 'bhk' },
    { label: 'Possession Date', value: 'possessionDate' },
    { label: 'Built up Area', value: 'builtUpArea' }, // Fixed typo here
    { label: 'Carpet Area', value: 'carpetArea' },
    // { label: 'Min.price per Sqft.', value: 'price_per_sqft' } // Make sure this key matches your data
];

const PropertyNameImages = ({ propItem }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [isShare, setIsShare] = useState(false);
    const shareToolTipContainer = useRef();
    const [isBrochure, setIsBrochure] = useState(null);


    // const [copied, setCopied] = useState(false);


    useEffect(() => {
        const handleClickOutSide = (event) => {
            if (shareToolTipContainer.current && !shareToolTipContainer.current.contains(event.target)) {
                setIsShare(false);
            }
        };

        window.addEventListener('click', handleClickOutSide);

        return () => window.removeEventListener('click', handleClickOutSide);
    }, []);

    const reraId = propItem.reraId

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
    };

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    };

    const handleCloseModal = () => {
        setSelectedImageIndex(null);
    };

    const handleNextImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex + 1) % propItem.images.length);
    };

    const handlePrevImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex - 1 + propItem.images.length) % propItem.images.length);
    };


    // whatsapp sharing

    const formatPropertyNameForURL = (name) => {
        return name.toLowerCase().replace(/\s+/g, '-');
    };



    const shareViaWhatsApp = (propItem) => {
        const formattedName = formatPropertyNameForURL(propItem.name);
        const url = `http://assetsglobal.in/singleProperty/${formattedName}`;
        const message = encodeURIComponent(`Check out this property listing: ${url}`);
        window.open(`https://api.whatsapp.com/send?text=${message}`, "_blank");
    };

    const shareViaSMS = (propItem) => {
        const formattedName = formatPropertyNameForURL(propItem.name);
        const url = `http://assetsglobal.in/singleProperty/${formattedName}`;
        const message = encodeURIComponent(`Check out this property listing: ${url}`);
        window.open(`sms:?body=${message}`);
    };

    const copyLinkToClipboard = (propItem) => {
        const formattedName = formatPropertyNameForURL(propItem.name);
        const url = `http://assetsglobal.in/singleProperty/${formattedName}`;
        navigator.clipboard.writeText(url).then(() => {
            alert("Link copied to clipboard!");
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    // const copyLinkToClipboard = (propItem) => {
    //     const formattedName = formatPropertyNameForURL(propItem.name);
    //     const url = `http://assetsglobal.in/singleProperty/${formattedName}`;
    //     navigator.clipboard.writeText(url).then(() => {
    //         setCopied(true);
    //         setTimeout(() => setCopied(false), 2000); // Hide after 2 seconds
    //     }).catch(err => {
    //         console.error('Failed to copy: ', err);
    //     });
    // };

    return (
        <div className="s-property-main-container">
            <section className="s-property-details">
                <div className='s-property-details-left'>
                    <section className='s-property-home-link'>
                        <p><a href="/">Home</a> / {propItem.name}, {propItem.city}</p>
                    </section>
                    <section className="s-property-name">
                        <h3>{propItem.name}</h3>
                        <p>
                            Apartment by <span className='developer-name'>{propItem.developerName}</span> at <span>{propItem.propertyLocation}</span>
                        </p>
                        <section>
                            {
                                reraId && reraId.trim() !== '' && (
                                    <div className="s-property-rera">
                                        <p><PiSealCheckFill className='rera-check' />RERA</p>
                                        <p className='rera-no'>{reraId}</p>
                                    </div>
                                )
                            }
                        </section>
                    </section>
                </div>
                <div className='s-property-details-right'>
                    {propItem.cost.includes('AED') ? (
                        <h3>{propItem.cost}</h3>
                    ) :

                        propItem.cost === "Collecting EOI" ? (
                            <h3>{propItem.cost}</h3>
                        ) : (
                            <>
                                <h3>INR {propItem.cost}</h3>
                                <p>Onwards</p>
                            </>
                        )}
                    <div className="s-property-buttons">
                        <div className="tooltip">
                            <button className='btn-same btn' onClick={handleFavoriteClick}>
                                {isFavorite ? <IoMdHeart style={{ color: 'red' }} /> : <IoMdHeartEmpty />}
                            </button>
                            <span className="tooltiptext">Favorites</span>
                        </div>
                        <div className="tooltip" ref={shareToolTipContainer} style={{ position: 'relative' }} onClick={() => setIsShare(true)}>
                            <button className='btn-same btn'><IoShareOutline /></button>
                            <span className="tooltiptext">Share</span>
                            {isShare && (
                                <div className='share-container'>
                                    <a href='#'>
                                        <img src={whatsappShareIcon} alt="icon" width={32} onClick={() => shareViaWhatsApp(propItem)} />
                                        <p>Whastapp</p>
                                    </a>
                                    <a href='#'>
                                        <img src={smsShareIcon} alt="icon" width={32} onClick={() => shareViaSMS(propItem)} />
                                        <p>SMS</p>
                                    </a>
                                    <a href='#'>
                                        <img src={linkShareIcon} alt="icon" width={32} onClick={() => copyLinkToClipboard(propItem)} />
                                        {/* {copied && (
                                            <span style={{ marginLeft: '-40px', color: 'grey', position: 'absolute', fontWeight: 'bold', zIndex: '100' }}>
                                                Copied!
                                            </span>
                                        )} */}
                                        <p>Link</p>
                                    </a>
                                </div>
                            )}
                        </div>
                        <button className='btn-same btn-brochure' onClick={() => setIsBrochure("Download Broucher")}><MdOutlineFileDownload /> Brochure </button>
                        <button onClick={() => setIsBrochure("Contact")} className='btn-contact'>Contact Seller</button>
                    </div>
                </div>
            </section>
            <section className="s-property-images">
                <div className='s-property-images-flex'>
                    {propItem.images && Array.isArray(propItem.images) && propItem.images.map((item, index) => (
                        <img
                            key={index}
                            src={item}
                            alt={`property-${index}`}
                            onClick={() => handleImageClick(index)}
                            className="s-property-image-thumbnail"
                        />
                    ))}
                </div>
                {selectedImageIndex !== null && (
                    <div className="image-modal" onClick={handleCloseModal}>
                        <div className="image-modal-content" onClick={e => e.stopPropagation()}>
                            <button className="modal-prev" onClick={handlePrevImage}>‹</button>
                            <img src={propItem.images[selectedImageIndex]} alt="Selected" className="selected-image" />
                            <button className="modal-next" onClick={handleNextImage}>›</button>
                            <button onClick={handleCloseModal} className="close-modal"><IoCloseSharp /></button>
                        </div>
                    </div>
                )}
            </section>
            <section className="s-property-desc">
                {propertyConfig.map((configItem) => (
                    <div key={configItem.value} className='s-property-desc-config'>
                        <p id='s-property-title'>{configItem.label}</p>
                        {typeof propItem[configItem.value] === 'string' && configItem.label === 'Configurations' ?
                            propItem[configItem.value].split('/').map(bhk => `${bhk.trim()}BHK`).join(', ')
                            :
                            <p>{propItem[configItem.value]}</p>
                        }
                    </div>
                ))}
            </section>

            {isBrochure && <SinglePropModal onClick={() => setIsBrochure(null)} modalName={isBrochure} />}
        </div>
    );
};

export default PropertyNameImages;
