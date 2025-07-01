import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { FiX, FiXCircle } from 'react-icons/fi';

const Sidebar = styled.nav<{ isOpen?: boolean }>`
  width: 300px;
  padding: 2.7rem 1.4rem 2rem 1.4rem;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.82);
  border-right: 1.5px solid #e0e6ef;
  position: relative;
  z-index: 300;


  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    transition: transform 0.3s cubic-bezier(.4,2,.6,1), box-shadow 0.25s, background 0.25s;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18), 2px 0 16px 0 rgba(80, 120, 200, 0.13);
    width: 80vw;
    min-width: 220px;
    max-width: 320px;
    background: rgba(255,255,255,0.96);
    padding-top: 60px;
    border-radius: 0 18px 18px 0;
  }
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 2.2rem;
  letter-spacing: -1px;
  color:rgb(0, 0, 0);
  font-weight: 800;
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
`;
const NavItem = styled.li<{
  selected: boolean;
  depth?: number;
  isParent?: boolean;
  isOpen?: boolean;
}>`

  margin-bottom: 0.6rem;
  border: 1px solid #e0e6ef;
  padding: 0.5rem 1rem;
  color: ${({ selected }) => (selected ? '#1a5cff' : '#222')};
  font-weight: ${({ selected, isParent }) => (selected || isParent ? 600 : 400)};
  cursor: ${({ isParent }) => (isParent ? 'pointer' : 'pointer')};
  margin-left: ${({ depth }) => (depth === 1 ? '2.1em' : 0)};
  display: flex;
  background: ${({ selected }) => (selected ? 'linear-gradient(90deg,rgba(26,92,255,0.09) 0%,rgba(26,92,255,0.04) 100%)' : 'transparent')};
  border-radius: 9px;
  transition: background 0.22s, color 0.18s, box-shadow 0.18s;
  position: relative;
  box-shadow: ${({ selected }) => (selected ? '0 2px 12px 0 rgba(26,92,255,0.07)' : 'none')};
  z-index: 1;
  letter-spacing: -0.01em;

  &:hover {
    color: #1a5cff;
    background: ${({ selected }) => (selected ? 'linear-gradient(90deg,rgba(26,92,255,0.13) 0%,rgba(26,92,255,0.07) 100%)' : 'rgba(26,92,255,0.06)')};
    box-shadow: 0 2px 16px 0 rgba(26,92,255,0.08);
  }
`;


const Arrow = styled.span<{ isOpen: boolean }>`
  position: absolute;
  right: 1.1em;
  top: 50%;
  transform: translateY(-50%) rotate(${props => (props.isOpen ? 45 : -45)}deg) scale(${props => (props.isOpen ? 1.2 : 1)});
  width: 0.55em;
  height: 0.55em;
  border-right: 2.5px solid #1a5cff;
  border-bottom: 2.5px solid #1a5cff;
  opacity: 0.7;
  border-radius: 1px;
  transition: transform 0.18s cubic-bezier(.4,2,.6,1), opacity 0.18s;
  background: none;
  pointer-events: none;
`;


const Collapse = styled.div<{ isOpen: boolean }>`
  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
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
      { label: 'OpenGL 튜토리얼', value: 'opengl_tutorial' },
    ],
  },
];

const SidebarNav: React.FC<SidebarNavProps> = ({ selected, onSelect, isOpen, onClose }) => {
  const [open, setOpen] = useState<string | null>('EX');

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
            selected={selected === item.value}
            onClick={() =>
              isParent ? handleParentClick(item.value) : onSelect(item.value)
            }
            depth={depth}
            isParent={isParent}
            isOpen={isOpen}
            style={isParent ? { userSelect: 'none' } : {}}
          >
            {item.label}
            {isParent && <Arrow isOpen={isOpen} />}
          </NavItem>
          {isParent && (
            <Collapse isOpen={isOpen}>
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
      <Sidebar isOpen={isOpen}>
        <MobileSidebarHeader>
          <CloseButton onClick={onClose} aria-label="메뉴 닫기">
            <FiXCircle style={{color : 'rgb(63, 86, 213)', marginTop: '1rem'}}/>
          </CloseButton>
        </MobileSidebarHeader>
        <Title>OpenGL 배우기</Title>
        <NavList>{renderNav(DOCS, selected, onSelect)}</NavList>
      </Sidebar>
      {isOpen && <Overlay onClick={handleOverlayClick} />}
    </>
  );
};

export default SidebarNav; 


