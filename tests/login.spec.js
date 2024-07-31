const{test,expect} =require ('@playwright/test')
const {Login} = require('../Pages/Login');
const { Logout } = require('../Pages/logout');

test('login Account',async({page})=>{
const log=new Login(page);
await log.openurl();
await page.waitForTimeout(3000);
await log.Email('dsatyam1@gmail.com');
await log.Password('Mojo@123');
await log.loginPage();

});

test.skip('logout Account',async ({page})=>{
    const out =new Logout(page);
    await out.logout();
    await page.pause();

});