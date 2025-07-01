import React from 'react';
import styled from 'styled-components';

const Info = styled.div`
  background:rgb(161, 226, 170);
  border: 1px solid rgb(28, 157, 133);
  padding: 1em;
  border-radius: 6px;
  white-space: pre-wrap;
  margin: 1em 0;
  color:rgb(64, 64, 65);
`;

interface InfoBlockProps {
  children: React.ReactNode;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ children }) => (
  <Info>{children}</Info>
);

export default InfoBlock; 