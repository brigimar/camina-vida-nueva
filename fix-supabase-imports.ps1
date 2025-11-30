# Cambiar al directorio raíz del proyecto
Set-Location "E:\BuenosPasos\buenospasos\pasoapaso\caminatas-limpio"

Write-Host "🚀 Renombrando src/lib/supabase.js a src/lib/supabase.mjs..."
Rename-Item -Path "src\lib\supabase.js" -NewName "supabase.mjs" -Force

Write-Host "🔍 Actualizando imports en VistaCircuitosHome.jsx..."
(Get-Content "src\components\VistaCircuitosHome.jsx") `
    -replace 'import supabase from ../lib/supabase.js;', 'import supabase from ../lib/supabase.mjs;' |
    Set-Content "src\components\VistaCircuitosHome.jsx"

Write-Host "🔍 Actualizando imports en page.jsx..."
(Get-Content "src\app\page.jsx") `
    -replace 'import supabase from ../lib/supabase.js;', 'import supabase from ../lib/supabase.mjs;' |
    Set-Content "src\app\page.jsx"

Write-Host "✅ Cambios aplicados. Ahora podés limpiar y reconstruir:"
Write-Host "   rm -rf .next node_modules"
Write-Host "   npm install"
Write-Host "   npm run dev"
