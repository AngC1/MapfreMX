# Backstage.io - AYESA IDP Platform

Esta es una instalación de Backstage.io configurada para funcionar en Docker-in-Docker, ideal para demostraciones de la estrategia Internal Developer Platform (IDP) de AYESA.

## 🚀 Inicio Rápido

### Iniciar Backstage

```bash
cd Webinar/backstage
./start.sh
```

Espera 30-60 segundos y accede a: **http://localhost:7007**

### Detener Backstage

```bash
./stop.sh
```

### Reiniciar Backstage

```bash
./restart.sh
```

## 📋 Prerrequisitos

- Docker instalado y en ejecución
- Docker Compose (v2.x o superior)
- Puertos disponibles: 7007 (Backstage), 5432 (PostgreSQL interno)

## 🏗️ Arquitectura

La instalación incluye:

- **Backstage Frontend + Backend**: Puerto 7007
- **PostgreSQL**: Base de datos interna (puerto 5432)
- **Catálogo de componentes**: Precargado con ejemplos de AYESA
- **Software Templates**: Templates para crear nuevos proyectos

## 📚 Catálogo Incluido

### Sistemas
- **IDP Platform**: Sistema principal de la plataforma

### Componentes
- **CloudBees Pipeline Builder**: Generador de pipelines CloudBees Unify
- **ROX Java Demo**: Aplicación demo Java con Docker

### Templates
- **CloudBees Application Template**: Template para crear apps con pipeline CloudBees

## 🔧 Configuración

### Archivo principal
- `app-config.yaml`: Configuración de Backstage

### Variables de entorno
Las variables se pueden modificar en `docker-compose.yml`:

```yaml
environment:
  APP_CONFIG_app_baseUrl: http://localhost:7007
  POSTGRES_PASSWORD: backstage
```

### Catálogo de componentes
Los componentes están en: `catalog/`
- `systems/`: Definiciones de sistemas
- `components/`: Componentes de la plataforma
- `templates/`: Software templates

## 🔐 Autenticación

Por defecto usa **autenticación guest** (sin login) para facilitar las demos. 

Para producción, configura proveedores de autenticación en `app-config.yaml`:
- GitHub OAuth
- GitLab OAuth
- Azure AD
- Google OAuth
- SAML
- LDAP

## 🌐 Acceso desde Red Externa

Para acceder desde otros dispositivos en la red:

1. Modifica `docker-compose.yml`:
```yaml
environment:
  APP_CONFIG_app_baseUrl: http://TU_IP:7007
  APP_CONFIG_backend_baseUrl: http://TU_IP:7007
  APP_CONFIG_backend_cors_origin: http://TU_IP:7007
```

2. Reinicia con `./restart.sh`

3. Accede desde: `http://TU_IP:7007`

## 📊 Logs y Troubleshooting

### Ver logs de Backstage
```bash
docker-compose logs -f backstage
```

### Ver logs de PostgreSQL
```bash
docker-compose logs -f postgres
```

### Ver todos los logs
```bash
docker-compose logs -f
```

### Verificar estado de los servicios
```bash
docker-compose ps
```

### Limpiar todo (incluyendo datos)
```bash
docker-compose down -v
```

## 🔗 Integraciones

### GitHub
Para integrar con GitHub (repos privados):

1. Crea un Personal Access Token en GitHub
2. Agrega a `app-config.yaml`:
```yaml
integrations:
  github:
    - host: github.com
      token: ${GITHUB_TOKEN}
```
3. Agrega la variable en `docker-compose.yml`:
```yaml
environment:
  GITHUB_TOKEN: ghp_tu_token_aqui
```

### GitLab, Bitbucket, Azure DevOps
Similar a GitHub, configura en `integrations` del `app-config.yaml`.

## 📖 Recursos

- [Documentación oficial de Backstage](https://backstage.io/docs)
- [Backstage Software Catalog](https://backstage.io/docs/features/software-catalog)
- [Backstage Software Templates](https://backstage.io/docs/features/software-templates)
- [Backstage Plugins](https://backstage.io/plugins)

## 🎯 Casos de Uso para Demos

1. **Portal de Desarrolladores**: Muestra el catálogo de componentes
2. **Self-Service**: Crea proyectos desde templates
3. **Documentación**: TechDocs integrado
4. **Observabilidad**: Integración con herramientas de monitoreo
5. **Golden Paths**: Estandarización de desarrollo

## 🛠️ Personalización

### Agregar nuevos componentes
1. Crea un archivo YAML en `catalog/components/`
2. Reinicia Backstage o usa "Register Existing Component"

### Crear templates personalizados
1. Crea un template en `catalog/templates/`
2. Define pasos de scaffolding
3. Registra en el catálogo

### Instalar plugins
Modificar el `Dockerfile` para incluir plugins adicionales de:
- https://backstage.io/plugins

## 📝 Notas

- Esta configuración es para **demo y desarrollo**
- Para producción, configura:
  - HTTPS/TLS
  - Autenticación real
  - Permisos y RBAC
  - Backup de base de datos
  - Secrets management (Vault, etc.)
  - Monitoreo y alertas

## 🤝 Soporte

Para soporte interno AYESA:
- Equipo DevSecOps
- Canal Slack: #idp-platform
