/** @type {import('@rtk-query/codegen-openapi').ConfigFile} */
const config = {
  schemaFile: "http://localhost:4000" + "/swagger.json",
  apiFile: "./src/store/api/baseApi.ts",
  apiImport: "baseApi",
  outputFile: "./src/store/api/generatedApi.ts",
  exportName: "generatedApi",
  hooks: true,
};

module.exports = config;
