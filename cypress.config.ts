import { defineConfig } from "cypress";
import vitePreprocessor from 'cypress-vite'

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on('file:preprocessor', vitePreprocessor())
    },
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    defaultCommandTimeout: 10000,
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
});
