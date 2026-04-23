# Ejemplo de SDD (Spec Driven Development) con IaC (Ansible + Terraform)

Este documento muestra un ejemplo compacto de SDD aplicado a IaC. La idea es definir primero la especificacion, luego generar la infraestructura con Terraform y configurar con Ansible, y finalmente validar contra la especificacion. Tambien se incluye un ejemplo completo en GCP.

## 1) Especificacion (Spec)

### Alcance
- Crear una red base y una maquina virtual Linux.
- Exponer solo SSH desde una red permitida.
- Aplicar hardening basico y desplegar un servicio de ejemplo.

### Requisitos funcionales
- Debe existir una VPC/VNet con una subred privada.
- Debe existir una VM con 2 vCPU y 4 GB RAM.
- La VM debe tener un usuario de operacion llamado `ops`.
- SSH solo desde `10.0.0.0/24`.
- El servicio `nginx` debe estar instalado y activo.

### Requisitos no funcionales
- Todos los recursos deben tener tags: `owner`, `env`, `cost_center`.
- Logs del sistema deben estar habilitados.
- Politica de actualizaciones de seguridad aplicada.

### Criterios de aceptacion (ejemplos)
- `terraform apply` crea la infraestructura sin errores.
- `ansible-playbook` configura la VM con exito.
- `specs/validate.sh` devuelve exit code 0.

## 2) Estructura del repositorio (propuesta)

```
IaC-SDD/
  spec/
    requirements.md
    acceptance.md
  terraform/
    main.tf
    variables.tf
    outputs.tf
  ansible/
    playbook.yml
    roles/
      hardening/
      nginx/
  specs/
    validate.sh
```

## 3) Terraform (infraestructura)

### variables.tf
```hcl
variable "env" {
  type = string
}

variable "owner" {
  type = string
}

variable "cost_center" {
  type = string
}

variable "allowed_ssh_cidr" {
  type    = string
  default = "10.0.0.0/24"
}
```

### main.tf (fragmento)
```hcl
locals {
  tags = {
    owner       = var.owner
    env         = var.env
    cost_center = var.cost_center
  }
}

# Reemplazar por el proveedor/cloud real
resource "example_network" "vpc" {
  name = "sdd-vpc-${var.env}"
  tags = local.tags
}

resource "example_subnet" "private" {
  network_id = example_network.vpc.id
  cidr       = "10.10.1.0/24"
  tags       = local.tags
}

resource "example_vm" "app" {
  name       = "sdd-vm-${var.env}"
  subnet_id  = example_subnet.private.id
  vcpu       = 2
  memory_gb  = 4
  tags       = local.tags

  ssh_ingress_cidr = var.allowed_ssh_cidr
}
```

## 4) Ansible (configuracion)

### playbook.yml
```yaml
---
- name: Configurar VM segun especificacion
  hosts: app
  become: true
  vars:
    ops_user: "ops"
  roles:
    - role: hardening
    - role: nginx
```

### roles/hardening/tasks/main.yml (fragmento)
```yaml
---
- name: Crear usuario ops
  user:
    name: "{{ ops_user }}"
    shell: /bin/bash
    state: present

- name: Aplicar actualizaciones de seguridad
  apt:
    upgrade: dist
    update_cache: true

- name: Habilitar logs del sistema
  service:
    name: rsyslog
    state: started
    enabled: true
```

### roles/nginx/tasks/main.yml (fragmento)
```yaml
---
- name: Instalar nginx
  apt:
    name: nginx
    state: present

- name: Asegurar nginx activo
  service:
    name: nginx
    state: started
    enabled: true
```

## 5) Validacion automatizada (Spec -> Tests)

### specs/validate.sh
```bash
#!/usr/bin/env bash
set -euo pipefail

# Ejemplos de comprobaciones. Reemplazar por comandos reales segun el cloud.

# 1) Validar tags obligatorios
# terraform output -json | jq ...

# 2) Validar SSH restringido
# cloud-cli security-group describe ...

# 3) Validar nginx activo
# ssh ops@<ip> "systemctl is-active nginx"

echo "OK"
```

## 6) Flujo SDD recomendado

1. Escribir requisitos en `spec/requirements.md`.
2. Definir criterios de aceptacion en `spec/acceptance.md`.
3. Implementar infraestructura en `terraform/`.
4. Implementar configuracion en `ansible/`.
5. Ejecutar validaciones en `specs/validate.sh`.

## 7) Como usar el ejemplo

```bash
# Terraform
cd terraform
terraform init
terraform apply -var env=dev -var owner=team-x -var cost_center=cc-123

# Ansible
cd ../ansible
ansible-playbook -i inventory.ini playbook.yml

# Validacion
cd ../specs
./validate.sh
```

## 8) Ejemplo completo en GCP

Consulta el ejemplo completo con archivos reales en:
- [Webinar/IaC-SDD-GCP/README.md](Webinar/IaC-SDD-GCP/README.md)

---

Si quieres, puedo adaptar el ejemplo a un proveedor concreto (AWS/Azure/GCP) y generar los archivos reales con recursos validos.
