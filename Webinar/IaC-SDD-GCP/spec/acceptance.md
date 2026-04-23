# Criterios de aceptacion

- `terraform apply` crea la infraestructura sin errores.
- La VM responde a SSH con el usuario `ops`.
- `nginx` esta activo (`systemctl is-active nginx`).
- El firewall permite SSH solo desde el CIDR permitido.
- Todos los recursos tienen labels obligatorios.
