import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const MODULE_ORDER = [
  'src/data.js',
  'src/state.js',
  'src/audio.js',
  'src/particles.js',
  'src/app.js'
];

function stripImportsAndExports(code) {
  return code
    // Remove multi-line and single-line import statements
    .replace(/^\s*import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '')
    // Replace `export const/function/class` with `const/function/class`
    .replace(/^\s*export\s+(async\s+function|function|class|const|let|var)\s+/gm, '$1 ');
}

const chunks = MODULE_ORDER.map((relPath) => {
  const fullPath = path.resolve(ROOT, relPath);
  const raw = fs.readFileSync(fullPath, 'utf8');
  return `// --- ${relPath} ---\n` + stripImportsAndExports(raw);
});

const bundleContent = `/**
 * Auto-generated browser bundle for 20/10 Experience (Diểm Phúc).
 * Compatible with both file:// (direct Finder double-click) and http(s):// servers.
 */
(function () {
  'use strict';
${chunks.join('\n\n')}
})();
`;

const distDir = path.resolve(ROOT, 'dist');
fs.mkdirSync(distDir, { recursive: true });
const outFile = path.resolve(distDir, 'bundle.js');
fs.writeFileSync(outFile, bundleContent, 'utf8');
console.log(`Built ${outFile} (${Buffer.byteLength(bundleContent)} bytes)`);
