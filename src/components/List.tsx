import React from 'react';
import styled, { css } from 'styled-components';
import { FiCheckCircle } from 'react-icons/fi';

const baseListStyle = css`
  padding-left: 0;
  margin: 1rem 0;
  border: 1px solid rgb(110, 111, 111);
`;

const StyledUl = styled.ul`
  ${baseListStyle}
  list-style: none;
`;

const StyledOl = styled.ol`
  ${baseListStyle}
  list-style: none;
`;

const ListItem = styled.li<{$compact?: boolean}>`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: ${({$compact}) => $compact ? '0.4rem 1.2rem' : '0.8rem 1.5rem'};
  font-size: ${({$compact}) => $compact ? '1rem' : '1.08rem'};
  border-bottom: 1px solid rgb(110, 111, 111);
  transition: background 0.15s;

  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: #e0e7ff;
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
  const ListTag = ordered ? StyledOl : StyledUl;
  return (
    <ListTag className={className}>
      {items.map((item, idx) => (
        <ListItem key={idx} $compact={compact}>
          {icon !== undefined
            ? icon
            : ordered
              ? <span style={{color:'#6366f1', fontWeight:600, minWidth:24}}>{idx+1}.</span>
              : <FiCheckCircle style={{color:'#6366f1', minWidth:24}} />}
          <span style={{color:'#333'}}>{renderItem ? renderItem(item, idx) : item}</span>
        </ListItem>
      ))}
    </ListTag>
  );
}

export default List; 