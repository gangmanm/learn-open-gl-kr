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
`;

export default GlobalStyle;