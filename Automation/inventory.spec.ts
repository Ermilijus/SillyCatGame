import { test, expect } from '@playwright/test';

test.describe('Inventory Functionality', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5500/main.html?testMode=1'); // Test mode enabled
        await expect(page.locator('#introBox')).not.toBeVisible(); // confirm testmode skips intro
    });

    test.describe ('obtaining an item(s) through different means', () => {

        test('Item appears in inventory after purchase', async ({ page }) => {
            await page.click('#shopBtn'); // Open shop
            await page.click('.shop-slot[title^="Bread"]'); // Purchase item with the title "Bread"
            await page.click('#closeShopBtn'); // Close shop
            await page.click('#invBtn'); // Open inventory
            await expect(page.locator('.inv-slot.filled[data-item-id="1"]')).toBeVisible(); // Check if item appears in inventory
        });

        test('Item appears in inventory after play activity', async ({ page }) => {
            await page.evaluate(() => window.testHelpers.startQuest("Beach2")); // Start quest that rewards item ID 307
            await page.click('.story-dialogue-window'); // Continue through story
            await expect(page.locator('#storyOptions')).toBeVisible();
            await page.waitForSelector('.story-option-btn:has-text("Yes")', { state: 'visible' });
            await page.click('.story-option-btn:has-text("Yes")');
            await page.click('#invBtn'); // Open inventory
            await expect(page.locator('.inv-slot[data-item-id="307"]')).toBeVisible(); // Check if item appears in inventory
        });
    });

test.describe ('Item usage', () => {
        test(`Using item from inventory applies its effect`, async ({ page }) => {
            await page.evaluate(() => window.testHelpers.giveItem(400, 3)); // Give 3 energy drinks (item ID 400)
            await page.click('#invBtn'); // Open inventory
            await page.click('.inv-slot.filled[data-item-id="400"]'); // Click on energy drink
            await expect(page.locator('#energy-value')).toHaveText('75'); // Check if energy is restored to 100
        });

        
    });
    
});