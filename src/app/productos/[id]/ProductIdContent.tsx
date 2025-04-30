'use client'
import React, { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import { theme } from '@/styles/globalStyles'

interface ColorType {
  name: string;
  hex: string;
}

interface PriceType {
  quantity: string;
  price: string;
}

interface ProductType {
  _id: string;
  name: string;
  brand: string;
  code?: string;
  description: string;
  mainImage: string;
  sizes: string[];
  weight: string;
  fabric: string;
  composition: string;
  colors: ColorType[];
  prices: PriceType[];
}

interface ProductDetailProps {
  product: ProductType;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1]); // Default to Medium or second size

  return (
    <ProductContainer>
      <ProductImageSection>
        <div className="image-container">
          <Image 
            src={product.mainImage} 
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </ProductImageSection>
      
      <ProductInfoSection>
        <ProductHeader>
          <BrandName>{product.brand}</BrandName>
          <ProductName>{product.name}</ProductName>
          {product.code && <ProductCode>Código: {product.code}</ProductCode>}
          <ProductDescription>
            {product.description}
          </ProductDescription>
        </ProductHeader>
        
        <ProductSpecs>
          <SpecTitle>Especificaciones</SpecTitle>
          <SpecGrid>
            <SpecItem>
              <SpecLabel>Tallas Disponibles</SpecLabel>
              <SizesContainer>
                {product.sizes.map(size => (
                  <SizeButton 
                    key={size} 
                    selected={size === selectedSize}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </SizeButton>
                ))}
              </SizesContainer>
            </SpecItem>
            
            <SpecItem>
              <SpecLabel>Peso</SpecLabel>
              <SpecValue>{product.weight}</SpecValue>
            </SpecItem>
            
            <SpecItem>
              <SpecLabel>Tela</SpecLabel>
              <SpecValue>{product.fabric}</SpecValue>
            </SpecItem>
            
            <SpecItem>
              <SpecLabel>Composición</SpecLabel>
              <SpecValue>{product.composition}</SpecValue>
            </SpecItem>
          </SpecGrid>
        </ProductSpecs>
        
        <ColorSection>
          <SpecLabel>Colores Disponibles</SpecLabel>
          <ColorsContainer>
            {product.colors.map(color => (
              <ColorButton 
                key={color.name}
                color={color.hex}
                selected={color.name === selectedColor.name}
                onClick={() => setSelectedColor(color)}
                aria-label={`Color ${color.name}`}
              />
            ))}
          </ColorsContainer>
          <SelectedColorName>{selectedColor.name}</SelectedColorName>
        </ColorSection>
        
        <PriceSection>
          <SpecTitle>Precios por Volumen</SpecTitle>
          <PriceTable>
            <thead>
              <tr>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
              </tr>
            </thead>
            <tbody>
              {product.prices.map((price, index) => (
                <tr key={index}>
                  <td>{price.quantity}</td>
                  <td>{price.price}</td>
                </tr>
              ))}
            </tbody>
          </PriceTable>
        </PriceSection>
        
        <BuySection>
          <BuyButton href={`/cotizar/${product._id}?color=${selectedColor.name}&size=${selectedSize}`}>
            COTIZAR AHORA
          </BuyButton>
        </BuySection>
      </ProductInfoSection>
    </ProductContainer>
  )
}

// Styled Components
const ProductContainer = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 3rem auto;
  padding: 0 1rem;
  
  @media (max-width: 992px) {
    flex-direction: column;
    margin: 2rem auto;
  }
`;

const ProductImageSection = styled.div`
  flex: 1;
  position: relative;
  
  .image-container {
    position: relative;
    width: 100%;
    height: 600px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 992px) {
    .image-container {
      height: 400px;
    }
  }
  
  @media (max-width: 576px) {
    .image-container {
      height: 300px;
    }
  }
`;

const ProductInfoSection = styled.div`
  flex: 1;
  padding-left: 3rem;
  
  @media (max-width: 992px) {
    padding-left: 0;
    margin-top: 2rem;
  }
`;

const ProductHeader = styled.div`
  margin-bottom: 2rem;
`;

const BrandName = styled.h3`
  font-size: 1.2rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: 0.5rem;
`;

const ProductName = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.text.primary};
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ProductCode = styled.p`
  font-size: 1rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: 1rem;
`;

const ProductDescription = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
`;

const ProductSpecs = styled.div`
  margin-bottom: 2rem;
`;

const SpecTitle = styled.h2`
  font-size: 1.5rem;
  color: ${theme.colors.text.primary};
  margin-bottom: 1rem;
  position: relative;
  padding-bottom: 0.5rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background-color: ${theme.colors.secondary};
  }
`;

const SpecGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const SpecItem = styled.div`
  margin-bottom: 1rem;
`;

const SpecLabel = styled.h4`
  font-size: 1rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: 0.5rem;
`;

const SpecValue = styled.p`
  font-size: 1rem;
  color: ${theme.colors.text.primary};
`;

const SizesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SizeButton = styled.button<{ selected: boolean }>`
  padding: 0.5rem 0.75rem;
  background-color: ${props => props.selected ? theme.colors.secondary : 'white'};
  color: ${props => props.selected ? 'white' : theme.colors.text.primary};
  border: 1px solid ${props => props.selected ? theme.colors.secondary : '#e0e0e0'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${theme.colors.secondary};
  }
`;

const ColorSection = styled.div`
  margin-bottom: 2rem;
`;

const ColorsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const ColorButton = styled.button<{ color: string; selected: boolean }>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 2px solid ${props => props.selected ? theme.colors.secondary : '#e0e0e0'};
  cursor: pointer;
  transition: transform 0.3s ease;
  box-shadow: ${props => props.selected ? '0 0 0 2px white, 0 0 0 4px ' + theme.colors.secondary : 'none'};
  
  &:hover {
    transform: scale(1.1);
  }
`;

const SelectedColorName = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  margin-top: 0.5rem;
`;

const PriceSection = styled.div`
  margin-bottom: 2rem;
`;

const PriceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
  }
  
  th {
    font-weight: bold;
    color: ${theme.colors.text.primary};
    background-color: #f8f9fa;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
  
  tr:hover td {
    background-color: #f8f9fa;
  }
`;

const BuySection = styled.div`
  margin-top: 2rem;
`;

const BuyButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: ${theme.colors.secondary};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease;
  text-align: center;
  
  &:hover {
    background-color: #5ca53e; /* Darker version of the secondary color */
  }
  
  @media (max-width: 576px) {
    width: 100%;
  }
`;

export default ProductDetail;