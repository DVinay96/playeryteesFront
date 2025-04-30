"use client"

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

// Header Component
const Header = () => {
  const [activeLink, setActiveLink] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = ['nosotros', 'catalogos', 'productos', 'sucursales', 'marcas'];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HeaderWrapper>
      <GreenStrip />
      <HeaderContainer style={{ boxShadow: scrolled ? '0 4px 20px rgba(104, 171, 68, 0.2)' : '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
        <LogoContainer>
          <Link href={"/"}>
          <Image src="/PLAYERYTEES@2x.png" alt='logo' width={150} height={50}/>
          </Link>
        </LogoContainer>
        
        <HamburgerButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </HamburgerButton>
        
        <NavContainer>
          <NavLinks isOpen={isMobileMenuOpen}>
            {navLinks.map((link) => (
              <NavItem key={link}>
                <NavLink
                  href={`/${link}`}
                  className={activeLink === link ? 'active' : ''}
                  onClick={() => {
                    setActiveLink(link);
                    setIsMobileMenuOpen(false);
                  }}
                  onMouseEnter={() => {}}
                  onMouseLeave={() => {}}
                >
                  {link}
                  <FunHighlight isActive={activeLink === link} />
                </NavLink>
              </NavItem>
            ))}
          </NavLinks>
        </NavContainer>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

const PRIMARY_COLOR = 'white';
const SECONDARY_COLOR = 'rgb(104, 171, 68)';

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
`;

const GreenStrip = styled.div`
  height: 30px;
  background-color: ${SECONDARY_COLOR};
  width: 100%;
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${PRIMARY_COLOR};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const LogoContainer = styled.div`
  flex: 0 0 auto;
`;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
`;

interface NavLinksProps {
  isOpen: boolean;
}

const NavLinks = styled.ul<NavLinksProps>`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background-color: ${PRIMARY_COLOR};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 1rem 0;
  }
`;

const NavItem = styled.li`
  margin: 0 0.5rem;
  
  @media (max-width: 768px) {
    margin: 0.5rem 0;
    width: 100%;
    text-align: center;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  text-transform: capitalize;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  position: relative;
  
  &:hover {
    color: ${SECONDARY_COLOR};
    
    &::after {
      width: 80%;
      opacity: 1;
      transition: width 0.3s ease, opacity 0.3s ease;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 10%;
    width: 0;
    height: 3px;
    background-color: ${SECONDARY_COLOR};
    opacity: 0;
  }
  
  &.active {
    color: ${SECONDARY_COLOR};
    
    &::after {
      width: 80%;
      opacity: 1;
    }
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

interface FunHighlightProps {
  isActive: boolean;
}

const FunHighlight = styled.span<FunHighlightProps>`
  position: absolute;
  top: -5px;
  right: -8px;
  background-color: ${SECONDARY_COLOR};
  color: white;
  border-radius: 50%;
  width: 8px;
  height: 8px;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

export default Header;