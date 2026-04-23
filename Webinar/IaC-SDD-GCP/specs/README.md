# Validacion

Este script valida los criterios de aceptacion principales.

## Uso
```bash
export PROJECT_ID=YOUR_PROJECT_ID
export ZONE=us-central1-a
export INSTANCE_NAME=sdd-vm-dev
export ALLOWED_SSH_CIDR=10.0.0.0/24

./validate.sh
```

## Dependencias
- gcloud
- jq
- ssh
