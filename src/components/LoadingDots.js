import React from 'react';
import { Dot } from 'react-animated-dots';

function LoadingDots() {
  return (
    <span style={{ fontSize: '2em' }}>
      <Dot>.</Dot>
      <Dot>.</Dot>
      <Dot>.</Dot>
    </span>
  );
}

export default LoadingDots;
