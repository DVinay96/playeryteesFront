"use client";

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Download, X } from "lucide-react";

interface Catalog {
  id: number;
  title: string;
  file: string;
  file_img: string;
}

const PRIMARY_COLOR = "white";
const SECONDARY_COLOR = "rgb(104, 171, 68)";

const CatalogCarousel = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCatalog, setSelectedCatalog] = useState<Catalog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);
  const sliderRef = useRef(null);
  const totalItems = catalogs.length;
  const maxIndex = totalItems - itemsPerView;

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const response = await fetch(`${apiUrl}catalogs`);
        const data = await response.json();
        setCatalogs(data.data);
      } catch (error) {
        console.error("Error fetching catalogs:", error);
      }
    };

    fetchCatalogs();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const calculateItemsPerView = () => {
      return window.innerWidth > 992 ? 3 : window.innerWidth > 576 ? 2 : 1;
    };

    setItemsPerView(calculateItemsPerView());

    const handleResize = () => {
      const newItemsPerView = calculateItemsPerView();
      setItemsPerView(newItemsPerView);

      if (activeIndex > totalItems - newItemsPerView) {
        setActiveIndex(Math.max(0, totalItems - newItemsPerView));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex, totalItems]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const handlePrevClick = () => {
    setActiveIndex(Math.max(0, activeIndex - 1));
  };

  const handleNextClick = () => {
    setActiveIndex(Math.min(maxIndex, activeIndex + 1));
  };

  const openModal = (catalog: Catalog): void => {
    setSelectedCatalog(catalog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <CarouselSection>
      <CarouselTitle>Nuestros Catálogos</CarouselTitle>

      <CarouselContainer>
        <NavigationButton
          className="left"
          onClick={handlePrevClick}
          disabled={activeIndex === 0}
          aria-label="Previous catalog"
        >
          <ChevronLeft size={24} />
        </NavigationButton>

        <CarouselSlider
          ref={sliderRef}
          style={{
            transform: `translateX(-${activeIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {catalogs.map((catalog) => (
            <CatalogItem key={catalog.id} onClick={() => openModal(catalog)}>
              <CatalogImageContainer>
                <Image
                  src={catalog.file_img}
                  alt={catalog.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </CatalogImageContainer>
              <CatalogInfo>
                <CatalogTitle>{catalog.title}</CatalogTitle>
              </CatalogInfo>
            </CatalogItem>
          ))}
        </CarouselSlider>

        <NavigationButton
          className="right"
          onClick={handleNextClick}
          disabled={activeIndex >= maxIndex}
          aria-label="Next catalog"
        >
          <ChevronRight size={24} />
        </NavigationButton>
      </CarouselContainer>

      <ModalOverlay isOpen={isModalOpen} onClick={closeModal}>
        <ModalContent isOpen={isModalOpen} onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={closeModal} aria-label="Close modal">
            <X size={24} />
          </CloseButton>

          {selectedCatalog && (
            <>
              <ModalImageContainer>
                <Image
                  src={selectedCatalog.file_img}
                  alt={selectedCatalog.title}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </ModalImageContainer>

              <ModalInfo>
                <ModalTitle>{selectedCatalog.title}</ModalTitle>
                <DownloadButton href={selectedCatalog.file} download>
                  <Download size={20} />
                  Descargar Catálogo
                </DownloadButton>
              </ModalInfo>
            </>
          )}
        </ModalContent>
      </ModalOverlay>
    </CarouselSection>
  );
};

const CarouselSection = styled.section`
  padding: 4rem 2rem;
  background-color: #f8f9fa;
  position: relative;
`;

const CarouselTitle = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  color: #333;
  position: relative;
  padding-bottom: 1rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background-color: ${SECONDARY_COLOR};
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 80%;
  margin: 0 auto;
  overflow: hidden;
`;

const CarouselSlider = styled.div`
  display: flex;
  transition: transform 0.5s ease;
`;

const CatalogItem = styled.div`
  flex: 0 0 calc(33.333% - 2rem);
  margin: 0 1rem;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: ${PRIMARY_COLOR};
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 992px) {
    flex: 0 0 calc(50% - 2rem);
  }

  @media (max-width: 576px) {
    flex: 0 0 calc(100% - 2rem);
  }
`;

const CatalogImageContainer = styled.div`
  position: relative;
  height: 300px;
  width: 100%;
  background-color: #f0f0f0;
`;

const CatalogInfo = styled.div`
  padding: 1.5rem;
  background-color: ${PRIMARY_COLOR};
`;

const CatalogTitle = styled.h3`
  margin: 0;
  color: #333;
  font-size: 1.2rem;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${PRIMARY_COLOR};
  color: #333;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 2;

  &:hover {
    background-color: ${SECONDARY_COLOR};
    color: ${PRIMARY_COLOR};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: #f0f0f0;
    color: #aaa;
  }

  &.left {
    left: 5px;
  }

  &.right {
    right: 5px;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

interface ModalOverlayProps {
  isOpen: boolean;
}

const ModalOverlay = styled.div<ModalOverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
`;

interface ModalContentProps {
  isOpen: boolean;
}

const ModalContent = styled.div<ModalContentProps>`
  background-color: ${PRIMARY_COLOR};
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow: auto;
  position: relative;
  transform: ${({ isOpen }) => (isOpen ? "scale(1)" : "scale(0.9)")};
  transition: transform 0.3s ease;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  z-index: 2;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const ModalImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;

  @media (max-width: 768px) {
    height: 400px;
  }

  @media (max-width: 576px) {
    height: 300px;
  }
`;

const ModalInfo = styled.div`
  padding: 2rem;
  text-align: center;
`;

const ModalTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 2rem;
  background-color: ${SECONDARY_COLOR};
  color: ${PRIMARY_COLOR};
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease;

  svg {
    margin-right: 8px;
  }

  &:hover {
    background-color: #5ca53e; /* Darker version of the secondary color */
  }
`;

export default CatalogCarousel;
