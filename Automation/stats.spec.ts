import { test, expect } from '@playwright/test';

test.describe(`Fullness Incrementation`, () => {
    test('Fullness increases', async ({ page }) => {
        await page.goto('http://localhost:5500/main.html?testMode=1'); //Test mode enabled
        await expect(page.locator(`#introBox`)).not.toBeVisible(); // confirm testmode skips intro
        await expect(page.locator(`#fullness-value`)).toHaveText('50');
        await page.click(`#feed-btn`);
        await expect(page.locator(`#fullness-value`)).toHaveText('60');
    });

    test(`Fullness Decreases`, async ({ page }) => {
        await page.goto('http://localhost:5500/main.html?testMode=1'); //Test mode enabled
        await expect(page.locator(`#introBox`)).not.toBeVisible(); // confirm testmode skips intro
        await expect(page.locator(`#fullness-value`)).toHaveText('50');
        await page.click(`#rest-btn`);
        await expect(page.locator(`#fullness-value`)).toHaveText('44');
    });
});

test.describe(`Energy Incrementation`, () => {
    test('Energy increases', async ({ page }) => {
        await page.goto('http://localhost:5500/main.html?testMode=1'); //Test mode enabled
        await expect(page.locator(`#introBox`)).not.toBeVisible(); // confirm testmode skips intro
        await expect(page.locator(`#energy-value`)).toHaveText('50');
        await page.click(`#rest-btn`);
        await expect(page.locator(`#energy-value`)).toHaveText('70');
    });

    test(`Energy Decreases`, async ({ page }) => {
        await page.goto('http://localhost:5500/main.html?testMode=1'); //Test mode enabled
        await expect(page.locator(`#introBox`)).not.toBeVisible(); // confirm testmode skips intro
        await expect(page.locator(`#energy-value`)).toHaveText('50');
        await page.click(`#feed-btn`);
        await expect(page.locator(`#energy-value`)).toHaveText('42');
    });
});

test.describe(`Joy Incrementation`, () => {
    test('Joy increases', async ({ page }) => {
        await page.goto('http://localhost:5500/main.html?testMode=1'); //Test mode enabled
        await expect(page.locator(`#introBox`)).not.toBeVisible(); // confirm testmode skips intro
        await expect(page.locator(`#joy-value`)).toHaveText('0');
        await page.click(`#feed-btn`);
        await expect(page.locator(`#joy-value`)).toHaveText('1');
    });
});


