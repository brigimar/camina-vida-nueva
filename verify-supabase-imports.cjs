const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const VALID_IMPORTS = {
  browser: "@/src/lib/supabaseBrowser",
  server: "@/src/lib/supabaseServer",
  client: "@/src/lib/supabaseClient",
};

const VALID_FUNCTIONS = {
  browser: "createClient",
  server: "createSupabaseServer",
  client: "supabase",
};

const FILE_PATTERNS = {
  browser: ["components", "form", "Form", "client"],
  server: ["page.tsx", "layout.tsx", "server"],
  client: ["controller", "service", "lib"],
};

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath, fileList);
    } else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
      fileList.push(fullPath);
    }
  });

  return fileList;
}

function detectIncorrectImports(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const errors = [];

  // Detect imports from wrong paths
  const importRegex = /import\s+.*?from\s+["'](.*?)["']/g;
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];

    // Detect old or invalid Supabase imports
    if (
      importPath.includes("@supabase/auth-helpers") ||
      importPath.includes("@supabase/auth-helpers-nextjs") ||
      importPath.includes("@supabase/auth-helpers-react")
    ) {
      errors.push(`❌ Import obsoleto detectado: ${importPath}`);
    }

    // Detect wrong alias usage
    if (importPath.includes("@/lib/")) {
      errors.push(`❌ Alias incorrecto: ${importPath} → debería ser "@/src/lib/..."`);
    }

    // Detect missing supabaseBrowser
    if (importPath.includes("supabaseBrowser") && !importPath.includes("@/src/lib")) {
      errors.push(`❌ Import incorrecto de supabaseBrowser: ${importPath}`);
    }

    // Detect missing supabaseServer
    if (importPath.includes("supabaseServer") && !importPath.includes("@/src/lib")) {
      errors.push(`❌ Import incorrecto de supabaseServer: ${importPath}`);
    }
  }

  // Detect incorrect function usage
  if (content.includes("createClientComponentClient")) {
    errors.push("❌ Uso prohibido: createClientComponentClient()");
  }

  if (content.includes("createBrowserSupabaseClient")) {
    errors.push("❌ Uso prohibido: createBrowserSupabaseClient()");
  }

  if (content.includes("createSupabaseBrowser") && !content.includes("createClient")) {
    errors.push("⚠️ Función antigua detectada: createSupabaseBrowser() → renombrar a createClient()");
  }

  return errors;
}

function run() {
  console.log("🔍 Escaneando imports de Supabase...\n");

  const files = walk(ROOT);
  let totalErrors = 0;

  files.forEach((file) => {
    const errors = detectIncorrectImports(file);

    if (errors.length > 0) {
      console.log(`\n📄 Archivo: ${file}`);
      errors.forEach((err) => console.log("   " + err));
      totalErrors += errors.length;
    }
  });

  console.log("\n✅ Escaneo completado.");
  console.log(`🔎 Errores detectados: ${totalErrors}`);
}

run();
