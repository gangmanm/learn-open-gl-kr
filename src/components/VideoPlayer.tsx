import React, { useState, useRef, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';
import ReactPlayer from 'react-player';

const VideoContainer = styled.div<{ theme: any }>`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 2rem auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.surface};
  aspect-ratio: 16 / 9;
  min-height: 200px;
  contain: layout paint;
  
  @media (max-width: 768px) {
    margin: 1rem 0;
    border-radius: 8px;
    min-height: 150px;
  }
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #000;
  outline: none;
  
  &::-webkit-media-controls {
    display: none !important;
  }
  
  &::-webkit-media-controls-panel {
    display: none !important;
  }
`;

const PosterOverlay = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
`;

const Controls = styled.div<{ theme: any; isVisible: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '10px'});
  transition: all 0.2s ease;
  z-index: 20;
  will-change: transform, opacity;
  
  @media (max-width: 768px) {
    padding: 0.75rem;
    gap: 0.75rem;
  }
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  @media (max-width: 768px) {
    padding: 0.4rem;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
`;

const Progress = styled.div<{ progress: number }>`
  height: 100%;
  background: #6366f1;
  border-radius: 2px;
  width: ${props => props.progress}%;
  transition: width 0.1s ease;
`;

const TimeDisplay = styled.span`
  color: white;
  font-size: 0.875rem;
  font-family: 'Pretendard', monospace;
  min-width: 80px;
  text-align: right;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
    min-width: 70px;
  }
`;

const VideoTitle = styled.div<{ theme: any }>`
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

const PlayButton = styled.button<{ theme: any }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
  will-change: transform;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: translate(-50%, -50%) scale(1.05);
  }
  
  &:active {
    transform: translate(-50%, -50%) scale(0.95);
  }
  
  svg {
    width: 32px;
    height: 32px;
    color: white;
    margin-left: 4px;
  }
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  description?: string;
  width?: string;
  height?: string;
  useLibraryPlayer?: boolean; // react-player 사용 여부
  posterCaptureAt?: 'first' | 'middle' | number; // 자동 썸네일 캡처 타이밍
}

const VideoPlayer: React.FC<VideoPlayerProps> = React.memo(({
  src,
  poster,
  title,
  description,
  width = "100%",
  height = "auto",
  useLibraryPlayer = false,
  posterCaptureAt = 'middle'
}) => {
  const { theme } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0); // kept for external consumers; not used for UI
  const [currentTime, setCurrentTime] = useState(0); // kept for logic; UI is ref-driven
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const lastTimeUpdateRef = useRef<number>(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const [generatedPoster, setGeneratedPoster] = useState<string | null>(null);
  const [isCapturingPoster, setIsCapturingPoster] = useState(false);
  const originalTimeRef = useRef<number>(0);

  const togglePlay = useCallback(async () => {
    if (videoRef.current) {
      try {
        if (isPlaying) {
          videoRef.current.pause();
          setIsPlaying(false);
        } else {
          await videoRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Video play error:', error);
        setIsPlaying(false);
      }
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
      if (now - lastTimeUpdateRef.current < 200) return; // throttle to ~5fps
      lastTimeUpdateRef.current = now;

      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 1;
      setCurrentTime(current);
      setProgress((current / total) * 100);
      // Direct DOM updates to avoid React re-render cascades
      if (progressRef.current) {
        progressRef.current.style.width = `${(current / total) * 100}%`;
      }
      if (timeRef.current) {
        const fmt = (t: number) => {
          const m = Math.floor(t / 60);
          const s = Math.floor(t % 60).toString().padStart(2, '0');
          return `${m}:${s}`;
        };
        timeRef.current.textContent = `${fmt(current)} / ${fmt(duration || total)}`;
      }
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setDuration(video.duration);
    // 자동 포스터 캡처 (poster 미제공 시)
    if (!poster) {
      try {
        const d = Math.max(0, video.duration || 0);
        let target = 0;
        if (typeof posterCaptureAt === 'number') target = Math.min(Math.max(0, posterCaptureAt), Math.max(0, d - 0.05));
        else if (posterCaptureAt === 'middle') target = d > 0 ? Math.max(0, d / 2) : 0;
        else target = 0;
        originalTimeRef.current = video.currentTime;
        setIsCapturingPoster(true);
        video.currentTime = target;
      } catch {}
    }
  }, [poster, posterCaptureAt]);

  const handleLoadedData = useCallback(() => {
    if (!videoRef.current) return;
    if (poster) return; // 사용자가 poster 제공 시 그대로 사용
    try {
      const videoEl = videoRef.current;
      const canvas = document.createElement('canvas');
      const w = videoEl.videoWidth || 1280;
      const h = videoEl.videoHeight || 720;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(videoEl, 0, 0, w, h);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      setGeneratedPoster(dataUrl);
    } catch {
      // ignore capture errors (e.g., cross-origin)
    }
  }, [poster]);

  const handleSeeked = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!isCapturingPoster) return;
    try {
      const canvas = document.createElement('canvas');
      const w = video.videoWidth || 1280;
      const h = video.videoHeight || 720;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(video, 0, 0, w, h);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      setGeneratedPoster(dataUrl);
    } catch {}
    // 원래 위치로 되돌림
    try {
      video.currentTime = originalTimeRef.current || 0;
      video.pause();
    } catch {}
    setIsCapturingPoster(false);
  }, [isCapturingPoster]);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * duration;
      videoRef.current.currentTime = newTime;
    }
  }, [duration]);

  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  }, []);

  const handleMouseEnter = useCallback(() => setShowControls(true), []);
  const handleMouseLeave = useCallback(() => setShowControls(false), []);

  const containerStyle = useMemo(() => ({ width, height }), [width, height]);

  return (
    <VideoContainer 
      theme={theme}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={containerStyle}
    >
      {useLibraryPlayer ? (
        <ReactPlayer
          url={src}
          playing={isPlaying}
          light={poster || generatedPoster || undefined}
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0 }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onProgress={({ playedSeconds, played }) => {
            setCurrentTime(playedSeconds);
            setProgress(played * 100);
          }}
          onDuration={(d) => setDuration(d)}
          controls={false}
        />
      ) : (
        <Video
          ref={videoRef}
          src={src}
          poster={poster}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onLoadedData={handleLoadedData}
          onSeeked={handleSeeked}
          onPlay={useCallback(() => setIsPlaying(true), [])}
          onPause={useCallback(() => setIsPlaying(false), [])}
        />
      )}

      {!isPlaying && (poster || generatedPoster) && (
        <PosterOverlay src={(poster as string) || generatedPoster || ''} alt="video poster" />
      )}
      
      {!isPlaying && (
        <PlayButton theme={theme} onClick={togglePlay}>
          <FiPlay />
        </PlayButton>
      )}
      
      <Controls theme={theme} isVisible={showControls || !isPlaying}>
        <ControlButton onClick={togglePlay}>
          {isPlaying ? <FiPause /> : <FiPlay />}
        </ControlButton>
        
        <ControlButton onClick={toggleMute}>
          {isMuted ? <FiVolumeX /> : <FiVolume2 />}
        </ControlButton>
        
        <ControlButton onClick={toggleFullscreen}>
          <FiMaximize />
        </ControlButton>
      </Controls>
      
      {(title || description) && (
        <VideoTitle theme={theme}>
          {title && <h4>{title}</h4>}
          {description && <p>{description}</p>}
        </VideoTitle>
      )}
    </VideoContainer>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;
