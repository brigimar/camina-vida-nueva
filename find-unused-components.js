// find-unused-components.js
const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = process.cwd();
const COMPONENTS_DIR = path.join(PROJECT_ROOT, 'src', 'components');
const SRC_DIR = path.join(PROJECT_ROOT, 'src');

function getAllFiles(dir, exts = ['.jsx']) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath, exts));
    } else if (exts.some(ext => file.endsWith(ext))) {
      results.push(filePath);
    }
  });
  return results;
}

function isFileImported(targetFile, allSourceFiles) {
  const targetBase = path.basename(targetFile, '.jsx');

  // Ignorar index.jsx
  if (targetBase === 'index') return true;

  for (const sourceFile of allSourceFiles) {
    if (sourceFile === targetFile) continue;
    try {
      const content = fs.readFileSync(sourceFile, 'utf8');
      const patterns = [
        `from '${targetBase}'`,
        `from "./${targetBase}`,
        `from "../${targetBase}`,
        `from "../../${targetBase}`,
        `from "../../../${targetBase}`,
        `from "@/components/${targetBase}`,
        `import ${targetBase} from`,
        `import {[^}]*${targetBase}[^}]*} from`,
        `require\\(['"](?:\\.\\./)*components/${targetBase}`
      ];

      for (const pattern of patterns) {
        const regex = new RegExp(pattern, 'g');
        if (regex.test(content)) {
          return true;
        }
      }
    } catch (e) {
      // Silenciar errores de lectura
    }
  }
  return false;
}

async function main() {
  console.log('🔍 Analizando componentes .jsx no utilizados...\n');

  const componentFiles = getAllFiles(COMPONENTS_DIR);
  const allSourceFiles = getAllFiles(SRC_DIR, ['.js', '.jsx']); // Escanea .js y .jsx como fuentes

  const unused = [];

  for (const file of componentFiles) {
    if (!isFileImported(file, allSourceFiles)) {
      const relPath = path.relative(PROJECT_ROOT, file).replace(/\\/g, '/');
      unused.push(relPath);
      console.log(`❌ No usado: ${relPath}`);
    }
  }

  if (unused.length === 0) {
    console.log('✅ Todos los componentes .jsx están en uso.');
  } else {
    console.log(`\n⚠️  Se encontraron ${unused.length} componentes .jsx no utilizados.`);
    console.log('\n💡 Verifica antes de eliminar:');
    console.log('   - ¿Se usan en páginas del App Router? (aunque no se importen directamente)');
    console.log('   - ¿Se usan con imports dinámicos o React.createElement()?');
  }
}

main().catch(console.error);