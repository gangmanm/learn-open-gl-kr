import React, { useState } from 'react';
import styled from 'styled-components';
import { FiChevronDown, FiChevronRight, FiInfo, FiHelpCircle, FiBookOpen, FiAlertCircle } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const CollapsibleContainer = styled.div<{ theme: any; variant: string }>`
  margin: 20px 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${props => {
    switch (props.variant) {
      case 'info':
        return props.theme.mode === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)';
      case 'tip':
        return props.theme.mode === 'dark' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(34, 197, 94, 0.2)';
      case 'warning':
        return props.theme.mode === 'dark' ? 'rgba(251, 191, 36, 0.3)' : 'rgba(251, 191, 36, 0.2)';
      case 'note':
      default:
        return props.theme.mode === 'dark' ? 'rgba(156, 163, 175, 0.3)' : 'rgba(156, 163, 175, 0.2)';
    }
  }};
  background: ${props => {
    switch (props.variant) {
      case 'info':
        return props.theme.mode === 'dark' ? 'rgba(59, 130, 246, 0.05)' : 'rgba(59, 130, 246, 0.03)';
      case 'tip':
        return props.theme.mode === 'dark' ? 'rgba(34, 197, 94, 0.05)' : 'rgba(34, 197, 94, 0.03)';
      case 'warning':
        return props.theme.mode === 'dark' ? 'rgba(251, 191, 36, 0.05)' : 'rgba(251, 191, 36, 0.03)';
      case 'note':
      default:
        return props.theme.mode === 'dark' ? 'rgba(156, 163, 175, 0.05)' : 'rgba(156, 163, 175, 0.03)';
    }
  }};
  transition: all 0.3s ease;
`;

const Header = styled.div<{ theme: any; variant: string; isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  cursor: pointer;
  user-select: none;
  background: ${props => {
    switch (props.variant) {
      case 'info':
        return props.theme.mode === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.08)';
      case 'tip':
        return props.theme.mode === 'dark' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.08)';
      case 'warning':
        return props.theme.mode === 'dark' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(251, 191, 36, 0.08)';
      case 'note':
      default:
        return props.theme.mode === 'dark' ? 'rgba(156, 163, 175, 0.1)' : 'rgba(156, 163, 175, 0.08)';
    }
  }};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => {
      switch (props.variant) {
        case 'info':
          return props.theme.mode === 'dark' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.12)';
        case 'tip':
          return props.theme.mode === 'dark' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(34, 197, 94, 0.12)';
        case 'warning':
          return props.theme.mode === 'dark' ? 'rgba(251, 191, 36, 0.15)' : 'rgba(251, 191, 36, 0.12)';
        case 'note':
        default:
          return props.theme.mode === 'dark' ? 'rgba(156, 163, 175, 0.15)' : 'rgba(156, 163, 175, 0.12)';
      }
    }};
  }
`;

const IconWrapper = styled.div<{ theme: any; variant: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${props => {
    switch (props.variant) {
      case 'info':
        return props.theme.mode === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.15)';
      case 'tip':
        return props.theme.mode === 'dark' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.15)';
      case 'warning':
        return props.theme.mode === 'dark' ? 'rgba(251, 191, 36, 0.2)' : 'rgba(251, 191, 36, 0.15)';
      case 'note':
      default:
        return props.theme.mode === 'dark' ? 'rgba(156, 163, 175, 0.2)' : 'rgba(156, 163, 175, 0.15)';
    }
  }};
  color: ${props => {
    switch (props.variant) {
      case 'info':
        return props.theme.mode === 'dark' ? '#60a5fa' : '#3b82f6';
      case 'tip':
        return props.theme.mode === 'dark' ? '#4ade80' : '#22c55e';
      case 'warning':
        return props.theme.mode === 'dark' ? '#fbbf24' : '#f59e0b';
      case 'note':
      default:
        return props.theme.mode === 'dark' ? '#9ca3af' : '#6b7280';
    }
  }};
`;

const Title = styled.div<{ theme: any; variant: string }>`
  flex: 1;
  font-weight: 600;
  font-size: 15px;
  color: ${props => {
    switch (props.variant) {
      case 'info':
        return props.theme.mode === 'dark' ? '#60a5fa' : '#1d4ed8';
      case 'tip':
        return props.theme.mode === 'dark' ? '#4ade80' : '#16a34a';
      case 'warning':
        return props.theme.mode === 'dark' ? '#fbbf24' : '#d97706';
      case 'note':
      default:
        return props.theme.colors.text;
    }
  }};
`;

const ChevronIcon = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
  transform: ${props => props.isOpen ? 'rotate(0deg)' : 'rotate(-90deg)'};
  color: ${props => props.theme?.colors?.textSecondary || '#6b7280'};
`;

const Content = styled.div<{ theme: any; isOpen: boolean }>`
  max-height: ${props => props.isOpen ? '1000px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const ContentInner = styled.div<{ theme: any }>`
  padding: 20px;
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
  
  p {
    margin: 0 0 12px 0;
    
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

  ul, ol {
    margin: 12px 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 6px;
  }
`;

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  variant?: 'note' | 'info' | 'tip' | 'warning';
  defaultOpen?: boolean;
  className?: string;
}

const Collapsible: React.FC<CollapsibleProps> = ({
  title,
  children,
  variant = 'note',
  defaultOpen = false,
  className
}) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const getIcon = (variant: string) => {
    switch (variant) {
      case 'info':
        return <FiInfo size={14} />;
      case 'tip':
        return <FiHelpCircle size={14} />;
      case 'warning':
        return <FiAlertCircle size={14} />;
      case 'note':
      default:
        return <FiBookOpen size={14} />;
    }
  };

  return (
    <CollapsibleContainer theme={theme} variant={variant} className={className}>
      <Header 
        theme={theme} 
        variant={variant} 
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <IconWrapper theme={theme} variant={variant}>
          {getIcon(variant)}
        </IconWrapper>
        <Title theme={theme} variant={variant}>
          {title}
        </Title>
        <ChevronIcon isOpen={isOpen} theme={theme}>
          <FiChevronDown size={16} />
        </ChevronIcon>
      </Header>
      <Content theme={theme} isOpen={isOpen}>
        <ContentInner theme={theme}>
          {children}
        </ContentInner>
      </Content>
    </CollapsibleContainer>
  );
};

export default Collapsible;
