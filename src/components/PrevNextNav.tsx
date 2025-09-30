import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

interface PrevNextNavProps {
  prevSlug: string | null;
  nextSlug: string | null;
  slugToLabel: Record<string, string>;
  onNavigate: (slug: string) => void;
}

const NavRow = styled.nav<{ theme: any }>`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  align-items: stretch;
  margin: 2.2rem 0 1rem 0;
`;

const NavCard = styled.button<{ theme: any }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: left;
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.mode === 'dark' ? 'rgba(255,255,255,0.02)' : '#ffffff'};
  color: ${props => props.theme.colors.text};
  padding: 1rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  height: 100%;
  min-height: 82px;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.mode === 'dark' ? 'rgba(100,150,255,0.05)' : 'rgba(99,102,241,0.05)'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const SubLabel = styled.span<{ theme: any }>`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 0.35rem;
  
  @media (max-width: 768px) {
    font-size: 0.68rem;
  }
`;

const Title = styled.span<{ theme: any }>`
  font-size: 1rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  
  @media (max-width: 768px) {
    font-size: 0.86rem;
  }
`;

const Arrow = styled.span<{ theme: any }>`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 800;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const PrevNextNav: React.FC<PrevNextNavProps> = ({ prevSlug, nextSlug, slugToLabel, onNavigate }) => {
  const { theme } = useTheme();

  return (
    <NavRow theme={theme} aria-label="문서 내비게이션">
      {prevSlug ? (
        <NavCard
          theme={theme}
          onClick={() => onNavigate(prevSlug)}
          aria-label={`이전 장: ${slugToLabel[prevSlug]}`}
        >
          <SubLabel theme={theme}>이전</SubLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Arrow theme={theme}>←</Arrow>
            <Title theme={theme}>{slugToLabel[prevSlug]}</Title>
          </div>
        </NavCard>
      ) : (
        <div />
      )}

      {nextSlug ? (
        <NavCard
          theme={theme}
          onClick={() => onNavigate(nextSlug)}
          aria-label={`다음 장: ${slugToLabel[nextSlug]}`}
        >
          <SubLabel theme={theme} style={{ textAlign: 'right' }}>다음</SubLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <Title theme={theme}>{slugToLabel[nextSlug]}</Title>
            <Arrow theme={theme}>→</Arrow>
          </div>
        </NavCard>
      ) : (
        <div />
      )}
    </NavRow>
  );
};

export default PrevNextNav;


