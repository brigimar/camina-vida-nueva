# ===============================
# Crear carpeta /legacy
# ===============================
$legacy = "legacy"
if (-not (Test-Path $legacy)) {
    New-Item -ItemType Directory -Path $legacy | Out-Null
}

# ===============================
# 1. Archivos sobrantes de /public
# (assets sin uso, no afectan la home)
# ===============================
$publicLegacy = "legacy/public"
if (-not (Test-Path $publicLegacy)) {
    New-Item -ItemType Directory -Path $publicLegacy | Out-Null
}

$publicExtraFiles = @(
    "file.svg", "globe.svg", "logo copia.psd", "logo2.png",
    "logo3.png", "logo-vida.png", "next.svg", "vercel.svg", "window.svg"
)

foreach ($file in $publicExtraFiles) {
    $path = "public/$file"
    if (Test-Path $path) {
        Write-Host "Moviendo $file → legacy/public/"
        Move-Item $path "$publicLegacy/"
    }
}

# ===============================
# 2. Carpetas sobrantes en raíz del proyecto
# ===============================
$rootFoldersToMove = @(
    "api", "auth", "caminatas", "circuitos",
    "coordinadores", "dashboard", "dashboard-data",
    "debug", "debug-circuitos", "images-backup",
    "inscribirse", "inscripciones", "inscriptos",
    "inscriptos_por_circuito", "login", "notificar",
    "registro", "reservas", "sesiones",
    "slots", "vista_sesiones_caminatas", "my-app",
    "components-backup"
)

foreach ($folder in $rootFoldersToMove) {
    if (Test-Path $folder) {
        Write-Host "Moviendo carpeta $folder → legacy/"
        Move-Item $folder "$legacy/"
    }
}

# ===============================
# 3. Componentes que NO son parte de la Home
# ===============================
$componentsLegacy = "legacy/components-unused"
if (-not (Test-Path $componentsLegacy)) {
    New-Item -ItemType Directory -Path $componentsLegacy | Out-Null
}

$componentsToMove = @(
    "CaminatasCliente.jsx",
    "BotonWhatsapFlot.jsx",
    "VistaSesionesCaminatas.jsx",
    "FiltroCaminatas.jsx"
)

foreach ($component in $componentsToMove) {
    $path = "src/components/$component"
    if (Test-Path $path) {
        Write-Host "Moviendo $component → legacy/components-unused"
        Move-Item $path "$componentsLegacy/"
    }
}

# ===============================
# 4. Mover carpeta duplicada /src/components/evento
# ===============================
if (Test-Path "src/components/evento") {
    Write-Host "Moviendo carpeta evento duplicada → legacy/evento-old"
    Move-Item "src/components/evento" "legacy/evento-old"
}

Write-Host "===== LIMPIEZA SEGURA COMPLETADA ====="
.\