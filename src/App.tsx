import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Readme from './Readme';
import SidebarNav from './components/SidebarNav';
import { FiMenu } from 'react-icons/fi';

const Layout = styled.div`
  width: 100vw;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  padding: 0;
  background-color: #f0f0f0;
  font-family: 'Pretendard';
  position: fixed;
  top: 0;
  left: 0;
  @media (max-width: 768px) {
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }
`;
const Main = styled.div`
  width: 100%;
  height: 100%;
  background-color:rgb(255, 255, 255);
      overflow-y: auto;
  @media (max-width: 768px) {
    padding: 2rem 2rem;
    width: 100vw;
    min-height: 100vh;
    height: 100vh;

    padding-bottom: 100px;
  }
`;
const MobileHeader = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    padding: 1rem 1rem;
    justify-content: space-between;
    width: 100%;
    height: 48px;
    background: #fff;
    border-bottom: 1px solid #e5e5e5;
    position: fixed;
    top: 0;
    z-index: 200;
    align-items: center;
  }
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #1677ff;
  margin-left: 1.5rem;
`;

const DOC_MAP: Record<string, string> = {
  introduction: 'introduction',
  opengl: 'opengl',
  opengl_tutorial: 'opengl_tutorial',
  opengl_tutorial_2: 'opengl_tutorial_2',
  opengl_tutorial_3: 'opengl_tutorial_3',
  opengl_tutorial_4: 'opengl_tutorial_4',
  opengl_tutorial_5: 'opengl_tutorial_5',
  opengl_tutorial_6: 'opengl_tutorial_6',
  opengl_tutorial_7: 'opengl_tutorial_7',
};

function App() {
  // 해시에서 초기값 읽기
  const getInitialDoc = () => {
    const hash = window.location.hash.replace('#', '');
    return DOC_MAP[hash] ? hash : 'README';
  };

  const [selected, setSelected] = useState<string>(getInitialDoc());
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // 주소 해시 변경
  const handleSelect = (doc: string): void => {
    setSelected(doc);
    setSidebarOpen(false);
    window.location.hash = doc;
  };

  // 해시가 바뀌면 문서도 바뀌게 (뒤로가기/앞으로가기 대응)
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (DOC_MAP[hash]) setSelected(hash);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <Layout>
      <MobileHeader>
          <FiMenu onClick={() => setSidebarOpen((v) => !v)} style={{color : 'rgb(63, 86, 213)', fontSize: '2rem'}}/>
        <Title>OpenGL 배우기</Title>
      </MobileHeader>
      <SidebarNav selected={selected} onSelect={handleSelect} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Main>
        <Readme doc={DOC_MAP[selected] || 'introduction'} />
      </Main>
    </Layout>
  );
}

export default App;
