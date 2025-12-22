# fix-dead-code.ps1
$fixes = @{
  "app/dashboard/circuitos/[id]/page.tsx" = @("error")
  "app/dashboard/circuitos/create/page.tsx" = @("supabase")
  "app/dashboard/circuitos/page.tsx" = @("error")
  "app/dashboard/circuitos/show/[id]/page.tsx" = @("Circuito")
  "app/dashboard/coordinadores/show/[id]/page.tsx" = @("Coordinador")
  "app/dashboard/inscripciones/components/InscripcionesListClient.tsx" = @("initialCircuitos")
  "src/components/CircuitoCard.tsx" = @("localidad")
  "src/components/circuitos/CircuitoCard.tsx" = @("localidad")
  "src/hooks/useCircuitos.ts" = @("_")
  "src/lib/subirImagenCircuito.ts" = @("data")
  "src/lib/validators/circuitoUpdateSchema.ts" = @("z")
  "src/components/dashboard/InscripcionesPorCircuito.tsx" = @("circuitosMap")
}

foreach ($entry in $fixes.GetEnumerator()) {
  $file = $entry.Key
  $vars = $entry.Value
  if (Test-Path $file) {
    $content = Get-Content $file
    $newContent = @()
    foreach ($line in $content) {
      $keep = $true
      foreach ($v in $vars) {
        if ($line -match "\b$([regex]::Escape($v))\b" -and $line -notmatch "import|export|interface|type.*$([regex]::Escape($v))") {
          Write-Host "🗑️ Eliminando $v en $file"
          $keep = $false
          break
        }
      }
      if ($keep) { $newContent += $line }
    }
    $newContent | Set-Content $file -Encoding UTF8
  }
}
Write-Host "✅ Código muerto eliminado."