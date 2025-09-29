import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { FiX } from 'react-icons/fi';
import CodeBlock from './CodeBlock';
import { useTheme } from '../contexts/ThemeContext';

const Container = styled.span<{ theme: any }>`
  position: relative;
  display: inline-block;
  margin: 0 4px;
  border-bottom: 1px solid ${props => props.theme.mode === 'dark' ? '#ff6b6b' : '#ef4444'};
  z-index: 99;
  
  @media (max-width: 768px) {
    margin: 0 2px;
    display: inline-block;
    margin-bottom: 4px;
  }
`;

const Title = styled.span<{ theme: any }>`
  font-weight: 700;
  font-size: inherit;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  color: ${props => props.theme.mode === 'dark' ? '#ff6b6b' : '#ef4444'};

  ${Container}:hover & {
    background: ${props => props.theme.mode === 'dark' ? 'rgba(255, 107, 107, 0.1)' : '#e6f7ff'};
    border-color: ${props => props.theme.mode === 'dark' ? 'rgba(255, 107, 107, 0.3)' : '#91caff'};
  }
  
  @media (max-width: 768px) {
    padding: 3px 6px;
    font-size: 14px;
  }
`;

const Box = styled.div<{ theme: any; isVisible: boolean }>`
  display: inline-block;
  border: 1px solid ${props => props.theme.mode === 'dark' ? 'rgba(255, 107, 107, 0.3)' : '#91caff'};
  background: ${props => props.theme.mode === 'dark' ? 'rgba(30, 30, 30, 0.98)' : 'rgba(230, 247, 255, 0.98)'};
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 0;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) ${props => props.isVisible ? 'scale(1)' : 'scale(0.9)'};
  z-index: 100;
  min-width: 320px;
  max-width: 450px;
  opacity: ${props => props.isVisible ? 1 : 0};
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  box-shadow: ${props => props.theme.mode === 'dark' 
    ? '0 8px 32px rgba(0, 0, 0, 0.6)' 
    : '0 8px 32px rgba(22, 119, 255, 0.25)'
  };
  color: ${props => props.theme.colors.text};
  pointer-events: ${props => props.isVisible ? 'auto' : 'none'};
  isolation: isolate;
  
  @media (max-width: 768px) {
    min-width: 280px;
    max-width: 90vw;
    font-size: 12px;
  }
`;

const BoxHeader = styled.div<{ theme: any }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid ${props => props.theme.mode === 'dark' ? 'rgba(255, 107, 107, 0.2)' : 'rgba(145, 202, 255, 0.3)'};
  background: ${props => props.theme.mode === 'dark' ? 'rgba(255, 107, 107, 0.05)' : 'rgba(145, 202, 255, 0.1)'};
  border-radius: 8px 8px 0 0;
  
  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;

const FunctionName = styled.h3<{ theme: any }>`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.mode === 'dark' ? '#ff6b6b' : '#1976d2'};
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const CloseButton = styled.button<{ theme: any }>`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.mode === 'dark' ? 'rgba(255, 107, 107, 0.1)' : 'rgba(145, 202, 255, 0.2)'};
    color: ${props => props.theme.colors.text};
  }
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const BoxContent = styled.div`
  padding: 16px 20px;
  max-height: 70vh;
  overflow-y: auto;
  
  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  
  @media (max-width: 768px) {
    padding: 12px 16px;
    max-height: 60vh;
  }
`;

const ParamItem = styled.div`
  margin-bottom: 6px;
  font-size: 14px;
  line-height: 1.4;
`;

const ParamName = styled.code`
  font-weight: 600;
  color: #1a5cff;
`;

const ExampleCodeBlock = styled.div`
  margin-top: 8px;
`;

const Description = styled.div<{ theme: any }>`
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 1.5;
  color: ${props => props.theme.colors.text};
  
  @media (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 8px;
  }
`;

const TagsContainer = styled.div`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const Tag = styled.span<{ theme: any }>`
  background: ${props => props.theme.mode === 'dark' ? 'rgba(255, 107, 107, 0.2)' : '#1677ff'};
  color: ${props => props.theme.mode === 'dark' ? '#ff6b6b' : 'white'};
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 10px;
    padding: 1px 4px;
  }
`;

interface FunctionParam {
  name: string;
  type: string;
  description: string;
}

interface FunctionDocProps {
  name: string;
  params: FunctionParam[] | string;
  description?: string;
  example?: string;
  tags?: string[];
}

const FunctionDoc: React.FC<FunctionDocProps> = ({ name, params, description, example, tags }) => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLSpanElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  let parsedParams: FunctionParam[] = [];
  let parsedTags: string[] = [];
  
  const showTooltip = () => {
    setIsVisible(true);
  };
  
  const hideTooltip = () => {
    setIsVisible(false);
  };
  
  useEffect(() => {
    const container = containerRef.current;
    const box = boxRef.current;
    
    if (container) {
      const handleMouseEnter = () => setIsVisible(true);
      const handleMouseLeave = (e: MouseEvent) => {
        // 마우스가 팝업으로 이동하는 경우 숨기지 않음
        if (box && box.contains(e.relatedTarget as Node)) {
          return;
        }
        setIsVisible(false);
      };
      
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      container.addEventListener('focus', showTooltip);
      container.addEventListener('blur', hideTooltip);
      
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('focus', showTooltip);
        container.removeEventListener('blur', hideTooltip);
      };
    }
  }, []);

  useEffect(() => {
    const box = boxRef.current;
    
    if (box) {
      const handleMouseEnter = () => setIsVisible(true);
      const handleMouseLeave = () => setIsVisible(false);
      
      box.addEventListener('mouseenter', handleMouseEnter);
      box.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        box.removeEventListener('mouseenter', handleMouseEnter);
        box.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [isVisible]);

  // ESC 키로 팝업 닫기
  useEffect(() => {
    if (isVisible) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsVisible(false);
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isVisible]);

  if (typeof params === 'string') {
    try {
      parsedParams = JSON.parse(params) || [];
    } catch {
      parsedParams = [];
    }
  } else if (Array.isArray(params)) {
    parsedParams = params;
  } else {
    parsedParams = [];
  }

  if (typeof tags === 'string') {
    try {
      parsedTags = JSON.parse(tags) || [];
    } catch {
      parsedTags = [];
    }
  } else if (Array.isArray(tags)) {
    parsedTags = tags;
  } else {
    parsedTags = [];
  }

  return (
    <>
      <Container theme={theme} ref={containerRef}>
        <Title theme={theme}>{name}</Title>
      </Container>
      {isVisible && createPortal(
        <Box 
          theme={theme} 
          ref={boxRef}
          isVisible={isVisible}
        >
          <BoxHeader theme={theme}>
            <FunctionName theme={theme}>{name}</FunctionName>
            <CloseButton theme={theme} onClick={hideTooltip}>
              <FiX size={20} />
            </CloseButton>
          </BoxHeader>
          <BoxContent>
            {description && (
              <Description theme={theme}>
                <strong>설명:</strong> {description}
              </Description>
            )}
            <div style={{ marginBottom: 8 }}>
              <strong>파라미터:</strong>
              <div style={{ marginTop: 6 }}>
                {parsedParams.length > 0 ? (
                  parsedParams.map((p, i) => (
                    <ParamItem key={i}>
                      <ParamName>{p.name}</ParamName> ({p.type}) - {p.description}
                    </ParamItem>
                  ))
                ) : (
                  <div>없음</div>
                )}
              </div>
            </div>
            {example && (
              <div>
                <strong>예시:</strong>
                <ExampleCodeBlock>
                  <CodeBlock className="language-cpp">{example.replace(/\\n/g, '\n')}</CodeBlock>
                </ExampleCodeBlock>
              </div>
            )}
            {parsedTags.length > 0 && (
              <TagsContainer>
                {parsedTags.map((tag, i) => (
                  <Tag key={i} theme={theme}>{tag}</Tag>
                ))}
              </TagsContainer>
            )}
          </BoxContent>
        </Box>,
        document.body
      )}
    </>
  );
};

export default FunctionDoc;
