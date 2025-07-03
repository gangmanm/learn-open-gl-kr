import React, { useState } from 'react';
import styled from 'styled-components';

const DirectoryList = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
  margin: 1.5rem 0;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Mono', 'Droid Sans Mono', 'Source Code Pro', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #eaecef;

  h4 {
    margin: 0 0 1.5rem 0;
    color: #1a73e8;
    font-size: 1.2rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #e1e4e8;

    &:before {
      content: "📂";
      font-size: 1.4rem;
    }
  }
`;

const DirectoryItem = styled.div<{ depth: number; isStyleFile: boolean }>`
  padding: 0.4rem 0;
  padding-left: ${props => props.depth * 24}px;
  display: flex;
  align-items: center;
  position: relative;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f1f4f9;
    border-radius: 4px;
  }

  &:not(:last-child) {
    margin-bottom: 0.2rem;
  }

  ${props => props.depth > 0 && `
    &:before {
      content: "";
      position: absolute;
      left: ${(props.depth - 1) * 24 + 12}px;
      top: 0;
      width: 2px;
      height: 100%;
      background-color: #e1e4e8;
    }

    &:after {
      content: "";
      position: absolute;
      left: ${(props.depth - 1) * 24 + 12}px;
      top: 50%;
      width: 12px;
      height: 2px;
      background-color: #e1e4e8;
    }
  `}
`;

const DirectoryIcon = styled.span<{ isDirectory: boolean; isStyleFile: boolean }>`
  color: ${props => {
    if (props.isStyleFile) return '#1a73e8';
    return props.isDirectory ? '#1a73e8' : '#57606a';
  }};
  margin-right: 12px;
  font-size: 1.1rem;
  min-width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DirectoryName = styled.span<{ isDirectory: boolean; isStyleFile: boolean }>`
  color: ${props => {
    if (props.isStyleFile) return '#1a73e8';
    return props.isDirectory ? '#1a73e8' : '#24292f';
  }};
  font-weight: ${props => (props.isDirectory || props.isStyleFile) ? '600' : 'normal'};
  margin-right: 12px;
  flex-shrink: 0;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: ${props => {
    if (props.isStyleFile) return '#e8f0fe';
    return props.isDirectory ? '#e8f0fe' : 'transparent';
  }};
`;

const DirectoryDescription = styled.span<{ isStyleFile: boolean }>`
  color: ${props => props.isStyleFile ? '#1a73e8' : '#57606a'};
  font-style: italic;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 0.85rem;
  margin-left: 4px;
  padding: 2px 8px;
  background-color: ${props => props.isStyleFile ? '#f8f9fa' : '#f6f8fa'};
  border-radius: 4px;
  border: 1px solid ${props => props.isStyleFile ? '#1a73e8' : '#eaecef'};
  flex-grow: 1;

  &:before {
    content: ${props => props.isStyleFile ? '"💅"' : '"→"'};
    margin-right: 6px;
    color: ${props => props.isStyleFile ? '#1a73e8' : '#1a73e8'};
  }
`;

const DirectoryItemContainer = styled.div<{ depth: number }>`
  position: relative;
`;

const CollapseButton = styled.button<{ isOpen: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 4px;
  color: #1a73e8;
  font-size: 1rem;
  transition: transform 0.2s ease;
  transform: rotate(${props => props.isOpen ? '90deg' : '0deg'});
  
  &:hover {
    opacity: 0.8;
  }
  
  &:focus {
    outline: none;
  }
`;

interface DirectoryItem {
  name: string;
  description?: string;
  children?: DirectoryItem[];
}

interface CollapsibleItemProps {
  item: DirectoryItem;
  depth: number;
}

const CollapsibleItem: React.FC<CollapsibleItemProps> = ({ item, depth }) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = Boolean(item.children && item.children.length > 0);
  const isStyle = isStyleFile(item.name);

  return (
    <DirectoryItemContainer depth={depth}>
      <DirectoryItem depth={depth} isStyleFile={isStyle}>
        {hasChildren && (
          <CollapseButton 
            onClick={() => setIsOpen(!isOpen)} 
            isOpen={isOpen}
          >
            ▶
          </CollapseButton>
        )}
        <DirectoryIcon isDirectory={hasChildren} isStyleFile={isStyle}>
          {getFileIcon(item.name, hasChildren)}
        </DirectoryIcon>
        <DirectoryName 
          isDirectory={hasChildren} 
          isStyleFile={isStyle}
        >
          {item.name}
        </DirectoryName>
        {item.description && (
          <DirectoryDescription isStyleFile={isStyle}>
            {item.description}
          </DirectoryDescription>
        )}
      </DirectoryItem>
      {hasChildren && isOpen && item.children && (
        <div>
          {item.children.map((child, index) => (
            <CollapsibleItem 
              key={`${depth}-${index}`} 
              item={child} 
              depth={depth + 1} 
            />
          ))}
        </div>
      )}
    </DirectoryItemContainer>
  );
};

const isStyleFile = (name: string) => {
  return name.includes('style') || 
         name.includes('.css') || 
         name.includes('theme') || 
         name.endsWith('.scss') || 
         name === 'GlobalStyle.ts';
};

const getFileIcon = (name: string, hasChildren: boolean) => {
  if (hasChildren) return '📁';
  if (isStyleFile(name)) return '💅';
  if (name.endsWith('.tsx')) return '⚛️';
  if (name.endsWith('.ts')) return '📜';
  if (name.endsWith('.json')) return '📋';
  if (name === 'README.md') return '📖';
  return '📄';
};

export const DirectoryStructure: React.FC<{
  items: DirectoryItem[];
  title?: string;
}> = ({ items, title = "Directory Structure" }) => {
  return (
    <DirectoryList>
      <h4>{title}</h4>
      {items.map((item, index) => (
        <CollapsibleItem 
          key={index} 
          item={item} 
          depth={0} 
        />
      ))}
    </DirectoryList>
  );
}; 