"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";


const LogoMarquee = () => {
  const logos = [
    "/BONES@2x.png",
    "/CLUB CABO@2x.png",
    "/FITCAP@2x.png",
    "/GILDAN@2x.png",
    "/JERZEES@2x.png",
    "/OUTDOOR@2x.png",
    "/PUNTO PUNTADA@2x.png",
    "/SPORT CAPS@2x.png"
  ];

  const repeatedLogos = [...logos, ...logos];

  return (
    <MarqueeWrapper>
      <MarqueeContent>
        {repeatedLogos.map((logo, index) => (
          <LogoItem key={index}>
            <Image 
              src={logo} 
              alt={`Partner Logo ${index + 1}`} 
              width={120} 
              height={60}
              style={{ objectFit: "contain" }}
            />
          </LogoItem>
        ))}
      </MarqueeContent>
    </MarqueeWrapper>
  );
};

const MarqueeWrapper = styled.div`
  overflow: hidden;
  position: relative;
  background: #ffffff;
  padding: 1rem 0;
  border-bottom: 1px solid rgb(104, 171, 68);
`;

const MarqueeContent = styled.div`
  display: flex;
  animation: scroll 30s linear infinite;
  align-items: center;

  @keyframes scroll {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`;

const LogoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  margin-right: 4rem;
  flex-shrink: 0;
`;

export default LogoMarquee;