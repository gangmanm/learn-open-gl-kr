import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Courier New', monospace;
  user-select: none;
`;

const LogoIcon = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.2;
`;

const MainText = styled.span<{ theme: any }>`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  transition: color 0.3s ease;
`;

const SubText = styled.span<{ theme: any }>`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
  font-weight: normal;
  margin-top: -2px;
  transition: color 0.3s ease;
`;

interface LogoProps {
  showSubtext?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  showSubtext = true, 
  size = 'medium',
  className 
}) => {
  const { theme } = useTheme();
  const sizeMultiplier = size === 'small' ? 0.7 : size === 'large' ? 1.3 : 1;
  
  return (
    <LogoContainer 
      className={className}
      style={{ transform: `scale(${sizeMultiplier})` }}
    >
      <LogoIcon 
        src="/Logo.png" 
        alt="OpenGL Logo"
        style={{ 
          width: `${80 * sizeMultiplier}px`, 
          height: `${80 * sizeMultiplier}px` 
        }}
      />
      <LogoText>
        <MainText theme={theme}>OpenGL</MainText>
        {showSubtext && <SubText theme={theme}>Learn Korean</SubText>}
      </LogoText>
    </LogoContainer>
  );
};

export default Logo;
