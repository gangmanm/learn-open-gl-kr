import React from 'react';
import styled from 'styled-components';
import { FiEdit3, FiUser } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const NoteContainer = styled.div<{ theme: any }>`
  background: ${props => props.theme.mode === 'dark' 
    ? 'linear-gradient(135deg, rgba(255, 193, 7, 0.08), rgba(255, 152, 0, 0.05))'
    : 'linear-gradient(135deg, rgba(255, 193, 7, 0.12), rgba(255, 152, 0, 0.08))'
  };
  border-left: 4px solid ${props => props.theme.mode === 'dark' ? '#ffc107' : '#ff9800'};
  border-radius: 0 8px 8px 0;
  padding: 16px 20px;
  margin: 20px 0;
  position: relative;
  box-shadow: ${props => props.theme.mode === 'dark' 
    ? '0 2px 8px rgba(255, 193, 7, 0.1)'
    : '0 2px 8px rgba(255, 152, 0, 0.15)'
  };
  border: 1px solid ${props => props.theme.mode === 'dark' 
    ? 'rgba(255, 193, 7, 0.2)'
    : 'rgba(255, 152, 0, 0.2)'
  };
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${props => props.theme.mode === 'dark' 
      ? '0 4px 16px rgba(255, 193, 7, 0.15)'
      : '0 4px 16px rgba(255, 152, 0, 0.2)'
    };
  }
`;

const NoteHeader = styled.div<{ theme: any }>`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-weight: 600;
  font-size: 14px;
  color: ${props => props.theme.mode === 'dark' ? '#ffc107' : '#f57c00'};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const NoteIcon = styled.div<{ theme: any }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => props.theme.mode === 'dark' 
    ? 'rgba(255, 193, 7, 0.2)'
    : 'rgba(255, 152, 0, 0.2)'
  };
  color: ${props => props.theme.mode === 'dark' ? '#ffc107' : '#f57c00'};
`;

const NoteContent = styled.div<{ theme: any }>`
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
  font-size: 14px;
  
  p {
    margin: 0 0 8px 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  }

  strong {
    color: ${props => props.theme.mode === 'dark' ? '#ffc107' : '#f57c00'};
  }

  code {
    background: ${props => props.theme.mode === 'dark' 
      ? 'rgba(255, 193, 7, 0.1)'
      : 'rgba(255, 152, 0, 0.1)'
    };
    color: ${props => props.theme.mode === 'dark' ? '#ffc107' : '#f57c00'};
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
    font-size: 13px;
  }
`;

const AuthorInfo = styled.div<{ theme: any }>`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid ${props => props.theme.mode === 'dark' 
    ? 'rgba(255, 193, 7, 0.2)'
    : 'rgba(255, 152, 0, 0.2)'
  };
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
  font-style: italic;
`;

interface Props {
  children: React.ReactNode;
  author?: string;
  type?: 'note' | 'clarification' | 'addition' | 'correction';
  className?: string;
}

const TranslatorNote: React.FC<TranslatorNoteProps> = ({ 
  children, 
  author = "번역자",
  type = "note",
  className 
}) => {
  const { theme } = useTheme();

  const getHeaderText = (type: string) => {
    switch (type) {
      case 'clarification':
        return '번역자 보충 설명';
      case 'addition':
        return '번역자 추가 정보';
      case 'correction':
        return '번역자 정정';
      default:
        return '번역자 주';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'clarification':
      case 'addition':
        return <FiEdit3 size={12} />;
      default:
        return <FiUser size={12} />;
    }
  };

  return (
    <NoteContainer theme={theme} className={className}>
      <NoteHeader theme={theme}>
        <NoteIcon theme={theme}>
          {getIcon(type)}
        </NoteIcon>
        {getHeaderText(type)}
      </NoteHeader>
      <NoteContent theme={theme}>
        {children}
      </NoteContent>
      {author && (
        <AuthorInfo theme={theme}>
          <FiUser size={10} />
          {author}
        </AuthorInfo>
      )}
    </NoteContainer>
  );
};

export default TranslatorNote;
