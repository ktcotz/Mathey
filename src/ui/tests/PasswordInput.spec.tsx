import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PasswordInput } from '../PasswordInput';
import { userEvent } from '@testing-library/user-event';

describe('Password Input component tests coverage', () => {
  test('Should have correctly states initially and after interaction', async () => {
    render(<PasswordInput />);

    const userEventSetup = userEvent.setup();

    const button = screen.getByText(/Pokaż hasło/i);
    const buttonIcon = screen.getByLabelText(/Pokaż hasło/i);

    expect(buttonIcon).toBeDefined();
    expect(button).toHaveTextContent(/Pokaż hasło/i);

    await userEventSetup.click(button);

    expect(button).toHaveTextContent(/Schowaj hasło/i);
  });
});
