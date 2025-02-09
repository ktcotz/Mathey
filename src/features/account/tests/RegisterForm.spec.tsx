import { render, screen } from '@testing-library/react';

import { describe, expect, test } from 'vitest';
import { SwitcherContextProvider } from '../../../ui';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';

const renderFormWithProviders = async () => {
  const { RegisterForm } = await import('./../views/RegisterForm');

  const client = new QueryClient();

  return render(<RegisterForm />, {
    wrapper: ({ children }) => {
      return (
        <MemoryRouter initialEntries={['/']}>
          <QueryClientProvider client={client}>
            <SwitcherContextProvider>{children}</SwitcherContextProvider>
          </QueryClientProvider>
        </MemoryRouter>
      );
    },
  });
};
describe('Register Form Component tests coverage', () => {
  test('Should correctly render layout and inputs', async () => {
    await renderFormWithProviders();

    const emailInput = screen.getByRole('textbox', { name: /Email/i });
    const passwordInput = screen.getByLabelText(/Hasło/i, {
      selector: 'input',
    });
    const phoneInput = screen.getByLabelText(/Numer telefonu/i);

    const registerButton = screen.getByRole('button', {
      name: /Zarejestruj się/i,
    });

    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(phoneInput).toHaveValue('');
    expect(registerButton).toBeDefined();
  });

  test('Should correctly render errors when invalid data.', async () => {
    await renderFormWithProviders();

    const userEventSetup = userEvent.setup();

    const emailInput = screen.getByRole('textbox', { name: /Email/i });
    const passwordInput = screen.getByLabelText(/Hasło/i, {
      selector: 'input',
    });
    const phoneInput = screen.getByLabelText(/Numer telefonu/i);

    const registerButton = screen.getByRole('button', {
      name: /Zarejestruj się/i,
    });

    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(registerButton).toBeDefined();

    await userEventSetup.type(emailInput, 'abd.pl');
    await userEventSetup.type(passwordInput, 'abd');
    await userEventSetup.type(phoneInput, '12345');

    await userEventSetup.click(registerButton);

    const errors = screen.getAllByText((_, element) => {
      if (!element) return false;
      return element?.id.includes('form-item-message');
    });

    expect(errors).toHaveLength(3);
  });

  test('Should correctly submit data when valid data.', async () => {
    await renderFormWithProviders();

    const userEventSetup = userEvent.setup();

    const emailInput = screen.getByRole('textbox', { name: /Email/i });
    const passwordInput = screen.getByLabelText(/Hasło/i, {
      selector: 'input',
    });
    const phoneInput = screen.getByLabelText(/Numer telefonu/i);

    const registerButton = screen.getByRole('button', {
      name: /Zarejestruj się/i,
    });

    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(registerButton).toBeDefined();

    await userEventSetup.type(emailInput, 'abd@wp.pl');
    await userEventSetup.type(passwordInput, 'abdasd!A');
    await userEventSetup.type(phoneInput, '123456789');

    await userEventSetup.click(registerButton);

    const errors = screen.queryAllByText((_, element) => {
      if (!element) return false;
      return element?.id.includes('form-item-message');
    });

    expect(errors).toHaveLength(0);
  });
});
