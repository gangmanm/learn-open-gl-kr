import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const Info = styled.div<{ theme: any }>`
  background: ${props => props.theme.mode === 'dark' 
    ? 'rgba(34, 197, 94, 0.15)' 
    : 'rgb(161, 226, 170)'};
  border: 1px solid ${props => props.theme.mode === 'dark' 
    ? 'rgba(34, 197, 94, 0.4)' 
    : 'rgb(28, 157, 133)'};
  padding: 1em;
  border-radius: 6px;
  white-space: pre-wrap;
  margin: 1em 0;
  color: ${props => props.theme.mode === 'dark' 
    ? '#e5e7eb' 
    : 'rgb(64, 64, 65)'};
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
  
  /* 자식은 기본적으로 상위 색을 상속하되, 특정 색상 컴포넌트는 유지 */
  & * {
    color: inherit;
  }
  
  &[data-info] [data-color-text="true"] {
    color: inherit;
  }
`;

interface InfoBlockProps {
  children: React.ReactNode;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ children }) => {
  const { theme } = useTheme();
  return <Info theme={theme} data-info>{children}</Info>;
};

export default InfoBlock; 