import { test, expect } from '@playwright/test';

test.describe('Smoke Test', () => {
    test('App loads without errors', async ({ page }) => {
        await page.goto('http://localhost:5500/main.html');
        await expect(page.locator('#introBox')).toBeVisible(); // Check if intro box is visible
        await expect(page.locator('#startBtn')).toBeVisible(); // Check if start button is visible within said intro box
    });
});