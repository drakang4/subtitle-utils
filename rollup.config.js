export default [
  {
    input: "src/index.js",
    external: ["common-tags"],
    output: [
      {
        file: "dist/bundle.cjs.js",
        format: "cjs"
      },
      {
        file: "dist/bundle.es6.js",
        format: "es"
      }
    ]
  }
];
