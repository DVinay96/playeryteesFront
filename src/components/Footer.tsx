import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/globalStyles";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

// Styled Components
const FooterContainer = styled.footer`
  background-color: ${theme.colors.primary};
  border-top: 1px solid ${theme.colors.border.light};
  padding: 3rem 2rem;

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 2rem 1rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterHeading = styled.h4`
  font-family: ${theme.typography.fontFamilyBold};
  color: ${theme.colors.text.primary};
  margin-bottom: 1.25rem;
  position: relative;
  padding-bottom: 0.75rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: ${theme.colors.secondary};
  }
`;

const FooterLinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 0.75rem;

  a {
    text-decoration: none;
    color: ${theme.colors.text.secondary};
    font-family: ${theme.typography.fontFamilyRegular};
    transition: color 0.3s ease;
    position: relative;
    padding-left: 0;

    &:hover {
      color: ${theme.colors.secondary};
      padding-left: 10px;
    }

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 2px;
      background-color: ${theme.colors.secondary};
      transition: width 0.3s ease;
      opacity: 0;
    }

    &:hover::before {
      width: 6px;
      opacity: 1;
    }
  }
`;

// Replace custom SVG icons with Lucide icons in the FooterContactItem component
const FooterContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  color: ${theme.colors.text.secondary};

  svg {
    margin-right: 0.75rem;
    margin-top: 0.25rem;
    color: ${theme.colors.secondary};
    flex-shrink: 0;
    width: 18px;
    height: 18px;
  }
`;

const ContactText = styled.span`
  font-family: ${theme.typography.fontFamilyRegular};
`;

const SocialIcons = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f5f5f5;
  color: ${theme.colors.text.primary};
  margin-right: 0.75rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${theme.colors.secondary};
    color: white;
    transform: translateY(-3px);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const BottomBar = styled.div`
  border-top: 1px solid ${theme.colors.border.light};
  margin-top: 2rem;
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: ${theme.colors.text.secondary};
  font-family: ${theme.typography.fontFamilyRegular};

  @media (max-width: ${theme.breakpoints.sm}) {
    margin-bottom: 1rem;
  }
`;

const LegalLinks = styled.div`
  display: flex;

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

const LegalLink = styled.a`
  color: ${theme.colors.text.secondary};
  font-family: ${theme.typography.fontFamilyRegular};
  margin-left: 1.5rem;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${theme.colors.secondary};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    margin: 0.5rem 0;
    margin-left: 0;
  }
`;

const LogoContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const Logo = styled(Image)`
  width: 120px;
  height: 40px;
  background-color: ${theme.colors.background.light};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.typography.fontFamilyBold};
  color: ${theme.colors.text.primary};
  border-radius: 4px;
`;

interface Category {
  id: number;
  file: string;
  title: string;
  subtitle: string;
}

// Delete all the custom SVG icon components (LocationIcon, PhoneIcon, EmailIcon, etc.)
// Footer Component
const Footer = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [categories, setCategories] = useState<Category[]>([]);

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

    fetchCategories();
    //eslint-disable-next-line
  }, []);
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <LogoContainer>
            <Logo
              src="/PLAYERYTEES@2x.png"
              alt="logo"
              width={150}
              height={50}
            />
          </LogoContainer>
          <p
            style={{
              color: theme.colors.text.secondary,
              marginBottom: "1.5rem",
            }}
          >
            Proporcionando productos de calidad y servicio excepcional a
            nuestros clientes desde 1995.
          </p>
          <SocialIcons>
            <SocialIcon href="#" aria-label="Facebook">
              <Facebook size={18} />
            </SocialIcon>
            <SocialIcon href="#" aria-label="Instagram">
              <Instagram size={18} />
            </SocialIcon>
            <SocialIcon href="#" aria-label="Twitter">
              <Twitter size={18} />
            </SocialIcon>
            <SocialIcon href="#" aria-label="LinkedIn">
              <Linkedin size={18} />
            </SocialIcon>
          </SocialIcons>
        </FooterSection>

        <FooterSection>
          <FooterHeading>Enlaces</FooterHeading>
          <FooterLinkList>
            <FooterLink>
              <a href="#nosotros">Nosotros</a>
            </FooterLink>
            <FooterLink>
              <a href="#catalogos">Catálogos</a>
            </FooterLink>
            <FooterLink>
              <a href="#productos">Productos</a>
            </FooterLink>
            <FooterLink>
              <a href="#sucursales">Sucursales</a>
            </FooterLink>
            <FooterLink>
              <a href="#marcas">Marcas</a>
            </FooterLink>
          </FooterLinkList>
        </FooterSection>

        <FooterSection>
          <FooterHeading>Productos</FooterHeading>
          <FooterLinkList>
            {categories.map((category) => (
              <FooterLink key={category.id}>
                <Link href={`/productos?category_id=${category.id}`}>
                  {category.title}
                </Link>
              </FooterLink>
            ))}
          </FooterLinkList>
        </FooterSection>

        <FooterSection>
          <FooterHeading>Contacto</FooterHeading>
          <FooterContactItem>
            <MapPin />
            <ContactText>
              Calle Principal #123, Colonia Centro, Ciudad de México, 12345
            </ContactText>
          </FooterContactItem>
          <FooterContactItem>
            <Phone />
            <ContactText>+52 (55) 1234-5678</ContactText>
          </FooterContactItem>
          <FooterContactItem>
            <Mail />
            <ContactText>contacto@tuempresa.com</ContactText>
          </FooterContactItem>
        </FooterSection>
      </FooterContent>

      <BottomBar>
        <Copyright>
          &copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos
          reservados.
        </Copyright>
        <LegalLinks>
          <LegalLink href="#terminos">Términos y Condiciones</LegalLink>
          <LegalLink href="#privacidad">Política de Privacidad</LegalLink>
        </LegalLinks>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;
