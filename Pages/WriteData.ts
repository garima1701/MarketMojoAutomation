import * as XLSX from 'xlsx';
export class WriteData{

    async writeDataToExcel(workbook_name: string, sheet_name: string, tableData: Map<string,string[]>){
        const workbook = XLSX.utils.book_new();
        let tableJson = tableData.to_json()
        const worksheet = XLSX.utils.json_to_sheet(tableJson)

    }

}