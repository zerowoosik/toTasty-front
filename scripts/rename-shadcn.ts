import path from 'path';
import { fileURLToPath } from 'url';
import { readdirSync, readFileSync, renameSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uiDir = path.resolve(__dirname, '../src/shared/ui');

const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const kebabToPascal = (str: string): string => {
  return str.split('-').map(capitalizeFirst).join('');
};

readdirSync(uiDir).forEach((file) => {
  const ext = path.extname(file);
  const baseName = path.basename(file, ext);

  let newFileName =
    baseName.includes('-') || /^[a-z]/.test(baseName) ? kebabToPascal(baseName) : baseName;

  if (newFileName !== baseName) {
    const oldPath = path.join(uiDir, file);
    const newPath = path.join(uiDir, `${newFileName}${ext}`);
    const tempPath = path.join(uiDir, `${newFileName}__temp${ext}`);

    try {
      renameSync(oldPath, tempPath);
      renameSync(tempPath, newPath);
      console.log(`✅ Renamed: ${newPath.split('/').pop()}`);
      let content = readFileSync(newPath, 'utf-8');
      let removed = false, updated = false;

      const reactImportRegex = /^\s*import\s+\*\s+as\s+React\s+from\s+['"]react['"]\s*\n?/gm;
      const reactImport = `import * as React from "react"`;
      if (content.includes(reactImport)) {
        content = content.replace(reactImportRegex, '');
        removed = true;
        console.log(`🗑️  Remove 'import react': ${newFileName}${ext}`);
      }

      const importRegex = /(['"])@\/shared\/ui\/([\w-]+)\1/g;
      content = content.replace(importRegex, (_, quote, name) => {
        const pascal = kebabToPascal(name);
        updated = true;
        console.log(`🔧 Updated content: ${newFileName}${ext}`);
        return `${quote}@/shared/ui/${pascal}${quote}`;
      });

      if (removed || updated) {
        writeFileSync(newPath, content.trimStart(), 'utf-8');
      }
    } catch (error) {
      console.error(`❌ Error during renaming:`, error);
    }
  }
});
