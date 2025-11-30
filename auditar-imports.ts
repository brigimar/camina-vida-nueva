// auditar-imports.js
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, 'src');
const EXTENSIONES_VALIDAS = ['.js', '.jsx', '.ts', '.tsx'];

const rutasRutas = [];

function esRutaValida(importPath, archivoBase) {
  if (!importPath.startsWith('.') && !importPath.startsWith('/')) return true; // ignorar módulos externos

  const baseDir = path.dirname(archivoBase);
  const rutaAbsoluta = path.resolve(baseDir, importPath);

  for (const ext of EXTENSIONES_VALIDAS) {
    if (fs.existsSync(rutaAbsoluta + ext)) return true;
  }

  if (fs.existsSync(rutaAbsoluta) && fs.statSync(rutaAbsoluta).isDirectory()) {
    for (const ext of EXTENSIONES_VALIDAS) {
      if (fs.existsSync(path.join(rutaAbsoluta, 'index' + ext))) return true;
    }
  }

  return false;
}

function analizarArchivo(rutaArchivo) {
  const contenido = fs.readFileSync(rutaArchivo, 'utf8');
  const regexImport = /import\s+.*?from\s+['"](.*?)['"]/g;
  let match;

  while ((match = regexImport.exec(contenido)) !== null) {
    const importPath = match[1];
    if (!esRutaValida(importPath, rutaArchivo)) {
      rutasRutas.push({
        archivo: rutaArchivo,
        importacion: importPath,
      });
    }
  }
}

function recorrerDirectorio(directorio) {
  const archivos = fs.readdirSync(directorio);
  for (const archivo of archivos) {
    const ruta = path.join(directorio, archivo);
    const stat = fs.statSync(ruta);
    if (stat.isDirectory()) {
      recorrerDirectorio(ruta);
    } else if (EXTENSIONES_VALIDAS.includes(path.extname(ruta))) {
      analizarArchivo(ruta);
    }
  }
}

recorrerDirectorio(ROOT_DIR);

if (rutasRutas.length === 0) {
  console.log('✅ No se encontraron rutas rotas en los imports.');
} else {
  console.log('❌ Se encontraron rutas rotas:\n');
  rutasRutas.forEach(({ archivo, importacion }) => {
    console.log(`- ${archivo} → import roto: '${importacion}'`);
  });
  process.exitCode = 1;
}
