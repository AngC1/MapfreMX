param(
    [string]$Goal = "spring-boot:run"
)

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$env:JAVA_HOME = "C:\Users\MACADIAD\.jdk\jdk-21.0.2+13"
$env:Path = "$env:JAVA_HOME\bin;$env:Path"

if (-not (Get-Command mvn -ErrorAction SilentlyContinue)) {
    $mavenBin = Get-ChildItem "$env:USERPROFILE\.maven" -Directory -ErrorAction SilentlyContinue |
        Where-Object { $_.Name -like "maven-*" } |
        Sort-Object Name -Descending |
        Select-Object -First 1 |
        ForEach-Object { Join-Path $_.FullName "bin" }
    if ($mavenBin) {
        $env:Path = "$mavenBin;$env:Path"
    }
}

if (-not (Get-Command mvn -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: mvn no encontrado en PATH. Instala Maven o agrega su carpeta bin al PATH." -ForegroundColor Red
    exit 1
}

Write-Host "JAVA_HOME: $env:JAVA_HOME" -ForegroundColor Cyan
Write-Host "Ejecutando: mvn $Goal" -ForegroundColor Cyan

Push-Location $ScriptDir
try {
    & "mvn" $Goal
} finally {
    Pop-Location
}
