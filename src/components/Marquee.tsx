"use client";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Branch {
  id: number;
  name: string;
  file: string;
}

const LogoMarquee = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch(`${apiUrl}brands`);
        const data = await response.json();
        setBranches(data.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchBranches();
  }, []);

  const repeatedLogos = [...branches, ...branches];

  return (
    <MarqueeWrapper>
      <MarqueeContent>
        {repeatedLogos.map((logo, index) => (
          <LogoItem key={index}>
            <Image
              src={logo.file}
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
