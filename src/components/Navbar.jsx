import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../Images/logoAssetsGlobal.png';
import { useCity } from './context/CityContext';

const NavbarContainer = styled.div`
  align-items: center;
  background-color: white;
  display: flex;
  font-weight: 600;
  justify-content: space-between;
  padding: 10px 20px;
  position: sticky;
  top: 0;
  z-index: ${({ isHomePage }) => (isHomePage ? '1000' : '100000')};

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  order: 2;
  visibility: ${({ isOpen }) => (isOpen ? 'hidden' : 'visible')};

  img {
    max-width: 50%;
    height: auto;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    padding: 10px 0;
  }

  @media screen and (max-width: 390px) {
    img {
      max-width: 40%;
    }
  }
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  a {
    text-decoration: none;
    color: black;
    font-size: 16px;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #7ab945;
    }
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    order: ${({ order }) => order};
    gap: 10px;
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    gap: 10px;
    font-size: 14px;
    a {
      padding: 5px;
    }
  }
`;

const LeftMenuContainer = styled(MenuContainer)`
  justify-content: center;
  flex: 1;
  order: 1;
`;

const RightMenuContainer = styled(MenuContainer)`
  justify-content: center;
  flex: 1;
  order: 3;
`;

const HamburgerIconContainer = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 35px;
    right: 20px;
  }

  @media screen and (max-width: 390px) {
    top: 35px;
    right: 55px;
  }
`;

const CustomHamburgerIcon = styled(FaBars)`
  font-size: 24px;
  cursor: pointer;
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { city } = useCity(); // Use the city context

  const isHomePage = location.pathname === '/';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleNavigate = () => {
    navigate('/');
  };


  return (
    <NavbarContainer className="header-main-container" isHomePage={isHomePage}>
      <LeftMenuContainer isOpen={isOpen} order={1}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/aboutUs" onClick={closeMenu}>About Us</Link>
        <Link to="/solutions" onClick={closeMenu}>Solutions</Link>
        <Link to={`/projects/${city}`} onClick={closeMenu}>Projects</Link>

      </LeftMenuContainer>

      {!isOpen && ( /* Render LogoContainer only if isOpen is false */
        <LogoContainer isOpen={isOpen}>
          <img src={logo} alt="AssetGlobal" onClick={handleNavigate} />
        </LogoContainer>
      )}

      <RightMenuContainer isOpen={isOpen} order={3}>
        <Link to="/loan" onClick={closeMenu}>Loan</Link>
        <Link to="/reachUs" onClick={closeMenu}>Reach Us</Link>
        <Link to="/sell" onClick={closeMenu}>Sell</Link>
        <Link to="/partnerWithUs" onClick={closeMenu}>Partner with Us</Link>
      </RightMenuContainer>

      <HamburgerIconContainer>
        {isOpen ? (
          <FaTimes onClick={toggleMenu} style={{ cursor: 'pointer' }} />
        ) : (
          <CustomHamburgerIcon onClick={toggleMenu} />
        )}
      </HamburgerIconContainer>
    </NavbarContainer>
  );
};

export default Navbar;
