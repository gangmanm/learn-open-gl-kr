import React, { useEffect, useState, useMemo } from 'react';
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
import GiscusComments from './components/GiscusComments';
import VideoPlayer from './components/VideoPlayer';
import YouTubeEmbed from './components/YouTubeEmbed';
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

  const components = useMemo(() => ({ 
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
    VideoPlayer: VideoPlayer,
    YouTubeEmbed: YouTubeEmbed,
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
          transition: 'color 0.3s ease',
          ...props.style
        }}
      />
    ),
    li: (props: any) => {
      const ListItemComponent = () => {
        // Info 블록 내부인지 확인 (부모 요소 체크)
        const isInInfoBlock = props.className?.includes('info') || 
                             (typeof props.children === 'string' && props.children.includes('info'));
        
        // Info 블록 내부에서는 다른 색상 사용
        const textColor = isInInfoBlock 
          ? (theme.mode === 'dark' ? '#e5e7eb' : 'rgb(64, 64, 65)')
          : theme.colors.text;
          
        return (
          <li 
            {...props} 
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem',
              padding: '0.5rem 0.75rem',
              fontSize: '1rem',
              lineHeight: '1.6',
              color: textColor,
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
              color: isInInfoBlock 
                ? (theme.mode === 'dark' ? '#22c55e' : 'rgb(28, 157, 133)')
                : theme.colors.primary,
              fontWeight: '600',
              minWidth: '16px',
              fontSize: '1rem',
              marginTop: '1px',
              transition: 'color 0.3s ease'
            }}>
              -
            </span>
             <span style={{ 
               flex: 1,
               color: textColor,
               fontWeight: theme.mode === 'dark' ? '500' : 'normal',
               transition: 'color 0.3s ease'
             }}>
               {props.children}
             </span>
          </li>
        );
      };
      return <ListItemComponent key={theme.mode} />;
    },
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
              background: theme.mode === 'dark' ? '#1f2937' : '#f3f4f6',
              padding: '2px 6px',
              borderRadius: '4px',
              fontFamily: '"Fira Code", "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace',
              fontSize: '0.85em',
              color: theme.mode === 'dark' ? '#e5e7eb' : '#111827',
              border: `1px solid ${theme.mode === 'dark' ? '#374151' : '#e5e7eb'}`,
              fontWeight: 500,
              letterSpacing: 0,
              whiteSpace: 'nowrap',
              display: 'inline-block',
              lineHeight: '1.3',
              boxShadow: 'none',
              textShadow: 'none',
              ...props.style
            }}
          />
        );
      }
      return <CodeBlock {...props} />;
    }
  }), [theme]);

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
  }, [content, theme]);

  if (error) return <Wrapper theme={theme} style={{ color: 'red' }}>{error}</Wrapper>;
  if (!content || !MDXComponent) return <Wrapper theme={theme}>로딩 중...</Wrapper>;

  return (
    <Wrapper theme={theme}>
      <MDXProvider components={components}>
        <MDXComponent />
      </MDXProvider>
      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: `1px solid ${theme.colors.border}` }}>
        <GiscusComments
          repo="gangmanm/learn-open-gl-kr"
          repoId="R_kgDOPFBMZQ"
          category="General"
          categoryId="DIC_kwDOPFBMZc4CwBGG"
          mapping="specific"
          term={`learn-opengl-kr-${doc}`}
          reactionsEnabled={true}
          emitMetadata={false}
          inputPosition="bottom"
          lang="ko"
          loading="lazy"
        />
      </div>
    </Wrapper>
  );
};

export default Readme;  