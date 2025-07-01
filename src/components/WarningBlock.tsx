import React from 'react';
import styled from 'styled-components';

const Warning = styled.div`
  background:rgb(238, 153, 153);
  border: 1px solid rgb(126, 15, 15);
  padding: 1em;
  border-radius: 6px;
  white-space: pre-wrap;
  margin: 1em 0;
`;

interface WarningBlockProps {
  children: React.ReactNode;
}

const WarningBlock: React.FC<WarningBlockProps> = ({ children }) => (
  <Warning>{children}</Warning>
);

export default WarningBlock; 