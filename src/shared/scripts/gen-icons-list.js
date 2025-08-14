import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.resolve(__dirname, '../../assets/icons');
const outDir = path.resolve(__dirname, '../constants');
const outFile = path.join(outDir, 'icons.js');

if (!fs.existsSync(iconsDir)) {
  console.error(`❌ icons directory not found: ${iconsDir}`);
  process.exit(1);
}
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const files = fs
  .readdirSync(iconsDir)
  .filter((f) => f.toLowerCase().endsWith('.svg'))
  .map((f) => path.basename(f, '.svg'))
  .sort();

const content = `export const ICONS = ${JSON.stringify(files, null, 2)};\n`;

fs.writeFileSync(outFile, content, 'utf8');
console.log(`🎨 Generated ${outFile} with ${files.length} icons`);
