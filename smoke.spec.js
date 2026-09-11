// Optional browser checks; run against the development server when browser QA is requested.
import {test,expect} from '@playwright/test';
test('configured specification and bifold upgrade',async({page})=>{
await page.goto('http://127.0.0.1:5173/');
await expect(page.locator('canvas')).toBeVisible();
await expect(page.getByText('£37,960',{exact:true})).toBeVisible();
await page.getByRole('button',{name:'Doors & windows',exact:true}).click();
await page.getByLabel('Opening type').selectOption('bifold');
await expect(page.getByText('£39,960',{exact:true})).toBeVisible();
await page.getByLabel('Wall',{exact:true}).selectOption('back');
await page.getByLabel('Offset from left edge of wall').fill('1');
await page.getByLabel('Remove roof',{exact:true}).click();
await page.getByRole('button',{name:'Construction',exact:true}).click();
await expect(page.getByLabel('Construction view')).toHaveValue('removed');
await page.getByLabel('Construction view').selectOption('exploded');
await page.getByRole('button',{name:'Size & position',exact:true}).click();
await page.getByLabel('Overall height including roof').fill('3');
await expect(page.getByLabel('Overall height including roof')).toHaveValue('2.5');
});
