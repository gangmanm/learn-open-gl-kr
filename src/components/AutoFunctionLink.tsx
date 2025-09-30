import React from 'react';
import { openglFunctions } from '../data/openglFunctions';
import FunctionDoc from './FunctionDoc';

interface AutoFunctionLinkProps {
  children: any;
  className?: string;
  fallbackStyle?: React.CSSProperties;
}

const AutoFunctionLink: React.FC<AutoFunctionLinkProps> = ({ children, className, fallbackStyle }) => {
  
  // 문자열이 아닌 경우 그대로 반환
  if (typeof children !== 'string') {
    return <span className={className}>{children}</span>;
  }

  // OpenGL 함수명 패턴 매칭 (gl로 시작하는 함수들 + glfwGetTime)
  const functionPattern = /\b(gl[A-Z][a-zA-Z0-9]*|glfwGetTime)\b/g;
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match;
  let hasFunction = false;

  while ((match = functionPattern.exec(children)) !== null) {
    const functionName = match[1];
    const startIndex = match.index;
    
    // 함수 데이터베이스에 있는 함수인지 확인
    if (openglFunctions[functionName]) {
      hasFunction = true;
      
      // 매치 이전 텍스트 추가
      if (startIndex > lastIndex) {
        parts.push(children.slice(lastIndex, startIndex));
      }
      
      // 실제 FunctionDoc 컴포넌트 추가
      const funcData = openglFunctions[functionName];
      parts.push(
        <FunctionDoc
          key={`${functionName}-${startIndex}`}
          name={funcData.name}
          params={funcData.params}
          description={funcData.description}
          example={funcData.example}
          tags={funcData.tags}
        />
      );
      
      lastIndex = startIndex + functionName.length;
    }
  }
  
  // 남은 텍스트 추가
  if (lastIndex < children.length) {
    parts.push(children.slice(lastIndex));
  }
  
  // 함수가 있으면 변환된 결과 반환, 없으면 원본 코드 스타일 적용
  if (hasFunction && parts.length > 0) {
    return <span className={className}>{parts}</span>;
  }
  
  // 함수가 없는 경우 원본 코드 스타일 적용
  return (
    <code className={className} style={fallbackStyle}>
      {children}
    </code>
  );
};

export default AutoFunctionLink;
