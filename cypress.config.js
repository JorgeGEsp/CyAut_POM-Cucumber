const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { defineConfig } = require('cypress');
const cypressOnFix = require('cypress-on-fix');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents: async (on, config) => {
      // "cypress-on-fix" is required because "cypress-mochawesome-reporter" and "cypress-cucumber-preprocessor" use the same hooks
      on = cypressOnFix(on);
      
      // Mochawesome reporter plugin
      require('cypress-mochawesome-reporter/plugin')(on);
      
      // Cucumber plugin
      await addCucumberPreprocessorPlugin(on, config);
      
      // Esbuild preprocessor plugin
      on(
        'file:preprocessor',
        createBundler({ plugins: [createEsbuildPlugin(config)] })
      );

      return config;
    },
    failOnStatusCode: false,
    chromeWebSecurity: false,
    specPattern: ['**/*.feature', '**/basic-tests/*.js'],
    defaultCommandTimeout: 10000,
    env: {
      snapshotOnly: true,
      requestMode: true,
    },
  },
});
