import { expect, test } from '@playwright/test';

test('Should correctly login user', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const emailInput = page.getByLabel(/Email/);
  const passwordInput = page.locator(`input[type="password"]`);
  const submitButton = page.getByRole('button', { name: /Zaloguj się/i });

  await emailInput.fill('kamil.naskret@example.com');
  await passwordInput.fill('Secure123!');

  await submitButton.click();

  const button = page.locator(`[aria-haspopup="menu"]`);

  expect(button).toBeDefined();
});

test('Should see a error when is invalid data', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const emailInput = page.getByLabel(/Email/);
  const passwordInput = page.locator(`input[type="password"]`);
  const submitButton = page.getByRole('button', { name: /Zaloguj się/i });

  await emailInput.fill('invalid@wp.pl');
  await passwordInput.fill('Test123!');

  await submitButton.click();

  await page.waitForResponse((response) => response.status() !== 200);

  const invalid = page.getByText(/Nie ma takiego użytkownika/i);

  expect(invalid).toBeDefined();
});
