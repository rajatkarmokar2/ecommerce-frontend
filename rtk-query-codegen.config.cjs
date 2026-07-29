/** @type {import('@rtk-query/codegen-openapi').ConfigFile} */
const env = require("src/constants/env");
const config = {
  schemaFile: env.apiUrl + "/swagger.json",
  apiFile: "./src/store/api/baseApi.ts",
  apiImport: "baseApi",
  outputFile: "./src/store/api/generatedApi.ts",
  exportName: "generatedApi",
  hooks: true,
};

module.exports = config;
