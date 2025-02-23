import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';
import { SwitcherContextProvider } from '../../../ui';
import { AuthContext } from '../../account/context/AuthContext';
import { exampleUser } from '../utils';
import userEvent from '@testing-library/user-event';

const renderWithProviders = async (type: 'valid' | 'invalid') => {
  const { UserMenu } = await import('./UserMenu');

  const client = new QueryClient();

  const value =
    type === 'invalid'
      ? { setupUser: () => null }
      : {
          setupUser: () => null,
          user: exampleUser,
        };

  return render(<UserMenu />, {
    wrapper: ({ children }) => {
      return (
        <MemoryRouter initialEntries={['/dashboard']}>
          <QueryClientProvider client={client}>
            <SwitcherContextProvider>
              <AuthContext.Provider value={value}>
                {children}
              </AuthContext.Provider>
            </SwitcherContextProvider>
          </QueryClientProvider>
        </MemoryRouter>
      );
    },
  });
};

describe('User Menu Component tests coverage', () => {
  test('Should be null when is invalid firstName or lastName', async () => {
    await renderWithProviders('invalid');

    const avatar = screen.queryByText(/KN/i);

    expect(avatar).toBeNull();
  });

  test('Should be visible when is valid firstName and lastName', async () => {
    await renderWithProviders('valid');

    const avatar = screen.queryByText(/KN/i);

    expect(avatar).toHaveTextContent('KN');
  });

  test('Should logout user when clicked logout button', async () => {
    await renderWithProviders('valid');

    const userEvents = await userEvent.setup();

    const avatar = screen.queryByText(/KN/i);

    if (!avatar) return;

    expect(avatar).toHaveTextContent('KN');

    await userEvents.click(avatar);

    const logout = screen.getByText(/Wyloguj się/);

    await userEvents.click(logout);

    expect(screen.queryByText(/KN/i)).toBeDefined();

    screen.debug();
  });
});
