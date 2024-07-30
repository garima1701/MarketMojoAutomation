import{test,expect} from '@playwright/test';
import {Login} from '../Pages/Login';

test('login account',async({page})=>{

    const browser =new Login(page);
    browser.openUrl();
    await page.waitForTimeout(3000);

});