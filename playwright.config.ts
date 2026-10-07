import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://localhost:4400', channel: process.env.PW_CHANNEL ?? 'chrome' },
  webServer: {
    command: 'npm run build && npx astro preview --port 4400 --force',
    url: 'http://localhost:4400',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
