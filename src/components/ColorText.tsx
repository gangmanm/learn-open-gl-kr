import React from 'react';
export default function ColorText({ color, children }: { color: string, children: React.ReactNode }) {
  return <span style={{ color }}>{children}</span>;
} 