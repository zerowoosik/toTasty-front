/* eslint-disable no-console */
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const SHARED_UI_DIR = path.resolve(dirname, '../src/shared/ui');

interface FilePaths {
  oldPath: string;
  tempPath: string;
  newPath: string;
}

const capitalizeFirst = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);
const kebabToPascal = (str: string): string => str.split('-').map(capitalizeFirst).join('');

const getPaths = (baseName: string, ext: string, pascalName: string): FilePaths => ({
  oldPath: path.join(SHARED_UI_DIR, `${baseName}${ext}`),
  tempPath: path.join(SHARED_UI_DIR, `${pascalName}__temp${ext}`),
  newPath: path.join(SHARED_UI_DIR, `${pascalName}${ext}`),
});

const renameFile = (baseName: string, ext: string, pascalName: string): string | null => {
  const { oldPath, tempPath, newPath } = getPaths(baseName, ext, pascalName);

  try {
    fs.renameSync(oldPath, tempPath);
    fs.renameSync(tempPath, newPath);
    console.log(`✅ Renamed: ${baseName}${ext} → ${pascalName}${ext}`);
    return newPath;
  } catch (error) {
    console.error(`❌ Rename failed for ${baseName}${ext}:`, error);
    return null;
  }
};

const addNewLine = (code: string): string => {
  return code.replace(/^(\s*['"]use client['"])(;?)(\s*)$/m, (_match, p1) => `${p1};\n`);
};

const removeReactImport = (code: string): [string, boolean] => {
  const reactImportRegex = /^\s*import\s+\*\s+as\s+React\s+from\s+['"]react['"]\s*\n?/gm;
  const hasReactImport = reactImportRegex.test(code);
  let updateCode = code;
  if (hasReactImport) {
    updateCode = updateCode.replace(reactImportRegex, '');
  }
  return [updateCode, hasReactImport];
};

const updateImportPaths = (code: string): [string, boolean] => {
  const importRegex = /(['"])@\/shared\/ui\/([\w-]+)\1/g;
  let updated = false;
  const replaced = code.replace(importRegex, (_, quote, name) => {
    updated = true;
    return `${quote}@/shared/ui/${kebabToPascal(name)}${quote}`;
  });
  return [replaced, updated];
};

const updateFileContent = (filePath: string, fileName: string): void => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const [withoutReactImport, removed] = removeReactImport(content);
  const [updatedContent, updated] = updateImportPaths(withoutReactImport);
  const finalContent = addNewLine(updatedContent);

  if (removed) console.log(`🗑️  Removed React import: ${fileName}`);
  if (updated) console.log(`🔧 Updated imports in: ${fileName}`);
  if (updated || removed || finalContent !== content) {
    fs.writeFileSync(filePath, finalContent.trimStart(), 'utf-8');
  }
};

fs.readdirSync(SHARED_UI_DIR).forEach((file: string): void => {
  const ext = path.extname(file);
  const baseName = path.basename(file, ext);

  if (baseName.includes('-') || /^[a-z]/.test(baseName)) {
    const pascalName = kebabToPascal(baseName);
    const renamedFilePath = renameFile(baseName, ext, pascalName);

    if (renamedFilePath) {
      updateFileContent(renamedFilePath, `${pascalName}${ext}`);
    }
  }
});
