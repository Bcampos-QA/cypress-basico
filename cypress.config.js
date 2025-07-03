const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {},
})
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    supportFile: false,
  },
});
