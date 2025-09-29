import React from 'react';
import Giscus from '@giscus/react';
import { useTheme } from '../contexts/ThemeContext';

interface GiscusCommentsProps {
  repo: string;
  repoId?: string;
  category?: string;
  categoryId?: string;
  mapping?: 'pathname' | 'url' | 'title' | 'og:title' | 'specific' | 'number';
  term?: string;
  reactionsEnabled?: boolean;
  emitMetadata?: boolean;
  inputPosition?: 'top' | 'bottom';
  lang?: string;
  loading?: 'lazy' | 'eager';
}

const GiscusComments: React.FC<GiscusCommentsProps> = ({
  repo,
  repoId = '',
  category = 'General',
  categoryId = '',
  mapping = 'pathname',
  term,
  reactionsEnabled = true,
  emitMetadata = false,
  inputPosition = 'top',
  lang = 'ko',
  loading = 'lazy'
}) => {
  const { theme } = useTheme();

  // 임시로 오류 처리 추가
  try {
    return (
      <div>
        <Giscus
          id="comments"
          repo={repo as `${string}/${string}`}
          repoId={repoId}
          category={category}
          categoryId={categoryId}
          mapping={mapping}
          term={term}
          reactionsEnabled={reactionsEnabled}
          emitMetadata={emitMetadata}
          inputPosition={inputPosition}
          theme={theme.mode === 'dark' ? 'dark' : 'light'}
          lang={lang}
          loading={loading}
        />
        <div style={{ 
          marginTop: '1rem', 
          padding: '1rem', 
          backgroundColor: theme.mode === 'dark' ? '#2d3748' : '#f7fafc',
          borderRadius: '8px',
          fontSize: '0.875rem',
          color: theme.mode === 'dark' ? '#a0aec0' : '#4a5568'
        }}>
          <p><strong>giscus 설정 정보:</strong></p>
          <p>저장소: {repo}</p>
          <p>매핑: {mapping}</p>
          <p>카테고리: {category}</p>
          <p>언어: {lang}</p>
          <p><strong>다음 단계:</strong></p>
          <ol style={{ marginLeft: '1rem' }}>
            <li>https://giscus.app/ko 에서 저장소 입력</li>
            <li>올바른 repo-id와 category-id 복사</li>
            <li>설정 업데이트</li>
          </ol>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#fed7d7', 
        borderRadius: '8px',
        color: '#c53030'
      }}>
        giscus 로딩 중 오류가 발생했습니다: {String(error)}
      </div>
    );
  }
};

export default GiscusComments;
