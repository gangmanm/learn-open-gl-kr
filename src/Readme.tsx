import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MDXProvider } from '@mdx-js/react';
import * as runtime from 'react/jsx-runtime';
import { evaluate } from '@mdx-js/mdx';
import FunctionDoc from './components/FunctionDoc';
import CodeBlock from './components/CodeBlock';
import WarningBlock from './components/WarningBlock';
import InfoBlock from './components/InfoBlock';
import { LinkBlock } from './components/LinkBlock';
import List from './components/List';
import NumberedList, { NumberedItem } from './components/NumberedList';
import TranslatorNote from './components/TranslatorNote';
import Collapsible from './components/Collapsible';
import { useTheme } from './contexts/ThemeContext';
import { DirectoryStructure } from './components/DirectoryStructure';
import { Red, Green, Blue } from './components/ColorText';
const Wrapper = styled.div<{ theme: any }>`
  max-width: 700px;
  margin: 2rem auto;
  line-height: 1.7;
  margin-bottom: 150px;
  color: ${props => props.theme.colors.text};
  transition: color 0.3s ease;
  overflow-x: hidden;
  word-wrap: break-word;
  
  @media (max-width: 768px) {
    max-width: 100%;
    margin: 1rem 0;
    padding: 0 0.5rem;
    box-sizing: border-box;
  }
`;

interface ReadmeProps {
  doc?: string;
}

const Readme: React.FC<ReadmeProps> = ({ doc = 'main' }) => {
  const { theme } = useTheme();
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [MDXComponent, setMDXComponent] = useState<React.ComponentType | null>(null);

  const components = { 
    Func: FunctionDoc,
    Warning: WarningBlock,
    Info: InfoBlock,
    LinkBlock: LinkBlock,
    List: List,
    NumberedList: NumberedList,
    NumberedItem: NumberedItem,
    DirectoryStructure: DirectoryStructure,
    TranslatorNote: TranslatorNote,
    Collapsible: Collapsible,
    Red: Red,
    Green: Green,
    Blue: Blue,
    p: (props: any) => <div {...props} style={{ margin: '1em 0' }} />,
    pre: (props: any) => <div {...props} />,
    ul: (props: any) => (
      <ul 
        {...props} 
        style={{
          listStyle: 'none',
          padding: '0 0 0 1.5rem',
          margin: '1em 0',
          color: theme.colors.text,
          ...props.style
        }}
      />
    ),
    li: (props: any) => (
      <li 
        {...props} 
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.5rem',
          padding: '0.5rem 0.75rem',
          fontSize: '1rem',
          lineHeight: '1.6',
          color: theme.colors.text + ' !important',
          borderRadius: '6px',
          margin: '0.2rem 0',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          ...props.style
        }}
        onMouseEnter={(e: any) => {
          e.target.style.backgroundColor = theme.mode === 'dark' ? '#1a365d' : '#e3f2fd';
          e.target.style.transform = 'translateX(4px)';
        }}
        onMouseLeave={(e: any) => {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.transform = 'translateX(0px)';
        }}
      >
        <span style={{
          color: theme.colors.primary,
          fontWeight: '600',
          minWidth: '16px',
          fontSize: '1rem',
          marginTop: '1px'
        }}>
          -
        </span>
         <span style={{ 
           flex: 1,
           color: theme.mode === 'dark' ? '#ffffff !important' : theme.colors.text + ' !important',
           fontWeight: theme.mode === 'dark' ? '500' : 'normal',
           // 추가 스타일로 강제 적용
           WebkitTextFillColor: theme.mode === 'dark' ? '#ffffff' : theme.colors.text,
           textShadow: 'none'
         }}>
           <div style={{ 
             color: theme.mode === 'dark' ? '#ffffff !important' : theme.colors.text + ' !important',
             fontWeight: theme.mode === 'dark' ? '500' : 'normal'
           }}>
             {props.children}
           </div>
         </span>
      </li>
    ),
    img: (props: any) => (
      <img 
        {...props} 
        style={{
          maxWidth: '100%',
          height: 'auto',
          display: 'block',
          margin: '1.5em auto',
          borderRadius: '8px',
          boxShadow: `0 4px 12px rgba(0,0,0,0.1)`,
          border: `1px solid ${theme.colors.border}`,
          ...props.style
        }}
      />
    ),
    code: (props: any) => {
      const isInline = !props.className;
      if (isInline) {
        return (
          <code 
            {...props} 
            style={{
              background: theme.mode === 'dark' ? '#2d3748' : '#f7fafc',
              padding: '3px 8px',
              borderRadius: '6px',
              fontFamily: '"Fira Code", "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace',
              fontSize: '0.875em',
              color: theme.mode === 'dark' ? '#e2e8f0' : '#2d3748',
              border: `1px solid ${theme.mode === 'dark' ? '#4a5568' : '#e2e8f0'}`,
              fontWeight: '600',
              letterSpacing: '0.025em',
              whiteSpace: 'nowrap',
              display: 'inline-block',
              lineHeight: '1.4',
              boxShadow: theme.mode === 'dark' 
                ? '0 1px 3px rgba(0, 0, 0, 0.3)' 
                : '0 1px 3px rgba(0, 0, 0, 0.1)',
              ...props.style
            }}
          />
        );
      }
      return <CodeBlock {...props} />;
    }
  };

  useEffect(() => {
    setContent('');
    setError(null);
    setMDXComponent(null);
    fetch(`/docs/${doc}.mdx`)
      .then((res) => {
        if (!res.ok) throw new Error('문서를 불러올 수 없습니다.');
        return res.text();
      })
      .then(setContent)
      .catch((err) => setError(err.message));
  }, [doc]);

  useEffect(() => {
    if (!content) return;
    let cancelled = false;
    (async () => {
      try {
        const { default: Comp } = await evaluate(content, {
          ...runtime,
          useMDXComponents: () => components
        });
        if (!cancelled) setMDXComponent(() => Comp);
      } catch (e) {
        if (!cancelled) setError('MDX 파싱 오류: ' + String(e));
      }
    })();
    return () => { cancelled = true; };
  }, [content]);

  if (error) return <Wrapper theme={theme} style={{ color: 'red' }}>{error}</Wrapper>;
  if (!content || !MDXComponent) return <Wrapper theme={theme}>로딩 중...</Wrapper>;

  return (
    <Wrapper theme={theme}>
      <MDXProvider components={components}>
        <MDXComponent />
      </MDXProvider>
    </Wrapper>
  );
};

export default Readme;  