import React, { useState } from 'react';
import styled from 'styled-components';
import { FiXCircle } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

const Sidebar = styled.nav<{ isOpen?: boolean; theme: any }>`
  width: 300px;
  padding: 2.7rem 1.4rem 2rem 1.4rem;
  box-sizing: border-box;
  background: ${props => props.theme.colors.sidebar.background};
  border-right: 1.5px solid ${props => props.theme.colors.border};
  position: relative;
  z-index: 300;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100vh;

  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    transition: transform 0.2s ease-out, box-shadow 0.2s ease, background 0.2s ease;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18), 2px 0 16px 0 rgba(80, 120, 200, 0.13);
    width: 80vw;
    min-width: 220px;
    max-width: 320px;
    background: ${props => props.theme.colors.sidebar.background};
    padding-top: 60px;
    border-radius: 0 18px 18px 0;
  }
`;

const SidebarHeader = styled.div<{ theme: any }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const Title = styled.h2<{ theme: any }>`
  font-size: 1.25rem;
  letter-spacing: -1px;
  color: ${props => props.theme.colors.sidebar.text};
  font-weight: 800;
  transition: color 0.3s ease;
  margin: 0;
`;

const MobileTitle = styled.h2<{ theme: any }>`
  font-size: 1.25rem;
  margin-bottom: 2.2rem;
  letter-spacing: -1px;
  color: ${props => props.theme.colors.sidebar.text};
  font-weight: 800;
  transition: color 0.3s ease;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const Overlay = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(40, 60, 120, 0.13);
    z-index: 200;
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    transition: background 0.2s;
  }
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
`;

const NavItem = styled.li<{
  $selected: boolean;
  $depth?: number;
  $isParent?: boolean;
  $isOpen?: boolean;
  theme: any;
}>`
  margin-bottom: 0.6rem;
  border: 1px solid ${props => props.theme.colors.border};
  padding: 0.5rem 1rem;
  color: ${({ $selected, theme }) => ($selected ? theme.colors.primary : theme.colors.sidebar.text)};
  font-weight: ${({ $selected, $isParent }) => ($selected || $isParent ? 600 : 400)};
  cursor: ${({ $isParent }) => ($isParent ? 'pointer' : 'pointer')};
  margin-left: ${({ $depth }) => ($depth === 1 ? '2.1em' : 0)};
  display: flex;
  background: ${({ $selected, theme }) => ($selected ? `linear-gradient(90deg,${theme.colors.primary}15 0%,${theme.colors.primary}08 100%)` : 'transparent')};
  border-radius: 9px;
  transition: background 0.22s, color 0.18s, box-shadow 0.18s, border-color 0.3s ease;
  position: relative;
  box-shadow: ${({ $selected, theme }) => ($selected ? `0 2px 12px 0 ${theme.colors.primary}15` : 'none')};
  z-index: 1;
  letter-spacing: -0.01em;

  &:hover {
    color: ${props => props.theme.colors.primary};
    background: ${({ $selected, theme }) => ($selected ? `linear-gradient(90deg,${theme.colors.primary}20 0%,${theme.colors.primary}12 100%)` : `${theme.colors.primary}10`)};
    box-shadow: 0 2px 16px 0 ${props => props.theme.colors.primary}15;
  }
`;

const Arrow = styled.span<{ $isOpen: boolean; theme: any }>`
  position: absolute;
  right: 1.1em;
  top: 50%;
  transform: translateY(-50%) rotate(${props => (props.$isOpen ? 45 : -45)}deg) scale(${props => (props.$isOpen ? 1.2 : 1)});
  width: 0.55em;
  height: 0.55em;
  border-right: 2.5px solid ${props => props.theme.colors.primary};
  border-bottom: 2.5px solid ${props => props.theme.colors.primary};
  opacity: 0.7;
  border-radius: 1px;
  transition: transform 0.18s cubic-bezier(.4,2,.6,1), opacity 0.18s;
  background: none;
  pointer-events: none;
`;

const Collapse = styled.div<{ $isOpen: boolean }>`
  max-height: ${({ $isOpen }) => ($isOpen ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.38s cubic-bezier(.4,2,.6,1);
`;

const MobileSidebarHeader = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 39px;
    color: #fff;
    font-size: 1.1rem;
    font-weight: 700;
    padding: 0 1.2rem;
    border-radius: 0 18px 0 0;
    z-index: 301;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  margin-left: 1rem;
  line-height: 1;
  display: flex;
  align-items: center;
`;

const TranslatorInfo = styled.div<{ theme: any }>`
  margin-top: auto;
  padding-top: 2rem;
  border-top: 1px solid ${props => props.theme.colors.border};
  transition: border-color 0.3s ease;
`;

const TranslatorTitle = styled.h3<{ theme: any }>`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.sidebar.text};
  margin: 0 0 0.8rem 0;
  font-weight: 600;
  transition: color 0.3s ease;
`;

const TranslatorItem = styled.div<{ theme: any }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
  font-size: 0.85rem;
  color: ${props => props.theme.colors.textSecondary};
  transition: color 0.3s ease;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TranslatorLink = styled.a<{ theme: any }>`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;
  }
`;

const TranslatorBadge = styled.span<{ theme: any }>`
  background: ${props => props.theme.mode === 'dark' ? 'rgba(64, 150, 255, 0.1)' : 'rgba(22, 119, 255, 0.05)'};
  color: ${props => props.theme.colors.primary};
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid ${props => props.theme.mode === 'dark' ? 'rgba(64, 150, 255, 0.3)' : 'rgba(22, 119, 255, 0.2)'};
  transition: all 0.3s ease;
`;

interface NavItemType {
  label: string;
  value: string;
  children?: NavItemType[];
}

interface SidebarNavProps {
  selected: string;
  onSelect: (doc: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const DOCS: NavItemType[] = [
  { label: '소개', value: 'introduction' },
  {
    label: '시작하기',
    value: 'getting-started',
    children: [
      { label: 'OpenGL이란', value: 'opengl' },
      { label: '윈도우 창 만들기', value: 'creatingawindow' },
      { label: 'Hello Window', value: 'hellowindow' },
      { label: 'Hello Triangle', value: 'hellotriangle' },
      { label: 'Shaders', value: 'shaders' },
      { label: 'Textures', value: 'textures' },
    ],
  },
];

const SidebarNav: React.FC<SidebarNavProps> = ({ selected, onSelect, isOpen, onClose }) => {
  const [open, setOpen] = useState<string | null>('EX');
  const { theme } = useTheme();

  const handleParentClick = (value: string): void => {
    setOpen((prev) => (prev === value ? null : value));
  };

  const renderNav = (
    items: NavItemType[],
    selected: string,
    onSelect: (doc: string) => void,
    depth = 0
  ) =>
    items.map((item) => {
      const isParent = !!item.children;
      const isOpen = open === item.value;
      return (
        <React.Fragment key={item.value}>
          <NavItem
            $selected={selected === item.value}
            onClick={() =>
              isParent ? handleParentClick(item.value) : onSelect(item.value)
            }
            $depth={depth}
            $isParent={isParent}
            $isOpen={isOpen}
            style={isParent ? { userSelect: 'none' } : {}}
            theme={theme}
          >
            {item.label}
            {isParent && <Arrow $isOpen={isOpen} theme={theme} />}
          </NavItem>
          {isParent && (
            <Collapse $isOpen={isOpen}>
              <NavList>
                {renderNav(item.children!, selected, onSelect, depth + 1)}
              </NavList>
            </Collapse>
          )}
        </React.Fragment>
      );
    });

  // Overlay for mobile
  const handleOverlayClick = (): void => {
    if (onClose) onClose();
  };

  return (
    <>
      <Sidebar isOpen={isOpen} theme={theme}>
        <MobileSidebarHeader>
          <CloseButton onClick={onClose} aria-label="메뉴 닫기">
            <FiXCircle style={{color: theme.colors.primary, marginTop: '1rem'}}/>
          </CloseButton>
        </MobileSidebarHeader>
        
        {/* PC용 헤더 */}
        <SidebarHeader theme={theme}>
          <Logo size="small" />
          <ThemeToggle />
        </SidebarHeader>
        
        {/* 모바일용 타이틀 */}
        <MobileTitle theme={theme}>OpenGL 배우기</MobileTitle>
        
        <NavList>{renderNav(DOCS, selected, onSelect)}</NavList>
        
        <TranslatorInfo theme={theme}>
          <TranslatorTitle theme={theme}>번역자 정보</TranslatorTitle>
          <TranslatorItem theme={theme}>
            <span>주 번역자:</span>
            <TranslatorLink 
              href="https://github.com/gangmanm" 
              target="_blank" 
              rel="noopener noreferrer"
              theme={theme}
            >
              gangmanm
            </TranslatorLink>
            <TranslatorBadge theme={theme}>이도경</TranslatorBadge>
          </TranslatorItem>
          <TranslatorItem theme={theme}>
            <span>이메일:</span>
            <TranslatorLink 
              href="mailto:dklee7280@gmail.com" 
              theme={theme}
            >
              dklee7280@gmail.com
            </TranslatorLink>
          </TranslatorItem>
          <TranslatorItem theme={theme}>
            <span>원본:</span>
            <TranslatorLink 
              href="https://learnopengl.com" 
              target="_blank" 
              rel="noopener noreferrer"
              theme={theme}
            >
              LearnOpenGL.com
            </TranslatorLink>
          </TranslatorItem>
        </TranslatorInfo>
      </Sidebar>
      {isOpen && <Overlay onClick={handleOverlayClick} />}
    </>
  );
};

export default SidebarNav; 


