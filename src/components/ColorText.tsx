import React from 'react';
import styled from 'styled-components';

interface ColorTextProps {
  color: 'red' | 'green' | 'blue';
  children: React.ReactNode;
}

const StyledSpan = styled.span<{ $color: string }>`
  color: ${props => props.$color};
  font-weight: inherit;
`;

const ColorText: React.FC<ColorTextProps> = ({ color, children }) => {
  const colorMap = {
    red: '#ef4444',
    green: '#22c55e',
    blue: '#3b82f6'
  };

  return (
    <StyledSpan $color={colorMap[color]}>
      {children}
    </StyledSpan>
  );
};

export default ColorText;

// 편의를 위한 개별 컴포넌트들
export const Red: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ColorText color="red">{children}</ColorText>
);

export const Green: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ColorText color="green">{children}</ColorText>
);

export const Blue: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ColorText color="blue">{children}</ColorText>
);