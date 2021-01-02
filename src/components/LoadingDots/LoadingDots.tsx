import React from 'react';
import { Dot } from 'react-animated-dots';

const LoadingDots = () => {
  return (
    <span style={{ fontSize: '2em' }}>
      <Dot>.</Dot>
      <Dot>.</Dot>
      <Dot>.</Dot>
    </span>
  );
};

export default LoadingDots;
