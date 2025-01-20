import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { FormSwitcher } from './FormSwitcher';
import { homeSwitcher } from './data/switcher';
import { SwitcherContextProvider } from './SwitcherContext';

describe('Form Switcher Component tests coverage', () => {
  test('Render correctly form switcher items and correctly work with context', () => {
    render(<FormSwitcher data={homeSwitcher} />, {
      wrapper: ({ children }) => {
        return <SwitcherContextProvider>{children}</SwitcherContextProvider>;
      },
    });

    const items = homeSwitcher.map((item) => screen.getByText(item.name));

    expect(items).toHaveLength(homeSwitcher.length);
  });
});
