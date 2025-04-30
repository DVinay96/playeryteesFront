import { createGlobalStyle } from 'styled-components';

// Theme configuration
export const theme = {
  colors: {
    // Main brand colors based on Pantone references
    primary: 'white', // Main color (white)
    secondary: 'rgb(104, 171, 68)', // 361CP (green)
    accent1: '#E8765D', // 179-7C (orange/coral)
    accent2: '#F5F1E8', // 1-1C (cream)
    accent3: '#A93D27', // 179-9C (red)
    accent4: '#5F1D11', // 179-11C (dark red)
    
    // UI colors
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    background: {
      main: 'white',
      light: '#f8f9fa',
    },
    border: {
      light: '#e6e6e6',
    }
  },
  
  // NORDSTERN font family
  typography: {
    fontFamily: "'NORDSTERN NORMAL', 'NORDSTERN HELL', 'NORDSTERN DUNKEL', sans-serif",
    fontFamilyLight: "'NORDSTERN HELL', 'NORDSTERN NORMAL', sans-serif",
    fontFamilyRegular: "'NORDSTERN NORMAL', sans-serif",
    fontFamilyBold: "'NORDSTERN DUNKEL', 'NORDSTERN NORMAL', sans-serif",
  },
  
  // Responsive breakpoints
  breakpoints: {
    xs: '480px',
    sm: '768px',
    md: '992px',
    lg: '1200px',
  },
};

// Global styles
export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: ${theme.typography.fontFamily};
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.background.main};
  }
  
  a {
    color: ${theme.colors.secondary};
    text-decoration: none;
    
    &:hover {
      color: ${theme.colors.text.primary};
    }
  }
  
  ::selection {
    background-color: ${theme.colors.secondary};
    color: white;
  }
`;
