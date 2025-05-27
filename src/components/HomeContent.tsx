"use client";
import React from "react";
import styled from "styled-components";
import LogoMarquee from "./Marquee";
import ProductCard from "./ProductCard";
import { theme } from "@/styles/globalStyles";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
interface Banner {
  id: number;
  file: string;
  title: string;
  subtitle: string;
  color: string;
  isXl: boolean;
}

interface TopProduct {
  id: number;
  name: string;
  stars: number;
  inStock: boolean;
  price: number;
  priceOld: number;
  discount: number;
  numberReviews: number;
  brand: string;
  file: string;
}

const HomeContent = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [banner, setBanners] = useState<Banner[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(`${apiUrl}banners`);
        const data = await response.json();
        const newData = data.data;
        setBanners(newData);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    const fetchTopProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}top-products`);
        const data = await response.json();
        setTopProducts(data.data);
      } catch (error) {
        console.error("Error fetching topProducts:", error);
      }
    };

    fetchBanners();
    fetchTopProducts();
    //eslint-disable-next-line
  }, []);

  if (banner.length === 0 || topProducts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <JumbotronSection>
        <div className="image-container">
          <Image
            src={banner[0]?.file}
            alt="shirts"
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
      </JumbotronSection>

      <LogoMarquee />

      <TopProductSection>
        <h1>LOS MÁS VENDIDOS</h1>
        <CardWrapper>
          {topProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.file}
              name={product.name}
              brand={product.brand}
              price={product.price.toString()}
            />
          ))}
        </CardWrapper>
        
        <Link href="/productos">
          <ProductButton>Ver todos los productos</ProductButton>
        </Link>
      </TopProductSection>

      <LowerJumbotron>
        <div className="image-container">
          <Image
            src={banner[1]?.file}
            alt="shirts"
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
      </LowerJumbotron>
    </>
  );
};

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
`;

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
`;

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
`;

const ProductButton = styled.button`
  background-color: white;
  border: 3px solid ${theme.colors.secondary};
  border-radius: 10px;
  margin: 3rem;
  font-size: 1.2rem;
  padding: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

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
`;

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
`;

export default HomeContent;
