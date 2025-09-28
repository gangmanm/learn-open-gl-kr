import React from 'react';
import styled from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../contexts/ThemeContext';

const CodeContainer = styled.div<{ theme: any }>`
  background: ${props => props.theme.colors.code.background};
  border-radius: 8px;
  margin: 1rem 0;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid ${props => props.theme.colors.border};
  transition: background-color 0.3s ease, border-color 0.3s ease;
  max-width: 100%;
  
  @media (max-width: 768px) {
    margin: 0.5rem 0;
    border-radius: 6px;
  }
`;

const CodeHeader = styled.div<{ theme: any }>`
  background: ${props => props.theme.mode === 'dark' ? '#2d2d2d' : '#f8f9fa'};
  padding: 8px 16px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

const LanguageLabel = styled.span<{ theme: any }>`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
`;

const CopyButton = styled.button<{ theme: any }>`
  background: ${props => props.theme.mode === 'dark' ? '#404040' : '#e9ecef'};
  color: ${props => props.theme.colors.textSecondary};
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.mode === 'dark' ? '#505050' : '#dee2e6'};
    color: ${props => props.theme.colors.text};
  }
`;

interface CodeBlockProps {
  children: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  const { theme } = useTheme();
  
  // 언어 추출 (className에서)
  const language = className ? className.replace('language-', '') : '';
  
  // 코드 복사 기능
  const handleCopy = () => {
    navigator.clipboard.writeText(children).then(() => {
      // 복사 성공 알림 (선택사항)
      console.log('코드가 복사되었습니다!');
    });
  };

  return (
    <CodeContainer theme={theme}>
      <CodeHeader theme={theme}>
        <LanguageLabel theme={theme}>{language || 'text'}</LanguageLabel>
        <CopyButton onClick={handleCopy} theme={theme}>복사</CopyButton>
      </CodeHeader>
      <SyntaxHighlighter
        language={language}
        style={theme.mode === 'dark' ? oneDark : undefined}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: '14px',
          lineHeight: '1.5',
          fontFamily: "'Fira Code', 'Monaco', 'Consolas', 'Courier New', monospace",
          background: theme.colors.code.background,
          color: theme.colors.code.text,
          maxWidth: '100%',
          overflowX: 'auto'
        }}
        showLineNumbers={true}
        wrapLines={true}
      >
        {children}
      </SyntaxHighlighter>
    </CodeContainer>
  );
};

export default CodeBlock; 