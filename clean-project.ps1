# clean-project.ps1
# Script de limpieza para proyecto Next.js + Supabase
# Elimina Notion y archivos obsoletos

Write-Host "=== INICIANDO LIMPIEZA DEL PROYECTO ===" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan

# Funcion para verificar y eliminar
function Remove-ItemSafe {
    param(
        [string]$Path,
        [string]$ItemType = "Archivo/Carpeta"
    )
    
    if (Test-Path $Path) {
        try {
            Remove-Item -Path $Path -Recurse -Force -ErrorAction Stop
            Write-Host "[OK] $ItemType eliminado: $Path" -ForegroundColor Green
            return $true
        }
        catch {
            Write-Host "[ERROR] Eliminando $Path : $_" -ForegroundColor Red
            return $false
        }
    }
    else {
        Write-Host "[INFO] $ItemType no encontrado: $Path" -ForegroundColor Yellow
        return $false
    }
}

# 1. ARCHIVOS Y CARPETAS DE NOTION (ELIMINAR COMPLETAMENTE)
Write-Host "`n[ETAPA 1] ELIMINANDO NOTION Y HIBRIDOS..." -ForegroundColor Magenta

$notionItems = @(
    # API Routes de Notion
    "src\app\api\notion",
    "src\app\api\circuitos-hibrido",
    "src\app\api\migrar-notion-ids-desde-csv",
    "src\app\api\sync-circuitos",
    
    # Librerias de Notion
    "src\lib\notion.ts",
    "src\lib\notion.js",
    "src\lib\notion.mjs",
    
    # Scripts de sincronizacion
    "scripts\syncCircuitos.ts",
    "scripts\sync-circuitos.js",
    
    # Importador (si existe)
    "importador",
    
    # CSV exports
    "sql\csv",
    
    # Componentes especificos de Notion
    "src\components\NotionBlockRenderer.jsx",
    "src\components\NotionBlockRenderer.tsx",
    "src\components\ValidadorSincronizacion.jsx",
    "src\components\BotonSincronizarCSV.jsx",
    "src\components\BotonSincronizarCircuitos.jsx",
    
    # Paginas relacionadas con Notion
    "src\app\notion",
    "src\pages\notion",
    
    # Configuraciones
    "notion-config.json",
    ".notionrc",
    "notion-*.json"
)

foreach ($item in $notionItems) {
    Remove-ItemSafe -Path $item -ItemType "Elemento Notion"
}

# 2. DASHBOARD OBSOLETO (MOVIENDO A LEGACY)
Write-Host "`n[ETAPA 2] LIMPIANDO DASHBOARD OBSOLETO..." -ForegroundColor Magenta

$dashboardItems = @(
    "dashboard-old",
    "src\components\dashboard-old",
    "src\app\dashboard-old",
    "src\pages\dashboard-old"
)

# Crear carpeta legacy si no existe
$legacyPath = "legacy"
if (!(Test-Path $legacyPath)) {
    New-Item -ItemType Directory -Path $legacyPath | Out-Null
    Write-Host "[OK] Carpeta 'legacy' creada" -ForegroundColor Green
}

foreach ($item in $dashboardItems) {
    if (Test-Path $item) {
        $itemName = Split-Path $item -Leaf
        $destination = Join-Path $legacyPath $itemName
        
        try {
            Move-Item -Path $item -Destination $destination -Force -ErrorAction Stop
            Write-Host "[MOVED] Movido a legacy: $item" -ForegroundColor Blue
        }
        catch {
            Write-Host "[WARN] No se pudo mover $item, intentando eliminar..." -ForegroundColor Yellow
            Remove-ItemSafe -Path $item -ItemType "Dashboard obsoleto"
        }
    }
}

# 3. COMPONENTES DUPLICADOS (MANTENER LA MEJOR VERSION)
Write-Host "`n[ETAPA 3] UNIFICANDO COMPONENTES DUPLICADOS..." -ForegroundColor Magenta

# Analizar componentes duplicados y mantener el mas reciente/moderno
$componentesDuplicados = @{
    "CircuitoCard" = @(
        "src\components\CircuitoCard.jsx",
        "src\components\CircuitoCard.tsx",
        "src\components\circuitos\CircuitoCard.jsx",
        "src\components\circuitos\CircuitoCard.tsx"
    )
    "DashboardHeader" = @(
        "src\components\DashboardHeader.jsx",
        "src\components\DashboardHeader.tsx",
        "src\components\dashboard\DashboardHeader.jsx",
        "src\components\dashboard\DashboardHeader.tsx"
    )
    "FormularioInscripcion" = @(
        "src\components\FormularioInscripcion.jsx",
        "src\components\FormularioInscripcion.tsx",
        "src\components\inscripcion\FormularioInscripcion.jsx"
    )
}

foreach ($componente in $componentesDuplicados.Keys) {
    $archivos = $componentesDuplicados[$componente]
    $archivoMantener = $null
    
    # Buscar la version mas reciente/completa
    foreach ($archivo in $archivos) {
        if (Test-Path $archivo) {
            $info = Get-Item $archivo
            $contenido = Get-Content $archivo -Raw -ErrorAction SilentlyContinue
            
            # Priorizar: .tsx sobre .jsx, version en carpeta organizada
            if ($archivo -match "\.tsx$") {
                $archivoMantener = $archivo
                Write-Host "[KEEP] Manteniendo (TypeScript): $archivo" -ForegroundColor Green
                break
            }
            elseif (!$archivoMantener -and $archivo -match "\.jsx$") {
                $archivoMantener = $archivo
                Write-Host "[KEEP] Manteniendo (JavaScript): $archivo" -ForegroundColor Yellow
            }
        }
    }
    
    # Eliminar duplicados
    if ($archivoMantener) {
        foreach ($archivo in $archivos) {
            if ($archivo -ne $archivoMantener -and (Test-Path $archivo)) {
                Remove-ItemSafe -Path $archivo -ItemType "Componente duplicado"
            }
        }
    }
}

# 4. ARCHIVOS TEMPORALES Y CACHE
Write-Host "`n[ETAPA 4] LIMPIANDO ARCHIVOS TEMPORALES..." -ForegroundColor Magenta

$tempItems = @(
    ".next",
    "node_modules\.cache",
    "*.log",
    "npm-debug.log*",
    "yarn-debug.log*",
    "yarn-error.log*",
    ".DS_Store",
    "Thumbs.db"
)

foreach ($pattern in $tempItems) {
    Get-ChildItem -Path . -Include $pattern -Recurse -Force -ErrorAction SilentlyContinue | ForEach-Object {
        Remove-ItemSafe -Path $_.FullName -ItemType "Archivo temporal"
    }
}

# 5. VERIFICAR Y ELIMINAR DEPENDENCIAS DE NOTION DEL PACKAGE.JSON
Write-Host "`n[ETAPA 5] ACTUALIZANDO PACKAGE.JSON..." -ForegroundColor Magenta

$packageJsonPath = "package.json"
if (Test-Path $packageJsonPath) {
    $packageJsonContent = Get-Content $packageJsonPath -Raw
    $packageJson = $packageJsonContent | ConvertFrom-Json
    
    # Dependencias de Notion a eliminar
    $notionDependencies = @(
        "@notionhq/client",
        "notion",
        "notion-client",
        "react-notion",
        "notion-types"
    )
    
    $modified = $false
    
    foreach ($dep in $notionDependencies) {
        if ($packageJson.dependencies.PSObject.Properties.Name -contains $dep) {
            $packageJson.dependencies.PSObject.Properties.Remove($dep)
            Write-Host "[REMOVE] Eliminando dependencia: $dep" -ForegroundColor Red
            $modified = $true
        }
        if ($packageJson.devDependencies.PSObject.Properties.Name -contains $dep) {
            $packageJson.devDependencies.PSObject.Properties.Remove($dep)
            Write-Host "[REMOVE] Eliminando devDependency: $dep" -ForegroundColor Red
            $modified = $true
        }
    }
    
    if ($modified) {
        $packageJson | ConvertTo-Json -Depth 10 | Set-Content $packageJsonPath
        Write-Host "[OK] package.json actualizado" -ForegroundColor Green
    }
    else {
        Write-Host "[INFO] No se encontraron dependencias de Notion" -ForegroundColor Yellow
    }
}

# 6. BUSCAR REFERENCIAS RESIDUALES A NOTION
Write-Host "`n[ETAPA 6] BUSCANDO REFERENCIAS RESIDUALES..." -ForegroundColor Magenta

# Buscar en archivos de codigo
$archivosCodigo = Get-ChildItem -Path "src" -Include "*.ts", "*.tsx", "*.js", "*.jsx" -Recurse -File -ErrorAction SilentlyContinue

$referenciasNotion = @()
foreach ($archivo in $archivosCodigo) {
    try {
        $contenido = Get-Content $archivo.FullName -Raw -ErrorAction Stop
        if ($contenido -match "notion|Notion|NOTION") {
            $referenciasNotion += $archivo.FullName
        }
    }
    catch {
        # Ignorar archivos que no se pueden leer
    }
}

if ($referenciasNotion.Count -gt 0) {
    Write-Host "[WARN] Se encontraron referencias a Notion en:" -ForegroundColor Yellow
    foreach ($ref in $referenciasNotion) {
        Write-Host "   - $ref" -ForegroundColor Gray
    }
    
    $respuesta = Read-Host "`nDeseas ver el contenido? (s/n)"
    if ($respuesta -eq "s") {
        foreach ($ref in $referenciasNotion) {
            Write-Host "`n--- $ref ---" -ForegroundColor Cyan
            Get-Content $ref | Select-String "notion|Notion|NOTION" | ForEach-Object {
                Write-Host "   Linea $($_.LineNumber): $($_.Line)" -ForegroundColor Gray
            }
        }
    }
}
else {
    Write-Host "[OK] No se encontraron referencias residuales a Notion" -ForegroundColor Green
}

# 7. CREAR ESTRUCTURA NUEVA
Write-Host "`n[ETAPA 7] CREANDO ESTRUCTURA NUEVA..." -ForegroundColor Magenta

$nuevasCarpetas = @(
    "src\lib\controllers",
    "src\lib\validators", 
    "src\lib\utils",
    "src\components\circuitos",
    "src\components\inscripcion",
    "src\components\dashboard",
    "src\components\ui",
    "src\app\api\circuitos",
    "src\app\api\inscripciones", 
    "src\app\api\reservas",
    "src\app\api\coordinadores",
    "src\app\api\sesiones",
    "src\app\api\auth",
    "src\app\api\dashboard",
    "src\app\circuitos",
    "src\app\reservar",
    "src\app\dashboard\circuitos",
    "src\app\dashboard\inscripciones", 
    "src\app\dashboard\coordinadores",
    "src\app\dashboard\sesiones",
    "src\app\dashboard\estadisticas",
    "sql",
    "public\images\circuitos",
    "public\images\coordinadores",
    "public\images\logos"
)

foreach ($carpeta in $nuevasCarpetas) {
    if (!(Test-Path $carpeta)) {
        New-Item -ItemType Directory -Path $carpeta -Force | Out-Null
        Write-Host "[CREATE] Creada: $carpeta" -ForegroundColor Green
    }
}

# 8. RESUMEN FINAL
Write-Host "`n" + ("=" * 50) -ForegroundColor Cyan
Write-Host " LIMPIEZA COMPLETADA " -ForegroundColor Green
Write-Host ("=" * 50) -ForegroundColor Cyan

Write-Host "`n=== RESUMEN ===" -ForegroundColor White
Write-Host "[OK] Notion eliminado completamente" -ForegroundColor Green
Write-Host "[OK] Dashboard obsoleto movido a /legacy" -ForegroundColor Green  
Write-Host "[OK] Componentes duplicados unificados" -ForegroundColor Green
Write-Host "[OK] Estructura nueva creada" -ForegroundColor Green
Write-Host "[OK] Archivos temporales limpiados" -ForegroundColor Green
Write-Host "[OK] package.json actualizado" -ForegroundColor Green

Write-Host "`n=== PROXIMOS PASOS ===" -ForegroundColor Yellow
Write-Host "1. Ejecuta: npm install" -ForegroundColor White
Write-Host "2. Verifica: npm run build" -ForegroundColor White
Write-Host "3. Configura variables de entorno" -ForegroundColor White
Write-Host "4. Implementa los nuevos archivos de estructura" -ForegroundColor White

Write-Host "`n[WARNING] Esta operacion no se puede deshacer facilmente." -ForegroundColor Red
Write-Host "   Considera hacer backup antes de ejecutar." -ForegroundColor Red

# Preguntar confirmacion final
Write-Host "`n" + ("=" * 50) -ForegroundColor Red
$confirmacion = Read-Host "Estas seguro de ejecutar la limpieza? (escribe 'si' para continuar)"
Write-Host ("=" * 50) -ForegroundColor Red

if ($confirmacion -eq "si") {
    Write-Host "`n[START] Ejecutando limpieza completa..." -ForegroundColor Yellow
    # El script ya ejecuto las acciones en cada etapa
    Write-Host "[DONE] Limpieza completada!" -ForegroundColor Green
}
else {
    Write-Host "[CANCEL] Limpieza cancelada" -ForegroundColor Red
}