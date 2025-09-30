import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

@font-face {
	font-family: 'Pretendard';
	font-weight: 900;
	font-display: swap;
	src: local('Pretendard Black'), url(./woff2/Pretendard-Black.woff2) format('woff2'), url(./woff/Pretendard-Black.woff) format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 800;
	font-display: swap;
	src: local('Pretendard ExtraBold'), url(./woff2/Pretendard-ExtraBold.woff2) format('woff2'), url(./woff/Pretendard-ExtraBold.woff) format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 700;
	font-display: swap;
	src: local('Pretendard Bold'), url(./woff2/Pretendard-Bold.woff2) format('woff2'), url(./woff/Pretendard-Bold.woff) format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 600;
	font-display: swap;
	src: local('Pretendard SemiBold'), url(./woff2/Pretendard-SemiBold.woff2) format('woff2'), url(./woff/Pretendard-SemiBold.woff) format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 500;
	font-display: swap;
	src: local('Pretendard Medium'), url(./woff2/Pretendard-Medium.woff2) format('woff2'), url(./woff/Pretendard-Medium.woff) format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 400;
	font-display: swap;
	src: local('Pretendard Regular'), url(./woff2/Pretendard-Regular.woff2) format('woff2'), url(./woff/Pretendard-Regular.woff) format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 300;
	font-display: swap;
	src: local('Pretendard Light'), url(./woff2/Pretendard-Light.woff2) format('woff2'), url(./woff/Pretendard-Light.woff) format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 200;
	font-display: swap;
	src: local('Pretendard ExtraLight'), url(./woff2/Pretendard-ExtraLight.woff2) format('woff2'), url(./woff/Pretendard-ExtraLight.woff) format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 100;
	font-display: swap;
	src: local('Pretendard Thin'), url(./woff2/Pretendard-Thin.woff2) format('woff2'), url(./woff/Pretendard-Thin.woff) format('woff');
}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    font-family: 'Paperlogy', 'Inter', 'Pretendard', 'Segoe UI', Arial, sans-serif;
    transition: background-color 0.3s ease, color 0.3s ease;
    overflow: hidden;
	}

  #root {
    height: 100%;
  }

  /* 다크모드 전환 시 부드러운 애니메이션 */
  * {
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  }

  /* 스크롤바 스타일링 */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }

  /* 다크모드에서 스크롤바 */
  [data-theme="dark"] ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
  }

  [data-theme="dark"] ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  /* 다크모드에서 리스트 텍스트 색상 강제 적용 */
  [data-theme="dark"] ul li,
  [data-theme="dark"] ul li *,
  [data-theme="dark"] ol li,
  [data-theme="dark"] ol li * {
    color: #ffffff !important;
    font-weight: 500 !important;
  }

  /* 다크모드에서 리스트 내 링크는 파란색으로 유지 */
  [data-theme="dark"] ul li a,
  [data-theme="dark"] ul li a *,
  [data-theme="dark"] ol li a,
  [data-theme="dark"] ol li a *,
  [data-theme="dark"] ul li [role="link"],
  [data-theme="dark"] ul li [role="link"] *,
  [data-theme="dark"] ol li [role="link"],
  [data-theme="dark"] ol li [role="link"] * {
    color: #4096ff !important;
    text-decoration: underline !important;
  }

  /* 다크모드에서 LinkBlock 컴포넌트 스타일 */
  [data-theme="dark"] ul li span[role="link"],
  [data-theme="dark"] ol li span[role="link"] {
    background: #1a365d !important;
    border-color: #4096ff !important;
    color: #4096ff !important;
  }

  [data-theme="dark"] ul li span[role="link"]:hover,
  [data-theme="dark"] ol li span[role="link"]:hover {
    background: #2d5a87 !important;
    color: #60a5fa !important;
  }

  /* 라이트모드에서 리스트 텍스트 색상 */
  [data-theme="light"] ul li,
  [data-theme="light"] ul li *,
  [data-theme="light"] ol li,
  [data-theme="light"] ol li * {
    color: #333333 !important;
  }

  /* 모든 리스트 호버 효과 강제 차단 - 최강 버전 */
  * ul li:hover,
  * ol li:hover,
  * li:hover,
  ul li:hover,
  ol li:hover,
  li:hover,
  div ul li:hover,
  div ol li:hover,
  div li:hover {
    background: transparent !important;
    background-color: transparent !important;
    background-image: none !important;
    transform: none !important;
    transition: none !important;
    box-shadow: none !important;
    border: none !important;
    outline: none !important;
  }

  /* 모든 테마에서 리스트 호버 효과 차단 */
  [data-theme="dark"] * ul li:hover,
  [data-theme="dark"] * ol li:hover,
  [data-theme="dark"] * li:hover,
  [data-theme="dark"] ul li:hover,
  [data-theme="dark"] ol li:hover,
  [data-theme="light"] * ul li:hover,
  [data-theme="light"] * ol li:hover,
  [data-theme="light"] * li:hover,
  [data-theme="light"] ul li:hover,
  [data-theme="light"] ol li:hover {
    background: transparent !important;
    background-color: transparent !important;
    background-image: none !important;
    transform: none !important;
    box-shadow: none !important;
    border: none !important;
    outline: none !important;
  }

  /* 브라우저 기본 스타일 차단 */
  ul, ol, li {
    list-style: none !important;
  }

  ul li, ol li, li {
    background: transparent !important;
    background-color: transparent !important;
  }

  /* 모든 상태에서 호버 효과 차단 */
  ul li:hover,
  ul li:focus,
  ul li:active,
  ol li:hover,
  ol li:focus,
  ol li:active,
  li:hover,
  li:focus,
  li:active {
    background: transparent !important;
    background-color: transparent !important;
    background-image: none !important;
    transform: none !important;
    transition: none !important;
    box-shadow: none !important;
    border: none !important;
    outline: none !important;
  }

  /* 색상 컴포넌트 식별자 우선 */
  [data-color-text="true"] {
    color: inherit;
  }

`;

export default GlobalStyle;