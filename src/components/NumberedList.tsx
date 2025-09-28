import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const ListContainer = styled.ol<{ theme: any }>`
  list-style: none;
  counter-reset: item;
  padding: 0;
  margin: 20px 0;
`;

const ListItem = styled.li<{ theme: any }>`
  counter-increment: item;
  margin-bottom: 16px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  position: relative;
  
  &::before {
    content: counter(item);
    background: ${props => props.theme.mode === 'dark' 
      ? '#4a5568'
      : '#718096'
    };
    color: white;
    font-weight: 600;
    font-size: 13px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s ease;
  }
  
  &:hover::before {
    background: ${props => props.theme.mode === 'dark' 
      ? '#5a6578'
      : '#8a95a6'
    };
  }
`;

const ItemContent = styled.div<{ theme: any }>`
  flex: 1;
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
  padding-top: 2px;
  
  p {
    margin: 0 0 8px 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  strong {
    color: ${props => props.theme.colors.primary};
  }
  
  code {
    background: ${props => props.theme.colors.code.background};
    color: ${props => props.theme.colors.code.text};
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
    font-size: 13px;
  }
`;

interface NumberedListProps {
  children: React.ReactNode;
  className?: string;
  startFrom?: number;
}

const NumberedList: React.FC<NumberedListProps> = ({ 
  children, 
  className,
  startFrom = 1 
}) => {
  const { theme } = useTheme();

  return (
    <ListContainer 
      theme={theme} 
      className={className}
      style={{ counterReset: `item ${startFrom - 1}` }}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === NumberedItem) {
          return React.cloneElement(child, { theme });
        }
        return (
          <ListItem theme={theme}>
            <ItemContent theme={theme}>
              {child}
            </ItemContent>
          </ListItem>
        );
      })}
    </ListContainer>
  );
};

interface NumberedItemProps {
  children: React.ReactNode;
  theme?: any;
}

const NumberedItem: React.FC<NumberedItemProps> = ({ children, theme }) => {
  const currentTheme = useTheme().theme;
  const appliedTheme = theme || currentTheme;

  return (
    <ListItem theme={appliedTheme}>
      <ItemContent theme={appliedTheme}>
        {children}
      </ItemContent>
    </ListItem>
  );
};

// 개별 아이템 컴포넌트도 export
export { NumberedItem };
export default NumberedList;
