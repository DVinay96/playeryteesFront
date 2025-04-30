'use client'

import React, { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { theme } from '@/styles/globalStyles'
import ProductCard from '@/components/ProductCard'
import { useRouter } from 'next/navigation'



const sampleProducts = [
  {
    id: '1',
    name: 'Playera Cuello Redondo',
    brand: 'PlayerYTees',
    category: 'PLAYERAS',
    image: '/PLAYERA ROJA.svg',
    price: '$150.00'
  },
  {
    id: '2',
    name: 'Polo Classic',
    brand: 'PlayerYTees',
    category: 'POLOS',
    image: '/PLAYERA ROJA.svg',
    price: '$180.00'
  },
  {
    id: '3',
    name: 'Gorra Snapback',
    brand: 'Sport Caps',
    category: 'GORRAS',
    image: '/PLAYERA ROJA.svg',
    price: '$120.00'
  },
  {
    id: '4',
    name: 'Sudadera Básica',
    brand: 'Gildan',
    category: 'SUDADERAS',
    image: '/PLAYERA ROJA.svg',
    price: '$250.00'
  },
  {
    id: '5',
    name: 'Uniforme Empresarial',
    brand: 'PlayerYTees',
    category: 'UNIFORMES',
    image: '/PLAYERA ROJA.svg',
    price: '$350.00'
  },
];

const categories = [
    {
        image: '/POLOS.svg',
        text: 'POLOS',
        category: 'polos'
    },
    {
        image: '/PLAYERAS.svg',
        text: 'PLAYERAS',
        category: 'playeras'
    },
    {
        image: '/UNIFORMES.svg',
        text: 'UNIFORMES',
        category: 'uniformes'
    },
    {
        image: '/SUDADERAS.svg',
        text: 'SUDADERAS',
        category: 'sudaderas'
    },
    {
        image: '/GORRAS.svg',
        text: 'GORRAS',
        category: 'gorras'
    },
    {
        image: '/PROMOCIONALES.svg',
        text: 'PROMOCIONALES',
        category: 'promocionales'
    },
    {
        image: '/TEXTILES.svg',
        text: 'TEXTILES',
        category: 'textiles'
    },
]

const brands = [
    {
        src: '/PLAYERYTEES.svg',
        name: 'PlayerYTees',
        brand: 'playerytees'
    },
    {
        src: '/BONES.svg',
        name: 'Bones',
        brand: 'bones'
    },
    {
        src: '/GILDAN.svg',
        name: 'Gildan',
        brand: 'gildan'
    },
    {
        src: '/JERZEES.svg',
        name: 'Jerzees',
        brand: 'jerzees'
    },
    {
        src: '/SPORT CAPS.svg',
        name: 'Sport Caps',
        brand: 'sportcaps'
    },
    {
        src: '/CLUB CABO.svg',
        name: 'Club Cabo',
        brand: 'clubcabo'
    },
    {
        src: '/FITCAP.svg',
        name: 'Fitcap',
        brand: 'fitcap'
    },
    {
        src: '/OUTDOOR.svg',
        name: 'Outdoor',
        brand: 'outdoor'
    },
    {
        src: '/PUNTO PUNTADA.svg',
        name: 'Punto Puntada',
        brand: 'puntopuntada'
    },
    {
        src: '/ESENCIALES.svg',
        name: 'Esenciales',
        brand: 'esenciales'
    },
]

const ProductsPage = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  
interface Category {
    category: string;
}

const handleCategoryClick = (category: Category['category']): void => {
    setSelectedCategory(category);
    setSelectedBrand('');
};
  
const handleBrandClick = (brand: string): void => {
    setSelectedBrand(brand);
    setSelectedCategory(''); 
};
  
interface NavigateToProductProps {
    productId: string;
}

const navigateToProduct = (productId: NavigateToProductProps['productId']): void => {
    router.push(`/productos/${productId}`);
};

  return (
    <>
      <CategorySection>
        <CategoryTitle>COMPRA POR CATEGORIA</CategoryTitle>
        <FilterContainer>
          {categories.map((category, index) => (
            <FilterItem 
              key={index} 
              onClick={() => handleCategoryClick(category.category)}
              active={selectedCategory === category.category}
            >
              <div className="icon-container">
                <Image src={category.image} alt={category.text} width={100} height={100}/>
              </div>
              <p>{category.text}</p>
            </FilterItem>
          ))}
        </FilterContainer>
        <Divider/>
        <ProductSection>
          <h1>TODOS LOS PRODUCTOS</h1>
          <ProductWrapper>
            {sampleProducts.map((product, index) => (
              <ProductCardWrapper 
                key={index}
                onClick={() => navigateToProduct(product.id)}
              >
                <ProductCard 
                  image={product.image}
                  name={product.name}
                  brand={product.brand}
                  price={product.price}
                />
              </ProductCardWrapper>
            ))}
          </ProductWrapper>
          <ViewAllButton onClick={() => router.push('/products/all')}>
            VER TODOS LOS PRODUCTOS
          </ViewAllButton>
        </ProductSection>
      </CategorySection>
      
      <BrandSection>
        <CategoryTitle>COMPRA POR MARCAS</CategoryTitle>
        <BrandFilterContainer>
          {brands.map((brand, index) => (
            <FilterItem 
              key={index}
              onClick={() => handleBrandClick(brand.brand)}
              active={selectedBrand === brand.brand}
            >
              <div className="icon-container">
                <Image src={brand.src} alt={brand.name} width={100} height={100}/>
              </div>
            </FilterItem>
          ))}
        </BrandFilterContainer>
        <Divider/>
        <ProductSection>
          <h1>PRODUCTOS POR MARCA</h1>
          <ProductWrapper>
            {sampleProducts
              .filter(product => !selectedBrand || product.brand.toLowerCase() === selectedBrand)
              .slice(0, 5) 
              .map((product, index) => (
                <ProductCardWrapper 
                  key={index}
                  onClick={() => navigateToProduct(product.id)}
                >
                  <ProductCard 
                    image={product.image}
                    name={product.name}
                    brand={product.brand}
                    price={product.price}
                  />
                </ProductCardWrapper>
              ))}
          </ProductWrapper>
          <ViewAllButton onClick={() => router.push('/brands/all')}>
            VER TODAS LAS MARCAS
          </ViewAllButton>
        </ProductSection>
      </BrandSection>
    </>
  )
}

const CategorySection = styled.section`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  padding: 0 1rem;
  margin-bottom: 3rem;
`
const CategoryTitle = styled.h1`
  margin: 3rem;
  
  @media (max-width: 768px) {
    margin: 2rem;
    font-size: 1.75rem;
  }
`

const BrandSection = styled.section`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  padding: 0 1rem;
  margin-bottom: 3rem;
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
  
  @media (max-width: 576px) {
    gap: 1rem;
  }
`

const BrandFilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
  max-width: 1200px;
`

interface FilterItemProps {
  active?: boolean;
}

const FilterItem = styled.div<FilterItemProps>`
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 8px;
  border: 2px solid transparent;
  
  ${props => props.active && `
    border-color: ${theme.colors.secondary};
    background-color: rgba(104, 171, 68, 0.1);
  `}
  
  .icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  
  p {
    margin-top: 0.5rem;
    font-weight: ${props => props.active ? 'bold' : 'normal'};
    color: ${props => props.active ? theme.colors.secondary : theme.colors.text.primary};
  }
  
  &:hover {
    transform: translateY(-5px);
  }
  
  @media (max-width: 576px) {
    img {
      width: 60px;
      height: 60px;
    }
    
    p {
      font-size: 0.9rem;
    }
  }
`

const Divider = styled.div`
  width: 90%;
  margin: 2rem;
  border: 1px solid ${theme.colors.secondary};
  
  @media (max-width: 768px) {
    margin: 1.5rem;
  }
`

const ProductSection = styled.section`
  margin-bottom: 3rem;
  width: 100%;
  max-width: 1200px;
  
  h1 {
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`

const ProductWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`

const ProductCardWrapper = styled.div`
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`

const ViewAllButton = styled.button`
  background-color: white;
  border: 3px solid ${theme.colors.secondary};
  border-radius: 10px;
  margin: 3rem auto;
  font-size: 1.2rem;
  padding: .75rem 2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  
  &:hover {
    background-color: ${theme.colors.secondary};
    color: white;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: .5rem 1.5rem;
    margin: 2rem auto;
  }
`

export default ProductsPage