import React, { useState } from 'react';
import './OrganizationTree.scss';

const OrganizationTree = () => {
    const [selectedMember, setSelectedMember] = useState(null);

    const handleClick = (member) => {
        setSelectedMember(member);
    };

    const handleMouseEnter = (member) => {
        setSelectedMember(member);
    };

    const handleMouseLeave = () => {
        setSelectedMember(null);
    };

    const Member = ({ name, imgSrc }) => (
        <div className="member-view-box">
            <div className="member-image">
                <img src={imgSrc} alt={name} />
                <div className="member-details">
                    <h3>{name}</h3>
                </div>
            </div>
        </div>
    );


    return (
        <div className="body genealogy-body genealogy-scroll">
            <div className=" genealogy-tree">
                <ul>
                    <li>
                        <a href="">Assets Global</a>
                        <ul className=' active root-tree'>
                            <li className='parent'>
                                <a href="#">
                                    <Member name="CMD" imgSrc="https://image.flaticon.com/icons/svg/145/145867.svg" />
                                </a>



                                <ul className="active child-tree">
                                    <li className='child'>
                                        <a href="#">
                                            <Member name="Sales Team" imgSrc="https://image.flaticon.com/icons/svg/145/145867.svg" />
                                        </a>
                                        <ul>
                                            <li>
                                                <a href="#">
                                                    <Member name="ram" imgSrc="https://image.flaticon.com/icons/svg/145/145867.svg" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <Member name="krishna" imgSrc="https://image.flaticon.com/icons/svg/145/145867.svg" />
                                                </a>
                                            </li>
                                            {/* Add more members here */}
                                        </ul>
                                    </li>
                                    <li className='child'>
                                        <a href="#">
                                            <Member name="IT Team" imgSrc="https://image.flaticon.com/icons/svg/145/145867.svg" />
                                        </a>
                                        <ul className="active grand-child-tree">
                                            <li className='grand-child'>
                                                <a href="#">
                                                    <Member name="Ritesh" imgSrc="https://image.flaticon.com/icons/svg/145/145867.svg" />
                                                </a>
                                                <ul className='Great-grand-child-tree'>
                                                    <li className='Great-grand-child'>
                                                        <a href="#">
                                                            <Member name="harsh" imgSrc="https://image.flaticon.com/icons/svg/145/145867.svg" />
                                                        </a>
                                                    </li>
                                                    <li className='Great-grand-child'>
                                                        <a href="#">
                                                            <Member name="swati" imgSrc="https://image.flaticon.com/icons/svg/145/145867.svg" />
                                                        </a>
                                                    </li>
                                                    <li className='Great-grand-child'>
                                                        <a href="#">
                                                            <Member name="rakshitha" imgSrc="https://image.flaticon.com/icons/svg/145/145867.svg" />
                                                        </a>
                                                    </li>
                                                    {/* Add more members here */}
                                                </ul>
                                            </li>
                                            {/* Add more members here */}
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li className='parent'>
                                <a href="#">
                                    <Member name="CEO" imgSrc="https://image.flaticon.com/icons/svg/145/145867.svg" />
                                </a></li>
                            <li className='parent'>
                                <a href="#">
                                    <Member name="Board Director" imgSrc="https://image.flaticon.com/icons/svg/145/145867.svg" />
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>

            </div>
        </div>
    );
};


export default OrganizationTree;