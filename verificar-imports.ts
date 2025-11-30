import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseDir = path.join(__dirname, 'src', 'components');

function extraerImports(contenido) {
  const regex = /from ['"]@\/components\/([^'"]+)['"]/g;
  const rutas = [];
  let match;
  while ((match = regex.exec(contenido)) !== null) {
    rutas.push(match[1]);
  }
  return rutas;
}

function verificarRuta(rutaRelativa) {
  const extensiones = ['.jsx', '.tsx', '.js', '.ts'];
  for (const ext of extensiones) {
    const rutaCompleta = path.join(baseDir, `${rutaRelativa}${ext}`);
    if (fs.existsSync(rutaCompleta)) return true;
  }
  return false;
}

function escanearArchivo(filePath) {
  const contenido = fs.readFileSync(filePath, 'utf8');
  const rutas = extraerImports(contenido);
  const errores = [];

  rutas.forEach(ruta => {
    if (!verificarRuta(ruta)) {
      errores.push(`❌ Import inválido en ${filePath}: '@/components/${ruta}'`);
    }
  });

  return errores;
}

function recorrerCarpeta(carpeta) {
  const erroresTotales = [];
  fs.readdirSync(carpeta).forEach(nombre => {
    const ruta = path.join(carpeta, nombre);
    const stats = fs.statSync(ruta);

    if (stats.isDirectory()) {
      erroresTotales.push(...recorrerCarpeta(ruta));
    } else if (ruta.endsWith('.jsx') || ruta.endsWith('.tsx')) {
      erroresTotales.push(...escanearArchivo(ruta));
    }
  });
  return erroresTotales;
}

const errores = recorrerCarpeta(baseDir);

if (errores.length === 0) {
  console.log('✅ Todos los imports son válidos.');
} else {
  console.log('🚨 Se encontraron imports inválidos:\n');
  errores.forEach(e => console.log(e));
}
