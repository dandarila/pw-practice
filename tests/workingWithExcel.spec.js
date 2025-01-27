const ExcelJs = require('exceljs');
import {test} from '@playwright/test';

async function excelTest() {
    let cellPosition = { row: 0, column: 0}
	const workbook = new ExcelJs.Workbook();
	await workbook.xlsx.readFile('C:/Users/40740/Desktop/excelDownload.xlsx')
    const worksheet = workbook.getWorksheet('Sheet1');
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === 'Banana') {
                console.log(`Row number : ${rowNumber}`);
                cellPosition.row = rowNumber;
                console.log(`Col number : ${colNumber}`);
                cellPosition.column = colNumber;
            }
        });
    });
    const cell = worksheet.getCell(cellPosition.row, cellPosition.column);
    cell.value = 'Republic';
    await workbook.xlsx.writeFile('C:/Users/40740/Desktop/excelDownload.xlsx');
}

// excelTest();

test('upload download excel validation', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');

    const downloadPromise = page.waitForEvent('download');
    await page.locator('#downloadButton').click();
    const download = await downloadPromise;
    await download.saveAs('C:/Users/40740/Desktop' + download.suggestedFilename());
    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles('C:/Users/40740/Desktop/Desktopdownload.xlsx');

});
