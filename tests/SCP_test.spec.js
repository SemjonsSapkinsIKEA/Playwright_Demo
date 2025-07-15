import {test, expect} from '@playwright/test';

test.only("Navigation into SCP", async ({ page }) => {
    await page.goto('https://testppe10.plusnavigate.ikeadt.com/Thingworx/Runtime/index.html?mashup=Purchasing.View.V1');
  await page.locator('#username').click();
  await page.locator('#username').fill('plustest41');
  await page.locator('#username').click();
  await page.locator('#password').click();
  await page.locator('#password').fill('plus21Q4');
  await page.getByTitle('Sign On').click();
  await page.locator('#root_mashupcontainer-3_ptcsdropdown-95 iron-icon').click();
  await page.getByRole('option', { name: 'IR' }).locator('ptcs-div').click();
  await page.getByText('IR0006378443').click();
  await page.locator('a').filter({ hasText: 'EKBACKEN cm-wt 45.1-63.5x2.8' }).click();
}
);