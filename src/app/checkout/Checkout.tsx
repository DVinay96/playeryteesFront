"use client";

import React from "react";
import styled from "styled-components";
import { useCartStore } from "@/stores/cartStore";

// Helpers
const getPriceByQuantity = (prices: any, quantity: any) => {
  for (const range of prices) {
    const [min, max] = range.quantity.includes("+")
      ? [parseInt(range.quantity), Infinity]
      : range.quantity.split("-").map(Number);

    if (quantity >= min && quantity <= max) {
      return parseFloat(range.price.replace("$", ""));
    }
  }
  return parseFloat(prices[0].price.replace("$", ""));
};

const CheckoutPage: React.FC = () => {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = items.reduce((acc, item) => {
    const unitPrice = getPriceByQuantity(item.prices, item.quantity);
    return acc + unitPrice * item.quantity;
  }, 0);

  const handlePayment = () => {
    alert("✅ Pedido confirmado (simulado)");
    clearCart();
  };

  return (
    <PageContainer>
      <LeftColumn>
        <h2>Resumen del pedido</h2>
        {items.length === 0 ? (
          <EmptyMessage>No hay productos en el carrito.</EmptyMessage>
        ) : (
          items.map((item, index) => {
            const unitPrice = getPriceByQuantity(item.prices, item.quantity);
            const subtotal = unitPrice * item.quantity;

            return (
              <Item key={`${item.id}-${item.size}-${item.color}-${index}`}>
                <img src={item.image} alt={item.name} />
                <div>
                  <strong>{item.name}</strong>
                  <p>
                    Color: {item.color} | Talla: {item.size}
                  </p>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Precio unitario: ${unitPrice.toFixed(2)}</p>
                  <p>
                    <strong>Subtotal: ${subtotal.toFixed(2)}</strong>
                  </p>
                </div>
              </Item>
            );
          })
        )}
        <Total>Total: ${total.toFixed(2)}</Total>
      </LeftColumn>

      <RightColumn>
        <h2>Información de pago</h2>

        <FormSection>
          <label>Nombre completo</label>
          <input type="text" placeholder="Juan Pérez" />

          <label>Correo electrónico</label>
          <input type="email" placeholder="juan@example.com" />

          <label>Dirección de envío</label>
          <input type="text" placeholder="Calle, número, ciudad" />

          <label>Teléfono</label>
          <input type="tel" placeholder="55 1234 5678" />
        </FormSection>

        <h3>Datos de tarjeta</h3>
        <FormSection>
          <label>Número de tarjeta</label>
          <input type="text" placeholder="4242 4242 4242 4242" />

          <CardRow>
            <div>
              <label>Expira</label>
              <input type="text" placeholder="MM/AA" />
            </div>
            <div>
              <label>CVC</label>
              <input type="text" placeholder="123" />
            </div>
          </CardRow>
        </FormSection>

        <ConfirmButton onClick={handlePayment}>Confirmar pago</ConfirmButton>
      </RightColumn>
    </PageContainer>
  );
};

export default CheckoutPage;

const PageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const LeftColumn = styled.div`
  flex: 1;
  min-width: 300px;

  h2 {
    margin-bottom: 1rem;
  }
`;

const RightColumn = styled.div`
  flex: 1;
  min-width: 300px;

  h2,
  h3 {
    margin-bottom: 1rem;
  }
`;

const Item = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 6px;
  }

  div {
    display: flex;
    flex-direction: column;
  }
`;

const Total = styled.h3`
  margin-top: 2rem;
  text-align: right;
`;

const EmptyMessage = styled.p`
  color: #666;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;

  label {
    font-weight: 500;
  }

  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
  }
`;

const CardRow = styled.div`
  display: flex;
  gap: 1rem;

  div {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

const ConfirmButton = styled.button`
  width: 100%;
  background: black;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #333;
  }
`;
