# SDD con IaC en GCP (Terraform + Ansible)

Ejemplo completo de Spec Driven Development aplicado a GCP. Incluye la especificacion, IaC con Terraform, configuracion con Ansible y validacion.

## Requisitos previos
- gcloud autenticado y con proyecto activo.
- Terraform >= 1.5.
- Ansible >= 2.14.

## Variables requeridas
Define al menos:
- `project_id`
- `env`
- `owner`
- `cost_center`
- `ops_ssh_public_key`

## Pasos rapidos
```bash
# Terraform
cd terraform
terraform init
terraform apply \
  -var project_id=YOUR_PROJECT_ID \
  -var env=dev \
  -var owner=team-x \
  -var cost_center=cc-123 \
  -var ops_ssh_public_key="ssh-ed25519 AAAA..."

# Obtener IP publica
terraform output -raw public_ip

# Ansible
cd ../ansible
# Editar inventory.ini con la IP publicada por Terraform
ansible-playbook -i inventory.ini playbook.yml

# Validacion
cd ../specs
./validate.sh
```

## Estructura
- spec/: requisitos y criterios de aceptacion
- terraform/: infraestructura GCP
- ansible/: configuracion de la VM
- specs/: validacion automatizada
