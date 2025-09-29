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
  
  /* Info 블록 내부의 리스트 아이템 색상 강제 설정 */
  li {
    color: ${props => props.theme.mode === 'dark' 
      ? '#e5e7eb !important' 
      : 'rgb(64, 64, 65) !important'};
  }
  
  /* Info 블록 내부의 모든 텍스트 요소 색상 설정 */
  * {
    color: ${props => props.theme.mode === 'dark' 
      ? '#e5e7eb' 
      : 'rgb(64, 64, 65)'};
  }
  
  /* 리스트 아이템의 자식 요소들도 색상 적용 */
  li span {
    color: ${props => props.theme.mode === 'dark' 
      ? '#e5e7eb !important' 
      : 'rgb(64, 64, 65) !important'};
  }
`;

interface InfoBlockProps {
  children: React.ReactNode;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ children }) => {
  const { theme } = useTheme();
  return <Info theme={theme}>{children}</Info>;
};

export default InfoBlock; 