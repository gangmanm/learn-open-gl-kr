import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MDXProvider } from '@mdx-js/react';
import * as runtime from 'react/jsx-runtime';
import { evaluate } from '@mdx-js/mdx';
import FunctionDoc from './components/FunctionDoc';
import CodeBlock from './components/CodeBlock';
import WarningBlock from './components/WarningBlock';
import InfoBlock from './components/InfoBlock';

const Wrapper = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  line-height: 1.7;
`;

interface ReadmeProps {
  doc?: string;
}

const components = { 
  Func: FunctionDoc,
  Warning: WarningBlock,
  Info: InfoBlock,
  p: (props: any) => <div {...props} style={{ margin: '1em 0' }} />,
  pre: (props: any) => <div {...props} />,
  code: (props: any) => {
    const isInline = !props.className;
    if (isInline) {
      return (
        <code 
          {...props} 
          style={{
            background: '#f1f3f4',
            padding: '2px 6px',
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '0.9em',
            color: '#d73a49'
          }}
        />
      );
    }
    return <CodeBlock {...props} />;
  }
};

const Readme: React.FC<ReadmeProps> = ({ doc = 'main' }) => {
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [MDXComponent, setMDXComponent] = useState<React.ComponentType | null>(null);

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

  if (error) return <Wrapper style={{ color: 'red' }}>{error}</Wrapper>;
  if (!content || !MDXComponent) return <Wrapper>로딩 중...</Wrapper>;

  return (
    <Wrapper>
      <MDXProvider components={components}>
        <MDXComponent />
      </MDXProvider>
    </Wrapper>
  );
};

export default Readme;  