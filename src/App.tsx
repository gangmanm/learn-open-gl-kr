import React, { useState } from 'react';
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
  @media (max-width: 768px) {
    flex-direction: column;
    height: 100vh;
  }
`;
const Main = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color:rgb(255, 255, 255);
  @media (max-width: 768px) {
    padding: 2rem 2rem;
    width: 100vw;
    min-height: 100vh;
    height: 100vh;
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
    position: sticky;
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
  EX1: 'EX1',
  EX2: 'EX2',
};

function App() {
  const [selected, setSelected] = useState<string>('README');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleSelect = (doc: string): void => {
    setSelected(doc);
    setSidebarOpen(false); // close sidebar on mobile after selection
  };

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
