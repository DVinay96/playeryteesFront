'use client'
import React from 'react'
import styled from 'styled-components'
import LogoMarquee from './Marquee'
import ProductCard from './ProductCard'
import { theme } from '@/styles/globalStyles'
import Image from 'next/image'

const HomeContent = () => {
  return (
    <>
      <JumbotronSection>
        <div className="image-container">
          <Image 
            src='/jumbotron.png' 
            alt='shirts' 
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </div>
      </JumbotronSection>
      
      <LogoMarquee/>
      
      <TopProductSection>
        <h1>LOS MÁS VENDIDOS</h1>
        <CardWrapper>
          <ProductCard image="/PLAYERA ROJA.svg" name="Product 1" brand="Brand A" price={'29.99'} />
          <ProductCard image="/PLAYERA ROJA.svg" name="Product 2" brand="Brand B" price={'39.99'} />
          <ProductCard image="/PLAYERA ROJA.svg" name="Product 3" brand="Brand C" price={'49.99'} />
          <ProductCard image="/PLAYERA ROJA.svg" name="Product 4" brand="Brand D" price={'59.99'} />
        </CardWrapper>
        <ProductButton>TODOS LOS PRODUCTOS</ProductButton>
      </TopProductSection>
      
      <LowerJumbotron>
        <div className="image-container">
          <Image 
            src='/lowerjumbotron.png' 
            alt='shirts' 
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </div>
      </LowerJumbotron>
    </>
  )
}

const JumbotronSection = styled.section`
  height: 70vh;
  width: 100%;
  position: relative;
  
  .image-container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  @media (max-width: 768px) {
    height: 50vh;
  }
  
  @media (max-width: 480px) {
    height: 40vh;
  }
`

const TopProductSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-top: 2rem;
  align-items: center;
  padding: 0 1rem;

  h1 {
    margin: 2rem;
    font-size: 2rem;
    
    @media (max-width: 768px) {
      font-size: 1.75rem;
      margin: 1.5rem;
    }
    
    @media (max-width: 480px) {
      font-size: 1.5rem;
      margin: 1rem;
    }
  }
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
  
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
  }
`

const ProductButton = styled.button`
  width: 25%;
  background-color: white;
  border: 3px solid ${theme.colors.secondary};
  border-radius: 10px;
  margin: 3rem;
  font-size: 1.2rem;
  padding: .5rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  
  &:hover {
    background-color: ${theme.colors.secondary};
    color: white;
  }
  
  @media (max-width: 992px) {
    width: 40%;
  }
  
  @media (max-width: 768px) {
    width: 60%;
    font-size: 1.1rem;
    margin: 2rem;
  }
  
  @media (max-width: 480px) {
    width: 80%;
    font-size: 1rem;
    margin: 1.5rem;
    padding: 0.4rem;
  }
`

const LowerJumbotron = styled.section`
  width: 100%;
  height: 60vh;
  position: relative;
  
  .image-container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  @media (max-width: 768px) {
    height: 50vh;
  }
  
  @media (max-width: 480px) {
    height: 40vh;
  }
`

export default HomeContent