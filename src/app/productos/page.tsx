"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { theme } from "@/styles/globalStyles";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/navigation";

const sampleProducts = [
  {
    id: "1",
    name: "Playera Cuello Redondo",
    brand: "PlayerYTees",
    category: "PLAYERAS",
    image: "/PLAYERA ROJA.svg",
    price: "$150.00",
    branchId: 1,
  },
  {
    id: "2",
    name: "Polo Classic",
    brand: "PlayerYTees",
    category: "POLOS",
    image: "/PLAYERA ROJA.svg",
    price: "$180.00",
    branchId: 1,
  },
  {
    id: "3",
    name: "Gorra Snapback",
    brand: "Sport Caps",
    category: "GORRAS",
    image: "/PLAYERA ROJA.svg",
    price: "$120.00",
    branchId: 1,
  },
  {
    id: "4",
    name: "Sudadera Básica",
    brand: "Gildan",
    category: "SUDADERAS",
    image: "/PLAYERA ROJA.svg",
    price: "$250.00",
    branchId: 1,
  },
  {
    id: "5",
    name: "Uniforme Empresarial",
    brand: "PlayerYTees",
    category: "UNIFORMES",
    image: "/PLAYERA ROJA.svg",
    price: "$350.00",
    branchId: 1,
  },
];

interface Category {
  id: number;
  file: string;
  title: string;
  subtitle: string;
}
interface Branch {
  id: number;
  ManufacturerName: string;
  file: string;
}

const ProductsPage = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  console.log("🦙 ~ ProductsPage ~ products:", products);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiUrl}categories`);
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    const fetchBranches = async () => {
      try {
        const response = await fetch(`${apiUrl}brands`);
        const data = await response.json();
        setBranches(data.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}products?top=5&skip=0`);
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchProducts();
    fetchBranches();
    fetchCategories();
    //eslint-disable-next-line
  }, []);

  const handleCategoryClick = (categoryId: number): void => {
    setSelectedCategory(categoryId);
    setSelectedBrand(0);
  };

  const handleBrandClick = (brandId: number): void => {
    setSelectedBrand(brandId);
    setSelectedCategory(0);
  };

  interface NavigateToProductProps {
    productId: string;
  }

  const navigateToProduct = (
    productId: NavigateToProductProps["productId"]
  ): void => {
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
              onClick={() => handleCategoryClick(category.id)}
              active={selectedCategory === category.id}
            >
              <div className="icon-container">
                <Image
                  src={category.file}
                  alt={category.title}
                  width={100}
                  height={100}
                />
              </div>
              <p style={{ textTransform: "uppercase" }}>{category.title}</p>
            </FilterItem>
          ))}
        </FilterContainer>
        <Divider />
        <ProductSection>
          <h1>TODOS LOS PRODUCTOS</h1>
          <ProductWrapper>
            {products?.map((product, index) => (
              <ProductCardWrapper
                key={index}
                onClick={() => navigateToProduct(product.ItemCode)}
              >
                <ProductCard
                  image={product.file || "/PLAYERA ROJA.svg"}
                  name={product.ItemName}
                  brand={product.brand}
                  price={product.Price}
                />
              </ProductCardWrapper>
            ))}
          </ProductWrapper>
          <ViewAllButton onClick={() => router.push("/products/all")}>
            VER TODOS LOS PRODUCTOS
          </ViewAllButton>
        </ProductSection>
      </CategorySection>

      <BrandSection>
        <CategoryTitle>COMPRA POR MARCAS</CategoryTitle>
        <BrandFilterContainer>
          {branches.map((brand, index) => (
            <FilterItem
              key={index}
              onClick={() => handleBrandClick(brand.id)}
              active={selectedBrand === brand.id}
            >
              <div className="icon-container">
                <Image
                  src={brand.file}
                  alt={brand.ManufacturerName}
                  width={150}
                  height={150}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </FilterItem>
          ))}
        </BrandFilterContainer>
        <Divider />
        <ProductSection>
          <h1>PRODUCTOS POR MARCA</h1>
          <ProductWrapper>
            {sampleProducts
              .filter(
                (product) =>
                  !selectedBrand || product.branchId === selectedBrand
              )
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
          <ViewAllButton onClick={() => router.push("/brands/all")}>
            VER TODAS LAS MARCAS
          </ViewAllButton>
        </ProductSection>
      </BrandSection>
    </>
  );
};

const CategorySection = styled.section`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  padding: 0 1rem;
  margin-bottom: 3rem;
`;
const CategoryTitle = styled.h1`
  margin: 3rem;

  @media (max-width: 768px) {
    margin: 2rem;
    font-size: 1.75rem;
  }
`;

const BrandSection = styled.section`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  padding: 0 1rem;
  margin-bottom: 3rem;
`;

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
`;

const BrandFilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
  max-width: 1200px;
`;

interface FilterItemProps {
  active?: boolean;
}

const FilterItem = styled.div<FilterItemProps>`
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 8px;
  border: 2px solid transparent;

  ${(props) =>
    props.active &&
    `
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
    font-weight: ${(props) => (props.active ? "bold" : "normal")};
    color: ${(props) =>
      props.active ? theme.colors.secondary : theme.colors.text.primary};
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
`;

const Divider = styled.div`
  width: 90%;
  margin: 2rem;
  border: 1px solid ${theme.colors.secondary};

  @media (max-width: 768px) {
    margin: 1.5rem;
  }
`;

const ProductSection = styled.section`
  margin-bottom: 3rem;
  width: 100%;
  max-width: 1200px;

  h1 {
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;

const ProductWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
  margin: 0 auto;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, minmax(200px, 1fr));
  }
  @media (max-width: 992px) {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCardWrapper = styled.div`
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ViewAllButton = styled.button`
  background-color: white;
  border: 3px solid ${theme.colors.secondary};
  border-radius: 10px;
  margin: 3rem auto;
  font-size: 1.2rem;
  padding: 0.75rem 2rem;
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
    padding: 0.5rem 1.5rem;
    margin: 2rem auto;
  }
`;

export default ProductsPage;
