import { test, expect } from "@playwright/test";

test.describe("Stats Increase/Decrease", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5500/main.html?testMode=1"); //Test mode enabled
    await expect(page.locator(`#introBox`)).not.toBeVisible(); // confirm testmode skips intro
  });

  test.describe(`Fullness Incrementation`, () => {
    test("Fullness increases", async ({ page }) => {
      await expect(page.locator(`#fullness-value`)).toHaveText("50");
      await page.click(`#feed-btn`);
      await expect(page.locator(`#fullness-value`)).toHaveText("60");
    });

    test(`Fullness Decreases`, async ({ page }) => {
      await expect(page.locator(`#fullness-value`)).toHaveText("50");
      await page.click(`#rest-btn`);
      await expect(page.locator(`#fullness-value`)).toHaveText("44");
    });
  });

  test.describe(`Energy Incrementation`, () => {
    test("Energy increases", async ({ page }) => {
      await expect(page.locator(`#energy-value`)).toHaveText("50");
      await page.click(`#rest-btn`);
      await expect(page.locator(`#energy-value`)).toHaveText("70");
    });

    test(`Energy Decreases`, async ({ page }) => {
      await expect(page.locator(`#energy-value`)).toHaveText("50");
      await page.click(`#feed-btn`);
      await expect(page.locator(`#energy-value`)).toHaveText("42");
    });
  });

  test.describe(`Joy Incrementation`, () => {
    test("Joy increases", async ({ page }) => {
      await expect(page.locator(`#joy-value`)).toHaveText("0");
      await page.click(`#feed-btn`);
      await expect(page.locator(`#joy-value`)).toHaveText("1");
    });
  });

  test.describe(`Love incrementation`, () => {
    test("Love increases", async ({ page }) => {
      await expect(page.locator(`#love-value`)).toContainText("0");
      await page.evaluate(() => window.testHelpers.giveItem(401, 1)); // Give Star powerup
      await page.click(`#invBtn`);
      await page.click('.inv-slot[data-item-id="401"]') // Use Star powerup
      await expect(page.locator(`#love-value`)).toContainText("50");
    });
  });

});

test.describe("Stats Boundaries", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5500/main.html?testMode=1"); //Test mode enabled
    await expect(page.locator(`#introBox`)).not.toBeVisible(); // confirm testmode skips intro
  });

  test.describe("Fullness Boundaries", () => {
    test("Fullness does not exceed 100", async ({ page }) => {
      for (let i = 0; i < 8; i++) {
        await page.click(`#feed-btn`);
      }
      await expect(page.locator(`#fullness-value`)).toHaveText("100");
    });
    
    test("Fullness does not go below 0", async ({ page }) => {
      for (let i = 0; i < 12; i++) {
        await page.click(`#rest-btn`);
      }
      await expect(page.locator(`#fullness-value`)).toHaveText("0");
    });
  });

  test.describe("Energy Boundaries", () => {
    test("Energy does not exceed 100", async ({ page }) => {
      for (let i = 0; i < 5; i++) {
        await page.click(`#rest-btn`);
      }
      await expect(page.locator(`#energy-value`)).toHaveText("100");
    });
    
    test("Energy does not go below 0", async ({ page }) => {
      for (let i = 0; i < 10; i++) {
        await page.click(`#feed-btn`);
      }
      await expect(page.locator(`#energy-value`)).toHaveText("0");
    });
  });
});
