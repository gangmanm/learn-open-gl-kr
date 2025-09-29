# Learn OpenGL KR (React + Vite)

이 프로젝트는 [LearnOpenGL](https://learnopengl.com) 내용을 바탕으로 한 **한국어 번역/학습 사이트**입니다. 원문 흐름을 해치지 않으면서 한국어 독자에게 친숙한 예시, 주석, 보충 설명을 추가했습니다. React + Vite 기반으로 문서를 MDX로 렌더링하며, 실습 코드/이미지/동영상을 포함해 단계적으로 학습할 수 있도록 구성되어 있습니다.

## 주요 기능

- MDX 문서 렌더링 및 커스텀 컴포넌트 제공
  - `Func`: 함수 설명 툴팁 컴포넌트
  - `Collapsible`: 접이식 정보 블록 (info/tip/warning/note)
  - `VideoPlayer`, `YouTubeEmbed`: 동영상 삽입 (자동 썸네일 생성, react-player 지원)
  - 코드/이미지/목록 등 가독성 높은 스타일
- 다크/라이트 테마 지원
- giscus 기반 댓글 시스템
- SEO: sitemap, robots.txt, 구조화 데이터(JSON-LD)

## 시작하기

```bash
npm i
npm run dev
```

로컬 개발 서버는 기본적으로 `http://localhost:5173` (충돌 시 다른 포트)에서 실행됩니다.

## 스크립트

- `npm run dev`: 개발 서버 실행
- `npm run build`: 프로덕션 번들 생성
- `npm run preview`: 빌드 결과 미리보기
- `npm run lint`: ESLint 검사

## 프로젝트 구조

```
public/
  docs/                 # MDX 문서들
  images/               # 문서 이미지/동영상 리소스
  sitemap.xml           # 사이트맵
  robots.txt            # 크롤러 설정
src/
  components/           # 커스텀 컴포넌트들(Func, Collapsible, VideoPlayer 등)
  contexts/ThemeContext.tsx
  Readme.tsx            # MDX 로더/렌더러 및 컴포넌트 매핑
```

## MDX에서 커스텀 컴포넌트 사용

아래 컴포넌트들은 `src/Readme.tsx`에 매핑되어 있으며, MDX 문서 어디서든 사용할 수 있습니다.

### 1) 함수 문서화 `Func`

```mdx
<Func
  name="glVertexAttribPointer"
  params='[{"name":"index","type":"GLuint","description":"속성 인덱스"}]'
  description="정점 버퍼 레이아웃을 지정합니다."
  tags={["Vertex Attributes"]}
/>
```

설명: 함수 이름을 클릭하면 상세 툴팁이 뜨며, 파라미터/예제/주의 태그를 구조적으로 보여줍니다. MDX에서는 `params`/`tags`를 JSON 문자열로 전달합니다.

### 2) 접이식 블록 `Collapsible`

```mdx
<Collapsible title="주의" variant="warning">
  이미지/코드가 포함된 긴 내용도 잘리지 않도록 처리되어 있습니다.
</Collapsible>
```

설명: 긴 보충 설명, 해설, 정답 등을 접고 펼칠 수 있게 합니다. 이미지가 잘리지 않도록 overflow/height 처리를 적용했습니다. `variant`: `note|info|tip|warning`.

### 3) 동영상 `VideoPlayer` / `YouTubeEmbed`

```mdx
<VideoPlayer
  src="/getting-started/shaders.mp4"
  title="쉐이더 예제"
  useLibraryPlayer={true}
  posterCaptureAt="middle"   # 첫 프레임 대신 중간 프레임 썸네일 자동 생성
/>

<YouTubeEmbed videoId="xxxxxxx" title="강의 영상" />
```

설명:
- `VideoPlayer`: 로컬/원격 mp4 재생. `useLibraryPlayer`로 react-player 기반 재생을 선택할 수 있고, `posterCaptureAt`으로 자동 썸네일(첫/중간/지정초) 캡처를 지원합니다.
- `YouTubeEmbed`: 반응형 비율(기본 16:9), 제목/설명 표시.

### 4) 링크 블록 `LinkBlock`

```mdx
<LinkBlock url="https://learnopengl.com" text="원문 LearnOpenGL" />
```

설명: 문맥 속 참고 링크를 시각적으로 강조해 제공합니다.

### 5) 색상 강조 `Red` / `Green` / `Blue`

```mdx
<Red>중요 경고</Red>, <Green>성공</Green>, <Blue>정보</Blue>
```

설명: 짧은 강조 문구에 사용합니다.
