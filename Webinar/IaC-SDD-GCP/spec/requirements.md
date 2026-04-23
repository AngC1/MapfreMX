# Requisitos (Spec)

## Funcionales
- Debe existir una VPC y una subred privada.
- Debe existir una VM con 2 vCPU y 4 GB RAM.
- La VM debe tener un usuario de operacion llamado `ops`.
- SSH solo desde `10.0.0.0/24`.
- El servicio `nginx` debe estar instalado y activo.

## No funcionales
- Todos los recursos deben tener labels: `owner`, `env`, `cost_center`.
- Logs del sistema habilitados.
- Politica de actualizaciones de seguridad aplicada.
