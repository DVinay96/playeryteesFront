'use client'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { theme } from '@/styles/globalStyles'

interface ColorType {
  name: string;
  hex: string;
}

interface ProductType {
  _id: string;
  name: string;
  brand: string;
  description: string;
  mainImage: string;
  sizes: string[];
  colors: ColorType[];
}

interface OrderItem {
  colorName: string;
  size: string;
  quantity: number;
}

interface PurchaseModalProps {
  product: ProductType;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (items: OrderItem[]) => void;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({ 
  product, 
  isOpen, 
  onClose,
  onAddToCart
}) => {
  const [quantities, setQuantities] = useState<Record<string, Record<string, number>>>({});
  
  // Initialize quantities state with 0 for all color/size combinations
  useEffect(() => {
    const initialQuantities: Record<string, Record<string, number>> = {};
    
    product.colors.forEach(color => {
      initialQuantities[color.name] = {};
      product.sizes.forEach(size => {
        initialQuantities[color.name][size] = 0;
      });
    });
    
    setQuantities(initialQuantities);
  }, [product]);
  
  const handleQuantityChange = (colorName: string, size: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setQuantities(prev => ({
      ...prev,
      [colorName]: {
        ...prev[colorName],
        [size]: numValue
      }
    }));
  };
  
  const handleAddToCart = () => {
    const items: OrderItem[] = [];
    
    // Convert quantities object to array of OrderItems with quantity > 0
    Object.entries(quantities).forEach(([colorName, sizes]) => {
      Object.entries(sizes).forEach(([size, quantity]) => {
        if (quantity > 0) {
          items.push({
            colorName,
            size,
            quantity
          });
        }
      });
    });
    
    if (items.length > 0) {
      onAddToCart(items);
      onClose();
    } else {
      alert('Por favor seleccione al menos un producto');
    }
  };
  
  // Calculate total items selected
  const totalItems = Object.values(quantities).reduce((total, sizes) => {
    return total + Object.values(sizes).reduce((sum, quantity) => sum + quantity, 0);
  }, 0);
  
  if (!isOpen) return null;
  
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{product.name}</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        
        <ModalDescription>{product.description}</ModalDescription>
        
        <OrderTableContainer>
          <OrderTable>
            <thead>
              <tr>
                <th>Color</th>
                {product.sizes.map(size => (
                  <th key={size}>{size}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {product.colors.map(color => (
                <tr key={color.name}>
                  <td>
                    <ColorLabel>
                      <ColorSwatch color={color.hex} />
                      {color.name}
                    </ColorLabel>
                  </td>
                  {product.sizes.map(size => (
                    <td key={`${color.name}-${size}`}>
                      <QuantityInput
                        type="number"
                        min="0"
                        value={quantities[color.name]?.[size] || 0}
                        onChange={(e) => handleQuantityChange(color.name, size, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </OrderTable>
        </OrderTableContainer>
        
        <ModalFooter>
          <OrderSummary>
            Total seleccionado: <strong>{totalItems} unidades</strong>
          </OrderSummary>
          <AddToCartButton onClick={handleAddToCart}>
            Agregar al Carrito
          </AddToCartButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  )
}

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: ${theme.colors.text.primary};
  font-size: 1.8rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${theme.colors.text.secondary};
  
  &:hover {
    color: ${theme.colors.secondary};
  }
`;

const ModalDescription = styled.p`
  color: ${theme.colors.text.secondary};
  margin-bottom: 1.5rem;
`;

const OrderTableContainer = styled.div`
  overflow-x: auto;
  margin-bottom: 1.5rem;
`;

const OrderTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 0.75rem;
    text-align: center;
    border-bottom: 1px solid #e0e0e0;
  }
  
  th {
    background-color: #f8f9fa;
    font-weight: bold;
    color: ${theme.colors.text.primary};
  }
  
  th:first-child, td:first-child {
    text-align: left;
    min-width: 140px;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
  
  tr:hover td {
    background-color: #f8f9fa;
  }
`;

const ColorLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ColorSwatch = styled.div<{ color: string }>`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 1px solid #e0e0e0;
`;

const QuantityInput = styled.input`
  width: 60px;
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  text-align: center;
  
  &:focus {
    border-color: ${theme.colors.secondary};
    outline: none;
  }
  
  &::-webkit-inner-spin-button, 
  &::-webkit-outer-spin-button {
    opacity: 1;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const OrderSummary = styled.div`
  color: ${theme.colors.text.secondary};
  font-size: 1.1rem;
`;

const AddToCartButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${theme.colors.secondary};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #5ca53e; /* Darker version of the secondary color */
  }
  
  @media (max-width: 576px) {
    width: 100%;
  }
`;

export default PurchaseModal;