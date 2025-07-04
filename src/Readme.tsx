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
import { useTheme } from './contexts/ThemeContext';

const Wrapper = styled.div<{ theme: any }>`
  max-width: 700px;
  margin: 2rem auto;
  line-height: 1.7;
  margin-bottom: 150px;
  color: ${props => props.theme.colors.text};
  transition: color 0.3s ease;
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
    p: (props: any) => <div {...props} style={{ margin: '1em 0' }} />,
    pre: (props: any) => <div {...props} />,
    code: (props: any) => {
      const isInline = !props.className;
      if (isInline) {
        return (
          <code 
            {...props} 
            style={{
              background: theme.colors.code.background,
              padding: '2px 6px',
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '0.9em',
              color: theme.colors.code.text
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