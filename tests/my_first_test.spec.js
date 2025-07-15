import { test, expect } from '@playwright/test';
//import {shoppingCartLocators} from '../ikeaResources/shoppingCartLocators.js';
//import {webpageNavigators} from '/ikeaResources/webpageNavigators.js';

test.beforeEach(async ({ page }) => {
  await page.goto('https://ikea.se');
});

//Test Navigator 
test ('testing ikeas website title ', async ({page}) => {
    await expect(page).toHaveTitle(/IKEA/);
    
})
