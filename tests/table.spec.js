import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.marketsmojo.com/mojofeed/login');

  page.on('popup', async (popup)=>{

    console.log('popup detected');
    await popup.waitForLoadState();
    await popuo.click()

  });
  
  await page.getByPlaceholder('Email Address').fill('dsatyam1@gmail.com');
  await page.getByPlaceholder('Enter Password').  click();
  await page.getByPlaceholder('Enter Password').fill('Mojo@123');
  await page.locator("//div/div[2]/div/div[2]/form/button").click();
  await page.waitForTimeout(2000);
  await page.locator('#mm-header > div > nav.links > ul > li.current.top-level-link > a').isVisible();
  await page.locator('//span[normalize-space()="Stocks"]').hover();
  await page.locator('//span[normalize-space()="Stocks"]').click()
  await page.waitForTimeout(500);
  await page.locator('//div[normalize-space()="Top Mojo Stocks"]').hover();
  await page.locator('//div[normalize-space()="Top Mojo Stocks"]').click();
  await page.waitForTimeout(2000);
  await page.locator('//a[normalize-space()="Current List"]').click();
  await page.waitForTimeout(2000);
  const table = await page.locator("//div[2]/div/div/div/div[2]/div/div/table");
  const rows = table.locator('tr');
    for(const row of rows){
    const cells= await row.locator('td');
    for (const cell of cells){
        const cellText = await cell.textContent();
        console.log(cellText);
    }
  }

  await page.getByRole('button', { name: 'logo' }).click();
  await page.locator('#mm-header').getByText('Logout').click();
});
