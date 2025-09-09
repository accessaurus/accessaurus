import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: './tests',
  retries: 0,
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:3000',
  },
  webServer: {
    command: 'bun run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120_000,
    cwd: 'apps/app',
  },
}

export default config
