export default [
  {
    input: "src/index.js",
    external: ["common-tags"],
    output: [
      {
        file: "lib/index.js",
        format: "cjs"
      },
      {
        file: "lib/es/index.js",
        format: "es"
      }
    ]
  }
];
