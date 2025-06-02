const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // configure event listeners aqui, se precisar
    },
    specPattern: 'cypress/integration/**/*.spec.js',
    baseUrl: 'http://localhost:8080' // ou a URL da sua aplicação
  }
})
