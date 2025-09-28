import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Readme from './Readme';
import SidebarNav from './components/SidebarNav';
import ThemeToggle from './components/ThemeToggle';
import Logo from './components/Logo';
import { FiMenu } from 'react-icons/fi';
import { useTheme } from './contexts/ThemeContext';

const Layout = styled.div<{ theme: any }>`
  width: 100vw;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  padding: 0;
  background-color: ${props => props.theme.colors.background};
  font-family: 'Pretendard';
  position: fixed;
  top: 0;
  left: 0;
  transition: background-color 0.3s ease;
  @media (max-width: 768px) {
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }
`;

const Main = styled.div<{ theme: any }>`
  width: 100%;
  height: 100%;
  background-color:rgb(255, 255, 255);
      overflow-y: auto;
  overflow-y: auto;
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  transition: background-color 0.3s ease, color 0.3s ease;
  @media (max-width: 768px) {
    padding: 2rem 2rem;
    width: 100vw;
    min-height: 100vh;
    height: 100vh;

    padding-bottom: 50px;
  }
`;

const MobileHeader = styled.div<{ theme: any }>`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    padding: 1rem 1rem;
    justify-content: space-between;
    width: 100%;
    height: 48px;
    border-bottom: 1px solid ${props => props.theme.colors.border};
    background: ${props => props.theme.colors.background};
    position: fixed;
    top: 0;
    z-index: 200;
    align-items: center;
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }
`;


const HeaderControls = styled.div<{ theme: any }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${props => props.theme.colors.primary};
`;

const DOC_MAP: Record<string, string> = {
  introduction: 'introduction',
  opengl: 'opengl',
  opengl_tutorial: 'opengl_tutorial',
  creatingawindow: 'creatingawindow',
  hellowindow: 'HelloWindow',
  hellotriangle: 'HelloTriangle',
  opengl_tutorial_4: 'opengl_tutorial_4',
  opengl_tutorial_5: 'opengl_tutorial_5',
  opengl_tutorial_6: 'opengl_tutorial_6',
  opengl_tutorial_7: 'opengl_tutorial_7',
};

function App() {
  const { theme } = useTheme();
  
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
    <Layout theme={theme}>
      <MobileHeader theme={theme}>
        <HeaderControls>
          <FiMenu onClick={() => setSidebarOpen((v) => !v)} style={{fontSize: '2rem', color: theme.colors.primary}}/>
          <ThemeToggle />
        </HeaderControls>
        <Logo size="small" showSubtext={false} />
      </MobileHeader>
      <SidebarNav selected={selected} onSelect={handleSelect} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Main theme={theme}>
        <Readme doc={DOC_MAP[selected] || 'introduction'} />
      </Main>
    </Layout>
  );
}

export default App;
