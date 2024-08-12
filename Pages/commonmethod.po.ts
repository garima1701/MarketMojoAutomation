import { Page } from "playwright/test";
import * as XLSX from "xlsx";
import * as path from "path";


export class CommonMethods{
    page: Page;
    constructor(page:Page){
        this.page = page;
    }
    async tableToMap(tableSelector: string): Promise<Map<string, string[]>>{        
        const tabelData = new Map<string, string[]>();
        const rows = await this.page.$$(tableSelector +'//tr');         
        for (const row of rows){
            const cells = await row.$$(`xpath=td|th`);            
            if(cells.length > 0){
            const key = await cells[0].textContent()||'';
            const values: string[] =[];
            for(let i =1; i<cells.length;i++){
                const value = await cells[i].textContent();                
                values.push((value||'').trim());
            }
            tabelData.set(key.trim(), values);
            }            
        }
        return tabelData;  
    }
    async tabletoExcel(tableSelector: string, sheetName: string, workbookName:string){
        let tabelDataMap;
        if(tableSelector==='.mm_css_table'){
            tabelDataMap =this.divToMap(tableSelector);
        }else{
            tabelDataMap = this.tableToMap(tableSelector);
        }
        const workbookpath = path.join(__dirname,'outputfiles', workbookName);
        let workbook: XLSX.WorkBook;
        try{
            workbook = XLSX.readFile(workbookpath);
        }catch (error){
            workbook = XLSX.utils.book_new();
        }        
        const worksheet:XLSX.WorkSheet={};
        let rowIndex = 1;
        (await tabelDataMap).forEach((values, key)=>{
            worksheet[`A${rowIndex}`]={v:key};
            values.forEach((value, colIndex)=>{
                const cellAddress = XLSX.utils.encode_cell({c:colIndex+1, r:rowIndex-1});
                worksheet[cellAddress]={v:value};
            });
            rowIndex++;
        });
        worksheet['!ref']= XLSX.utils.encode_range({
            s:{c: 0, r: 0},
            e:{c: (await tabelDataMap).size, r: rowIndex-1}
        });
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        const outputFilePath = path.join(__dirname, 'outputfiles', workbookName)
        XLSX.writeFile(workbook, outputFilePath);
    }
    async divToMap(tableClass:string){
        const table= await this.page.$(tableClass);
        if(!table){
            console.error('Div Table Not found on Page');
            return;
        }
        const rows = await table.$$('.mm_css_tr');
        const tableData = new Map<string, string[]>();
        for(const row of rows){
            const firstCell = await row.$('.mm_css_sd');
            if(firstCell){
                const key = (await firstCell.textContent())?.trim()||'';
                const remainingCells = await row.$$('.mm_css_th, .mm_css_td');
                const values: string[] = [];
                for(const cell of remainingCells){
                    const cellText = await cell.textContent();
                    values.push(cellText? cellText.trim(): '');
                }
                tableData.set(key, values);
            }
        }
        return tableData;
    }

}