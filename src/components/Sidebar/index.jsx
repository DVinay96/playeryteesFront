import React from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { useCartStore } from "@/stores/cartStore";
import Link from "next/link";

// 📦 Lógica para calcular precio por cantidad
const getPriceByQuantity = (prices, quantity) => {
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

const SideBar = ({ isopen, setIsOpen }) => {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);

  const calculateTotal = () =>
    items.reduce((acc, item) => {
      const unitPrice = getPriceByQuantity(item.prices, item.quantity);
      return acc + unitPrice * item.quantity;
    }, 0);

  const total = calculateTotal();

  return (
    <Container isopen={`${isopen}`}>
      <Header>
        <h2>Tu carrito</h2>
        <CloseIcon onClick={() => setIsOpen(false)} />
      </Header>

      <ItemsWrapper>
        {items.length === 0 ? (
          <EmptyMessage>Tu carrito está vacío 😢</EmptyMessage>
        ) : (
          items.map((item, index) => {
            const unitPrice = getPriceByQuantity(item.prices, item.quantity);
            const subtotal = unitPrice * item.quantity;
            return (
              <Item key={`${item.id}-${item.size}-${item.color}-${index}`}>
                <Image src={item.image} alt={item.name} />
                <Info>
                  <Name>{item.name}</Name>
                  <Variant>
                    Color: <b>{item.color}</b> | Talla: <b>{item.size}</b>
                  </Variant>
                  <Price>Precio unitario: ${unitPrice.toFixed(2)}</Price>
                  <Quantity>Cantidad: {item.quantity}</Quantity>
                  <Total>Subtotal: ${subtotal.toFixed(2)}</Total>
                  <RemoveBtn
                    onClick={() => removeItem(item.id, item.size, item.color)}
                  >
                    Quitar
                  </RemoveBtn>
                </Info>
              </Item>
            );
          })
        )}
      </ItemsWrapper>

      <Footer>
        <TotalText>Total: ${total.toFixed(2)}</TotalText>
        <CheckoutButton href="/checkout" disabled={items.length === 0}>
          Finalizar compra
        </CheckoutButton>
      </Footer>
    </Container>
  );
};

export default SideBar;

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 25vw;
  height: 100vh;
  background-color: #fff;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  transform: ${(props) =>
    props.isopen === "true" ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.3s ease;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 90vw;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CloseIcon = styled(IoMdClose)`
  font-size: 2rem;
  cursor: pointer;
`;

const ItemsWrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding-right: 0.5rem;
`;

const Item = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const Info = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Name = styled.h3`
  margin: 0;
  font-size: 1rem;
`;

const Variant = styled.p`
  font-size: 0.85rem;
  color: #555;
  margin: 0.2rem 0;
`;

const Price = styled.span`
  font-size: 0.9rem;
  color: #555;
`;

const Quantity = styled.span`
  font-size: 0.9rem;
`;

const Total = styled.span`
  font-size: 0.9rem;
  font-weight: bold;
`;

const RemoveBtn = styled.button`
  margin-top: 0.5rem;
  background-color: transparent;
  color: #e74c3c;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = styled.footer`
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const TotalText = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const CheckoutButton = styled(Link)`
  width: 100%;
  background-color: #000;
  color: #fff;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background-color: #333;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const EmptyMessage = styled.p`
  font-size: 1rem;
  text-align: center;
  color: #777;
  margin-top: 4rem;
`;
