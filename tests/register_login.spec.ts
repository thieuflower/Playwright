

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

test('Register new user', async ({ request }) => {
  const register = await request.post(`/users/v1/register`, {
    data: {
      username: 'flower',
      password : 'test1',
      email: 'flowerthieu@gmail.com'
    },
  });
  expect(register.ok()).toBeTruthy();
});

test('Login', async ({ request }) => {
  const login = await request.post(`/users/v1/login`, {
    data: {
      username: 'flower',
      password : 'test1',
    },
  });
  expect(login.ok()).toBeTruthy();
  console.log(await login.json());
});

test("Displays all details for all users", async ({ request }) => {
  const inforUser = await request.get(`/users/v1/_debug`);
  expect(inforUser.ok()).toBeTruthy();
  expect(inforUser.status()).toBe(200);
  console.log(await inforUser.json());
});


