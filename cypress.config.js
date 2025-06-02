const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // configure event listeners aqui, se precisar
    },
    specPattern: 'cypress/integration/**/*.spec.js',
    baseUrl: './src/index.html', // ou a URL da sua aplicação
    supportFile: false, // <---- desativa o support file
  }
})
