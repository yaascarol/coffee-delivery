import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./e2e",
  timeout: 120000,
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: "http://127.0.0.1:5178",
    channel: process.env.CI ? undefined : "msedge",
    headless: true,
    viewport: { width: 1440, height: 1000 },
    colorScheme: "light",
  },
  webServer: {
    command: "npm run dev -- --port 5178 --strictPort",
    url: "http://127.0.0.1:5178",
    reuseExistingServer: !process.env.CI,
  },
  reporter: [["list"], ["json", { outputFile: "test-results/results.json" }]],
});
