import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync, readdirSync, renameSync } from 'fs';

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

  let newFileName = baseName.includes('-')
    ? kebabToPascal(baseName)
    : /^[a-z]/.test(baseName)
      ? capitalizeFirst(baseName)
      : baseName;

  if (newFileName !== baseName) {
    const oldPath = path.join(uiDir, file);
    const newPath = path.join(uiDir, `${newFileName}${ext}`);
    const tempPath = path.join(uiDir, `${newFileName}__temp${ext}`);

    try {
      console.log(`✅ Renaming (step 1): ${oldPath} → ${tempPath}`);
      renameSync(oldPath, tempPath);

      console.log(`✅ Renaming (step 2): ${tempPath} → ${newPath}`);
      renameSync(tempPath, newPath);
    } catch (error) {
      console.error(`❌ Error during renaming:`, error);
    }
  }
});
