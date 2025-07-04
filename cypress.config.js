const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {
    specPattern: 'integration/CAC-TAT.spec.js',
    supportFile: 'support/e2e.js',
    // Você pode adicionar mais opções aqui se quiser
  },
})
