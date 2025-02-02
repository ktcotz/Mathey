import { expect, test } from '@playwright/test';

test('Should correctly login user', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const emailInput = page.getByLabel(/Email/);
  const passwordInput = page.locator(`input[type="password"]`);
  const submitButton = page.getByRole('button', { name: /Zaloguj się/i });

  await emailInput.fill('test123@wp.pl');
  await passwordInput.fill('Test123!');

  await submitButton.click();

  const heading = page.getByRole('heading', { name: /Hi/i });

  expect(heading).toBeDefined();
});

test('Should see a error when is invalid data', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const emailInput = page.getByLabel(/Email/);
  const passwordInput = page.locator(`input[type="password"]`);
  const submitButton = page.getByRole('button', { name: /Zaloguj się/i });

  await emailInput.fill('invalid@wp.pl');
  await passwordInput.fill('Test123!');

  await submitButton.click();

  const invalid = page.getByText(/Nie ma takiego użytkownika/i);

  expect(invalid).toBeDefined();
});
