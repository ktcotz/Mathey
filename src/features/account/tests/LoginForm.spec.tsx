import { render, screen } from '@testing-library/react';

import { describe, expect, test } from 'vitest';
import { LoginForm } from '../views/LoginForm';
import { SwitcherContextProvider } from '../../../ui';
import userEvent from '@testing-library/user-event';

describe('Login Form Component tests coverage', () => {
  test('Should correctly render layout and inputs', () => {
    render(<LoginForm />, {
      wrapper: ({ children }) => {
        return <SwitcherContextProvider>{children}</SwitcherContextProvider>;
      },
    });

    const emailInput = screen.getByRole('textbox', { name: /Email/i });
    const passwordInput = screen.getByLabelText(/Hasło/i, {
      selector: 'input',
    });

    const loginButton = screen.getByRole('button', { name: /Zaloguj się/i });

    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(loginButton).toBeDefined();
  });

  test('Should correctly render errors when invalid data.', async () => {
    render(<LoginForm />, {
      wrapper: ({ children }) => {
        return <SwitcherContextProvider>{children}</SwitcherContextProvider>;
      },
    });

    const userEventSetup = userEvent.setup();

    const emailInput = screen.getByRole('textbox', { name: /Email/i });
    const passwordInput = screen.getByLabelText(/Hasło/i, {
      selector: 'input',
    });

    const loginButton = screen.getByRole('button', { name: /Zaloguj się/i });

    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(loginButton).toBeDefined();

    await userEventSetup.type(emailInput, 'abd.pl');
    await userEventSetup.type(passwordInput, 'abd');
    await userEventSetup.click(loginButton);

    const errors = screen.getAllByText((_, element) => {
      if (!element) return false;
      return element?.id.includes('form-item-message');
    });

    expect(errors).toHaveLength(2);
  });

  test('Should correctly submit data when valid data.', async () => {
    render(<LoginForm />, {
      wrapper: ({ children }) => {
        return <SwitcherContextProvider>{children}</SwitcherContextProvider>;
      },
    });

    const userEventSetup = userEvent.setup();

    const emailInput = screen.getByRole('textbox', { name: /Email/i });
    const passwordInput = screen.getByLabelText(/Hasło/i, {
      selector: 'input',
    });

    const loginButton = screen.getByRole('button', { name: /Zaloguj się/i });

    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(loginButton).toBeDefined();

    await userEventSetup.type(emailInput, 'abd@wp.pl');
    await userEventSetup.type(passwordInput, 'Małpeczka123!');
    await userEventSetup.click(loginButton);

    const errors = screen.queryAllByText((_, element) => {
      if (!element) return false;
      return element?.id.includes('form-item-message');
    });

    expect(errors).toHaveLength(0);
  });
});
