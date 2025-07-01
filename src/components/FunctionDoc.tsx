import React from 'react';
import styled from 'styled-components';

const Container = styled.span`
  position: relative;
  display: inline-block;
  margin: 0 4px;
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  color: #1677ff;

  ${Container}:hover & {
    background: #e6f7ff;
    border-color: #91caff;
  }
`;

const Box = styled.div`
  display: inline-block;
  border: 1px solid #91caff;
  background: #e6f7ff;
  border-radius: 6px;
  padding: 12px;
  position: absolute;
  bottom: 100%;
  left: 0;
  min-width: 300px;
  max-width: 400px;
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(22, 119, 255, 0.15);
  margin-bottom: 8px;

  ${Container}:hover & {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
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

const CodeBlock = styled.div`
  background: #222;
  color: #fff;
  padding: 8px;
  border-radius: 4px;
  font-family: monospace;
  white-space: pre-wrap;
  margin-top: 8px;
`;

const Description = styled.div`
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
`;

const TagsContainer = styled.div`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const Tag = styled.span`
  background: #1677ff;
  color: white;
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
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
  let parsedParams: FunctionParam[] = [];
  let parsedTags: string[] = [];

  if (typeof params === 'string') {
    try {
      parsedParams = JSON.parse(params);
    } catch {
      parsedParams = [];
    }
  } else {
    parsedParams = params;
  }

  if (typeof tags === 'string') {
    try {
      parsedTags = JSON.parse(tags);
    } catch {
      parsedTags = [];
    }
  } else if (Array.isArray(tags)) {
    parsedTags = tags;
  }

  return (
    <span style={{ display: 'inline-block' }}>
      <Container>
        <Title>{name}</Title>
        <Box>
          {description && (
            <Description>
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
              <CodeBlock>{example}</CodeBlock>
            </div>
          )}
          {parsedTags.length > 0 && (
            <TagsContainer>
              {parsedTags.map((tag, i) => (
                <Tag key={i}>{tag}</Tag>
              ))}
            </TagsContainer>
          )}
        </Box>
      </Container>
    </span>
  );
};

export default FunctionDoc;
