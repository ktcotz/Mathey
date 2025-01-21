import { test } from '@playwright/test';

test('Should correctly register user', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const emailInput = page.getByLabel(/Email/);
  const passwordInput = page.locator(`input[type="password"]`);
  const submitButton = page.getByRole('button', { name: /Zaloguj się/i });

  await emailInput.fill('babeczka123@wp.pl');
  await passwordInput.fill('Superka123!');

  await submitButton.click();
});
