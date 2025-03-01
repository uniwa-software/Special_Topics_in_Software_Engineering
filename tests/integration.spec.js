// @ts-check
import { test, expect } from '@playwright/test';

test('Ο χρήστης μπορεί να συνδεθεί επιτυχώς', async ({ page }) => {
  await page.goto('http://localhost:5173/auth/login');
  await page.fill('input[name="username"]', 'Nikos_test');
  await page.fill('input[name="password"]', 'test');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('http://localhost:5173');

});


