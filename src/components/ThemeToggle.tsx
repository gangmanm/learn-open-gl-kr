import React from 'react';
import styled from 'styled-components';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const ToggleButton = styled.button<{ theme: any }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.text};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.sidebar.hover};
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ToggleButton onClick={toggleTheme} theme={theme}>
      {theme.mode === 'light' ? <FiMoon /> : <FiSun />}
    </ToggleButton>
  );
};

export default ThemeToggle; 