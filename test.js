const fs = require("fs");

const l = fs.readFileSync("./dist/index.js").byteLength;

if (l > 13_000) {
  console.error("FATAL: Bundle exceeds 13kb!");
  process.exit(1);
} else {
  console.log(`OK: Bundle size ${l} bytes`);
}
