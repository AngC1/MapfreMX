param(
    [string]$Goal = "spring-boot:run"
)

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$env:JAVA_HOME = "C:\Users\MACADIAD\.jdk\jdk-21.0.2+13"
$env:Path = "$env:JAVA_HOME\bin;$env:Path"

Write-Host "JAVA_HOME: $env:JAVA_HOME" -ForegroundColor Cyan
Write-Host "Ejecutando: mvnw.cmd $Goal" -ForegroundColor Cyan

Push-Location $ScriptDir
try {
    & ".\mvnw.cmd" $Goal
} finally {
    Pop-Location
}
