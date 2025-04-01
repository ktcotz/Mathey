import { expect, test } from '@playwright/test';

test('Should correctly register user', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const randomNumber = Array.from({ length: 9 }, () =>
    Math.floor(Math.random() * 10),
  ).join('');
  const registerFormButton = page.getByRole('button', { name: /Rejestracja/i });

  await registerFormButton.click();

  await page.waitForTimeout(1000);

  const emailInput = page.getByLabel(/Email/);
  const phoneInput = page.getByLabel(/Numer telefonu/);
  const passwordInput = page.locator(`input[type="password"]`);
  const submitButton = page.getByRole('button', { name: /Zarejestruj się/i });

  await emailInput.fill(`test${randomNumber}@wp.pl`);
  await passwordInput.fill('Test123!');
  await phoneInput.fill('123456789');

  await submitButton.click();

  await page.waitForResponse((resp) => resp.status() === 200);

  const loginButton = page.getByRole('button', { name: /Zarejetruj się/i });

  expect(loginButton).toBeDefined();
});

test('Should see a error when is email actually in database', async ({
  page,
}) => {
  await page.goto('http://localhost:3000');

  const registerFormButton = page.getByRole('button', { name: /Rejestracja/i });

  await registerFormButton.click();

  await page.waitForTimeout(1000);

  const emailInput = page.getByLabel(/Email/);
  const phoneInput = page.getByLabel(/Numer telefonu/);
  const passwordInput = page.locator(`input[type="password"]`);
  const submitButton = page.getByRole('button', { name: /Zarejestruj się/i });

  await emailInput.fill(`kamil.naskret@example.com`);
  await passwordInput.fill('Secure123!');
  await phoneInput.fill('123456789');

  await submitButton.click();

  const response = await page.waitForResponse((resp) => resp.status() !== 200);

  expect(response.status()).toBe(422);
});
