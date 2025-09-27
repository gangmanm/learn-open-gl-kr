import React from 'react';
import styled, { keyframes } from 'styled-components';

const glowAnimation = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 5px rgba(0, 255, 255, 0.5));
  }
  50% {
    filter: drop-shadow(0 0 15px rgba(0, 255, 255, 0.8));
  }
`;

const rotateAnimation = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Courier New', monospace;
  user-select: none;
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  animation: ${rotateAnimation} 8s linear infinite;
  transform-style: preserve-3d;
`;

const Cube = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  animation: ${glowAnimation} 2s ease-in-out infinite;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border: 2px solid;
    border-image: linear-gradient(45deg, #00ffff, #ff00ff, #ffff00, #00ffff) 1;
    background: linear-gradient(45deg, 
      rgba(0, 255, 255, 0.1), 
      rgba(255, 0, 255, 0.1), 
      rgba(255, 255, 0, 0.1)
    );
  }
  
  &::before {
    transform: rotateY(0deg) translateZ(20px);
  }
  
  &::after {
    transform: rotateY(90deg) translateZ(20px);
  }
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.2;
`;

const MainText = styled.span`
  font-size: 24px;
  font-weight: bold;
  background: linear-gradient(45deg, #00ffff, #ff00ff, #ffff00);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
`;

const SubText = styled.span`
  font-size: 12px;
  color: #888;
  font-weight: normal;
  margin-top: -2px;
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
  const sizeMultiplier = size === 'small' ? 0.7 : size === 'large' ? 1.3 : 1;
  
  return (
    <LogoContainer 
      className={className}
      style={{ transform: `scale(${sizeMultiplier})` }}
    >
      <LogoIcon>
        <Cube />
      </LogoIcon>
      <LogoText>
        <MainText>OpenGL</MainText>
        {showSubtext && <SubText>Learn Korean</SubText>}
      </LogoText>
    </LogoContainer>
  );
};

export default Logo;
