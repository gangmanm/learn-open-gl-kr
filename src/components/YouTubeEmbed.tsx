import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const YouTubeContainer = styled.div<{ theme: any }>`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 2rem auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.surface};
  
  @media (max-width: 768px) {
    margin: 1rem 0;
    border-radius: 8px;
  }
`;

const VideoWrapper = styled.div<{ aspectRatio: string }>`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: ${props => {
    switch (props.aspectRatio) {
      case '16:9': return '56.25%';
      case '4:3': return '75%';
      case '1:1': return '100%';
      default: return '56.25%';
    }
  }};
`;

const YouTubeIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const VideoInfo = styled.div<{ theme: any }>`
  padding: 1rem;
  background: ${props => props.theme.colors.surface};
  border-top: 1px solid ${props => props.theme.colors.border};
  
  h4 {
    margin: 0 0 0.5rem 0;
    color: ${props => props.theme.colors.text};
    font-size: 1.125rem;
    font-weight: 600;
  }
  
  p {
    margin: 0;
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.875rem;
    line-height: 1.5;
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem;
    
    h4 {
      font-size: 1rem;
    }
    
    p {
      font-size: 0.8rem;
    }
  }
`;

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  description?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
  width?: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoId,
  title,
  description,
  aspectRatio = '16:9',
  autoplay = false,
  muted = false,
  controls = true,
  width = "100%"
}) => {
  const { theme } = useTheme();

  // YouTube URL 파라미터 구성
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    mute: muted ? '1' : '0',
    controls: controls ? '1' : '0',
    rel: '0', // 관련 동영상 표시 안함
    modestbranding: '1', // YouTube 로고 최소화
    playsinline: '1', // iOS에서 인라인 재생
  });

  const embedUrl = `https://www.youtube.com/embed/${videoId}?${params.toString()}`;

  return (
    <YouTubeContainer theme={theme} style={{ width }}>
      <VideoWrapper aspectRatio={aspectRatio}>
        <YouTubeIframe
          src={embedUrl}
          title={title || "YouTube video player"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </VideoWrapper>
      
      {(title || description) && (
        <VideoInfo theme={theme}>
          {title && <h4>{title}</h4>}
          {description && <p>{description}</p>}
        </VideoInfo>
      )}
    </YouTubeContainer>
  );
};

export default YouTubeEmbed;
