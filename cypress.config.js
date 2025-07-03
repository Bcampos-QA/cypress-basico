const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {
    supportFile: false,
    specPattern: 'cypress/integration/CAC-TAT.spec*.js', // aqui você diz onde os testes estão
  },
});
