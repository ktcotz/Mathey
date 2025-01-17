import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { App } from './App';

describe('Test', () => {
  it('Should be 2+2', () => {
    render(<App />);

    expect(2 + 2).toEqual(4);
  });
});
