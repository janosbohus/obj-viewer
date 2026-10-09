// Packs the default model: writes the .obj, .mtl and image files in this folder into default-model.js,
// so obj-nezo.html can load them without a server (file://).
// Run: node make-default.js
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const TEXT = ['obj', 'mtl'];
const IMG = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp', 'tga', 'dds', 'tif', 'tiff'];
const files = {};
for (const name of fs.readdirSync(dir).sort()){
  const ext = path.extname(name).slice(1).toLowerCase();
  if (TEXT.includes(ext)) files[name] = { text: fs.readFileSync(path.join(dir, name), 'utf8') };
  else if (IMG.includes(ext)) files[name] = { b64: fs.readFileSync(path.join(dir, name)).toString('base64') };
}
fs.writeFileSync(path.join(dir, 'default-model.js'), 'window.DEFAULT_MODEL=' + JSON.stringify(files) + ';\n');
console.log('default-model.js written:', Object.keys(files).join(', '));
