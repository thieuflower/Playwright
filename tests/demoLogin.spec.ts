import { test, expect } from '@playwright/test';
import { PlaywrightTestConfig } from '@playwright/test';
const loginUrl = 'https://frontend.staging.novalearn.org/auth/login?type=adult';
const homeUrl = 'https://frontend.staging.novalearn.org/adult/home';

test('Log in with a valid account', async ({ page }) => {
    await page.goto(loginUrl);
    await page.fill('input[name="email"]', 'hongnguyen3917@gmail.com');
    await page.fill('input[name="password"]', 'hongnguyen3917@gmail.com');
    const loginButton = await page.getByRole('button', { name: 'Log in' });
    await Promise.all([
      loginButton.click(),
      page.waitForNavigation() 
  ]);
    await page.waitForTimeout(5000); 
    await page.goto(homeUrl)
    expect(page.url()).toBe(homeUrl);
    await page.close();
  });
test('Log in with the wrong account', async ({ page }) => {
    await page.goto(loginUrl);
    await page.fill('input[name="email"]', '  hongnguyen3917@gmail.com ');
    await page.fill('input[name="password"]', 'hongnguyen3917@gmail.com');
    const loginButton = await page.getByRole('button', { name: 'Log in' });
    await Promise.all([
        loginButton.click(),
        page.waitForNavigation()
    ]);
    await page.close();
});
test('Log in with a non-existing account', async ({ page }) => {
  await page.goto(loginUrl);
  await page.fill('input[name="email"]', '  thieuhoa@gmail.com ');
  await page.fill('input[name="password"]', 'Test12345@');
  const loginButton = await page.getByRole('button', { name: 'Log in' }).click();
  await page.close();
});