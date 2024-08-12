import { test, expect } from '@playwright/test';
import { TIMEOUT } from 'dns';

test('test - current List', async ({ page }) => {
  await page.goto('https://www.marketsmojo.com/mojofeed/login');
  if(await page.locator('svg').isVisible()){
    await page.locator('svg').click();
  }
  await page.waitForTimeout(500);
  await page.getByPlaceholder('Email Address').fill('dsatyam1@gmail.com');
  await page.getByPlaceholder('Enter Password').click();
  await page.getByPlaceholder('Enter Password').fill('Mojo@123');
  await page.getByRole('button', { name: 'Login' }).click();
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
  const tablesel= '//*[@id="navallcap"]/div/div[2]/div/div/table'; 
  const tabelData = new Map<string, string[]>();
  const rows = await page.$$(tablesel +'//tr'); 
  console.log(`row found: ${rows.length} `)
  for (const row of rows){
    const cells = await row.$$(`xpath=td|th`);
    console.log(`number of cells in row: ${cells.length}`)
    if(cells.length > 0){
      const key = await cells[0].textContent()||'';
      const values: string[] =[];
      for(let i =1; i<cells.length;i++){   
        const value = await cells[i].textContent();
        console.log(`value: ${value}`);
        values.push((value||'').trim());
      }
      tabelData.set(key.trim(), values);
    }
    console.log(tabelData);
  }
  
  await page.getByRole('button', { name: 'logo' }).click();
  await page.locator('#mm-header').getByText('Logout').click();
});