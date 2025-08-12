/* Renders SVG icon to PNG for VS Code Marketplace compliance */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function main() {
  const inSvg = path.join(__dirname, "..", "images", "icon.svg");
  const outPng = path.join(__dirname, "..", "icon.png");

  if (!fs.existsSync(inSvg)) {
    console.error("Missing icon.svg in project root");
    process.exit(1);
  }

  // VS Code commonly shows 128x128; generate 256x256 for crisp scaling.
  const size = 256;

  await sharp(inSvg, { density: 384 }) // higher density for crisp vector rasterization
    .resize(size, size, { fit: "cover" })
    .png({ compressionLevel: 9 })
    .toFile(outPng);

  console.log(`Icon generated: ${path.relative(process.cwd(), outPng)} (${size}x${size})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});