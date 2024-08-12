import { test, expect, Page } from '@playwright/test';
import { CommonMethods } from '../Pages/commonmethod.po';
import * as XLSX from "xlsx";
import * as path from "path";


test.describe('MozoStocks Data',()=>{
  let page: Page;
  let commonMethods: CommonMethods;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    commonMethods = new CommonMethods(page);
    await page.goto('https://www.marketsmojo.com/mojofeed/login');
    if(await page.locator('path').isVisible()){
      await page.locator('path').click();
    }  
    await page.locator('#mm-header div').filter({ hasText: /^Login$/ }).locator('a').click();
    await page.getByPlaceholder('Email Address').click();
    await page.getByPlaceholder('Email Address').fill('dsatyam1@gmail.com');
    await page.getByPlaceholder('Enter Password').click();
    await page.getByPlaceholder('Enter Password').fill('Mojo@123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForTimeout(2000);    
  });

  test.afterAll(async () => {  
    await page.getByRole('button', { name: 'logo' }).click();
    await page.locator('#mm-header').getByText('Logout').click();
    await page.close();
  });

  test('login logout test', async () => {    
    await page.locator('#mm-header > div > nav.links > ul > li.current.top-level-link > a').isVisible();
    await page.locator('//span[normalize-space()="Stocks"]').hover();
    await page.locator('//span[normalize-space()="Stocks"]').click()
    await page.waitForTimeout(500);
    await page.locator('//div[normalize-space()="Top Mojo Stocks"]').hover();
    await page.locator('//div[normalize-space()="Top Mojo Stocks"]').click();
    await page.waitForTimeout(2000);
    if(await page.locator('path').isVisible()){
      await page.locator('path').click();
    }
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
    const workbookpath = path.join(__dirname,'outputfiles', 'dataFromMap.xlsx');
        let workbook: XLSX.WorkBook;
        try{
            workbook = XLSX.readFile(workbookpath);
        }catch (error){
            workbook = XLSX.utils.book_new();
        }        
        const worksheet:XLSX.WorkSheet={};
        let rowIndex = 1;
        tabelData.forEach((values, key)=>{
            worksheet[`A${rowIndex}`]={v:key};
            values.forEach((value, colIndex)=>{
                const cellAddress = XLSX.utils.encode_cell({c:colIndex+1, r:rowIndex-1});
                worksheet[cellAddress]={v:value};
            });
            rowIndex++;
        });
        worksheet['!ref']= XLSX.utils.encode_range({
            s:{c: 0, r: 0},
            e:{c: tabelData.size, r: rowIndex-1}
        });
        XLSX.utils.book_append_sheet(workbook, worksheet, 'TopStockCurrentList');
        const outputFilePath = path.join(__dirname, '../Pages/outputfiles', 'dataFromMap.xlsx')
        XLSX.writeFile(workbook, outputFilePath);
        await page.waitForTimeout(3000);
  });  
  test('Extract Data of Hidden Turnarround Full List',async()=>{    
    await page.locator('#mm-header > div > nav.links > ul > li.current.top-level-link > a').isVisible();
    await page.locator('//span[normalize-space()="Stocks"]').hover();
    await page.locator('//span[normalize-space()="Stocks"]').click()
    await page.waitForTimeout(500);
    await page.locator('//*[@id="mm-header"]/div/nav[1]/ul/li[1]/div/div[1]/div[1]/div[2]/a/div[1]').hover();
    await page.locator('//*[@id="mm-header"]/div/nav[1]/ul/li[1]/div/div[1]/div[1]/div[2]/a/div[1]').click();
    await page.waitForTimeout(2000);
    if(await page.locator('path').isVisible()){
      await page.locator('path').click();
    }
    await page.waitForTimeout(2000);    
    await page.locator('//*[@id="mm-apage-section"]/div/app-strategy/section[2]/div/div[1]/div/div[2]/div[1]/div/button[6]').click();
    await page.waitForTimeout(2000);     
    const tableSelector = '.mm_css_table';
    await commonMethods.tabletoExcel(tableSelector, 'HiddenTurnArroundFullList','dataFromMap.xlsx');
    await page.waitForTimeout(2000);    
  });
  test('Extract Data of Momentum Now Full List',async()=>{    
    await page.locator('#mm-header > div > nav.links > ul > li.current.top-level-link > a').isVisible();
    await page.locator('//span[normalize-space()="Stocks"]').hover();
    await page.locator('//span[normalize-space()="Stocks"]').click()
    await page.waitForTimeout(500);
    await page.locator('//*[@id="mm-header"]/div/nav[1]/ul/li[1]/div/div[1]/div[1]/div[4]/a').hover();
    await page.locator('//*[@id="mm-header"]/div/nav[1]/ul/li[1]/div/div[1]/div[1]/div[4]/a').click();
    await page.waitForTimeout(2000);
    if(await page.locator('path').isVisible()){
      await page.locator('path').click();
    }
    await page.waitForTimeout(2000);    
    await page.locator('//*[@id="mm-apage-section"]/div/app-strategy/section[2]/div/div[1]/div/div[2]/div[1]/div/button[6]').click();
    await page.waitForTimeout(2000); 
    const tableSelector = '.mm_css_table';
    await commonMethods.tabletoExcel(tableSelector, 'MomentumNowFullList','dataFromMap.xlsx');
    await page.waitForTimeout(2000);    
  });
  test('Extract Data of Reliable Performers Full List',async()=>{    
    await page.locator('#mm-header > div > nav.links > ul > li.current.top-level-link > a').isVisible();
    await page.locator('//span[normalize-space()="Stocks"]').hover();
    await page.locator('//span[normalize-space()="Stocks"]').click()
    await page.waitForTimeout(500);
    await page.locator('//*[@id="mm-header"]/div/nav[1]/ul/li[1]/div/div[1]/div[1]/div[3]/a').hover();
    await page.locator('//*[@id="mm-header"]/div/nav[1]/ul/li[1]/div/div[1]/div[1]/div[3]/a').click();
    await page.waitForTimeout(2000);
    if(await page.locator('path').isVisible()){
      await page.locator('path').click();
    }
    await page.waitForTimeout(2000);    
    await page.locator('//*[@id="mm-apage-section"]/div/app-strategy/section[2]/div/div[1]/div/div[2]/div[1]/div/button[6]').click();
    await page.waitForTimeout(2000); 
    const tableSelector = '.mm_css_table';
    await commonMethods.tabletoExcel(tableSelector, 'PerformersFullList','dataFromMap.xlsx');
    await page.waitForTimeout(2000);    
  });
  test('Extract Data of TOP MOjo Stocks Full List',async()=>{    
    await page.locator('#mm-header > div > nav.links > ul > li.current.top-level-link > a').isVisible();
    await page.locator('//span[normalize-space()="Stocks"]').hover();
    await page.locator('//span[normalize-space()="Stocks"]').click()
    await page.waitForTimeout(500);
    await page.locator('//*[@id="mm-header"]/div/nav[1]/ul/li[1]/div/div[1]/div[1]/div[1]/a').hover();
    await page.locator('//*[@id="mm-header"]/div/nav[1]/ul/li[1]/div/div[1]/div[1]/div[1]/a').click();
    await page.waitForTimeout(2000);
    if(await page.locator('path').isVisible()){
      await page.locator('path').click();
    } 
    await page.waitForTimeout(2000);
    await page.locator('//*[@id="middmenu"]/div/ul/li[7]/a').click();
    await page.waitForTimeout(2000);      
    const tableSelector = '//*[@id="navhistory"]/div/div[2]/div/div/table';
    await commonMethods.tabletoExcel(tableSelector, 'TopStockFullList','dataFromMap.xlsx');
    await page.waitForTimeout(2000);    
  });
});
