import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './Automation',
  timeout: 30_000,
  retries: 0,
  use: {
    headless: true,
    viewport: { width: 1920, height: 1080 },
  },
});
