import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import GlobalStyle from './globalStyles.ts'
import { ThemeProvider as CustomThemeProvider, useTheme } from './contexts/ThemeContext'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import 'katex/dist/katex.min.css'

const Root = () => {
  const { theme } = useTheme();
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </StyledThemeProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomThemeProvider>
      <Root />
    </CustomThemeProvider>
  </StrictMode>,
)
