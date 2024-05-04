import { test, expect } from '@playwright/test';

test('Add to cart and checkout', async ({ page }) => {
  await page.goto('https://frontend.staging.novalearn.org');
  await page.pause()
  await page.waitForSelector('text=Shop',{timeout: 5000})
  await page.locator('text=Shop', { exact: true }).first().click();
})
//   await page.fill('input[name="firstName"]', 'Flower');
//   await page.fill('input[name="lastName"]', 'Thieu');
//   await page.fill('input[name="email"]', 'flower.thieu@vatek.asia');
//   await page.fill('input[name="phone"]', '0395627877');
//   await page.fill('input[name="companyName"]', 'Vatek asia company');
//   await page.fill('input[name="address"]', '102 Tran Phu');
//   await page.fill('input[name="town"]', 'Ha Dong');
//   await page.fill('input[name="postCode"]', '100000');
//   await page.fill('input[name="state"]', 'Ha Noi');
//   await page.fill('input[name="country"]', 'Viet Nam');
//   await page.fill('input[name="notes"]', 'Shipping on weekdays');
//   await page.click('button[type="submit"]');
//   await page.close();
// });
