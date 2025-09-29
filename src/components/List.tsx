import React from 'react';
import styled, { css } from 'styled-components';
import { FiCheckCircle } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const baseListStyle = css<{ theme: any }>`
  padding-left: 0;
  margin: 1rem 0;
  border: 1px solid ${props => props.theme.colors.border};
`;

const StyledUl = styled.ul<{ theme: any }>`
  ${baseListStyle}
  list-style: none;
`;

const StyledOl = styled.ol<{ theme: any }>`
  ${baseListStyle}
  list-style: none;
`;

const ListItem = styled.li<{$compact?: boolean; theme: any}>`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: ${({$compact}) => $compact ? '0.4rem 1.2rem' : '0.8rem 1.5rem'};
  font-size: ${({$compact}) => $compact ? '1rem' : '1.08rem'};
  border-bottom: 1px solid ${props => props.theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

type ListProps = {
  items: React.ReactNode[];
  ordered?: boolean;
  renderItem?: (item: React.ReactNode, idx: number) => React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  compact?: boolean;
};

function List({
  items,
  ordered = false,
  renderItem,
  className,
  icon,
  compact = false,
}: ListProps) {
  const { theme } = useTheme();
  const ListTag = ordered ? StyledOl : StyledUl;
  return (
    <ListTag className={className} theme={theme}>
      {items.map((item, idx) => (
        <ListItem key={idx} $compact={compact} theme={theme}>
          {icon !== undefined
            ? icon
            : ordered
              ? <span style={{color: theme.colors.primary, fontWeight:600, minWidth:24}}>{idx+1}.</span>
              : <FiCheckCircle style={{color: theme.colors.primary, minWidth:24}} />}
          <span style={{color: theme.colors.text}}>{renderItem ? renderItem(item, idx) : item}</span>
        </ListItem>
      ))}
    </ListTag>
  );
}

export default List; 