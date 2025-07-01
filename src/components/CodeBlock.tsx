import React from 'react';
import styled from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeContainer = styled.div`
  background: #1e1e1e;
  border-radius: 8px;
  margin: 1rem 0;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const CodeHeader = styled.div`
  background: #2d2d2d;
  padding: 8px 16px;
  border-bottom: 1px solid #404040;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LanguageLabel = styled.span`
  color: #e0e0e0;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CopyButton = styled.button`
  background: #404040;
  color: #e0e0e0;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #505050;
    color: #fff;
  }
`;

interface CodeBlockProps {
  children: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
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
    <CodeContainer>
      <CodeHeader>
        <LanguageLabel>{language || 'text'}</LanguageLabel>
        <CopyButton onClick={handleCopy}>복사</CopyButton>
      </CodeHeader>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: '14px',
          lineHeight: '1.5',
          fontFamily: "'Fira Code', 'Monaco', 'Consolas', 'Courier New', monospace"
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