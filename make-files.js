// node make-files.js <folder>
//   Writes <folder>/files.json listing the model files (.obj, .mtl, textures),
//   so the folder opens from a link: index.html?model=<folder> (needs http, e.g. GitHub Pages).
const fs = require('fs');
const path = require('path');

const EXT = ['obj', 'mtl', 'png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp', 'tga', 'dds', 'tif', 'tiff'];
const target = process.argv[2];
if (!target){ console.error('Usage: node make-files.js <folder>'); process.exit(1); }
const dir = path.resolve(__dirname, target);
const names = fs.readdirSync(dir)
  .filter(n => EXT.includes(path.extname(n).slice(1).toLowerCase()) && fs.statSync(path.join(dir, n)).isFile())
  .sort();
if (!names.some(n => n.toLowerCase().endsWith('.obj'))){ console.error(`No .obj file in ${dir}`); process.exit(1); }
fs.writeFileSync(path.join(dir, 'files.json'), JSON.stringify(names, null, 2) + '\n');
console.log(`${target}/files.json written: ${names.join(', ')}`);
console.log(`Link: index.html?model=${target.replace(/\\/g, '/')}`);
