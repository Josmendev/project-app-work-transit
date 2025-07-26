# Server - Work Transit

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

Este es el servidor (Backend) del proyecto **Work Transit**. Está construido con **NestJS** y **PostgreSQL** como gestor de base de datos, diseñado para la gestión integral de sistemas de transporte.

## 🚀 Arquitectura de Software – Backend (API RESTful)

### 📌 Tecnologías Utilizadas

- **Lenguaje de Programación:** JavaScript / TypeScript
- **Entorno de Ejecución:** Node.js v18+
- **Framework:** NestJS 🚀
- **ORM:** TypeORM 🗄️
- **Gestor de Base de Datos:**
  - **PostgreSQL** (Almacenamiento de datos)
- **Administrador de Base de Datos:** pgAdmin / TablePlus 🛠️
- **Contenerización:** Docker & Docker Compose 🐳
- **Documentación:** Swagger/OpenAPI 📄
- **Autenticación:** JWT (JSON Web Tokens) 🔐
- **Validación:** Class Validator & Class Transformer ✅
- **Testing:**
  - **Jest** (Pruebas Unitarias e Integración 🔍)
  - **Postman / Insomnia** (Pruebas Funcionales 📡)

### 🏗️ Estilo y Patrón de Arquitectura

- **Estilo de Arquitectura:** Cliente / Servidor (Monolítica)
- **Patrón de Arquitectura:** Modular (Propuesta por NestJS) usando conceptos de MVC
- **Patrones de Diseño:**
  - **Estructurales:** Adapters, Decorators
  - **De Comportamiento:** Strategy, Dependency Injection
  - **Creacionales:** Factory

### 📁 Estructura del Proyecto

```
server/
├── src/
│   ├── admin-routes/         # Gestión de rutas de transporte
│   ├── admin-trips/          # Gestión de viajes
│   ├── admin-users/          # Gestión de usuarios y roles
│   ├── admin-vehicles/       # Gestión de vehículos
│   ├── auth/                 # Autenticación y autorización
│   ├── common/               # Utilidades comunes
│   ├── config/               # Configuraciones
│   ├── emails/               # Gestión de correos
│   └── main.ts              # Punto de entrada
├── docker-compose.yml        # Configuración de contenedores
├── .env.template            # Template de variables de entorno
└── README.md
```

## 📦 Instalación y Ejecución

### Prerrequisitos

- **Node.js** v18 o superior
- **pnpm** (recomendado) o npm
- **Docker** y **Docker Compose**
- **Git**

### 1. Clonar el repositorio

```bash
git clone https://github.com/Josmendev/project-app-work-transit.git
cd project-app-work-transit/server
```

### 2. Instalar dependencias

```bash
# Con pnpm (recomendado)
pnpm install

# O con npm
npm install
```

### 3. Configurar variables de entorno

```bash
# Copiar el template
cp .env.template .env

# Editar las variables según tu entorno
# Ejemplo de configuración:
DB_USERNAME=postgres
DB_PASSWORD=tu_password
DB_NAME=work_transit_db
JWT_SECRET=tu_jwt_secret_super_seguro
```

### 4. Levantar la base de datos

```bash
# Iniciar PostgreSQL con Docker Compose
docker-compose up -d

# Verificar que esté corriendo
docker-compose ps
```

### 5. Iniciar el servidor

```bash
# Modo desarrollo
pnpm start:dev

# Modo producción
pnpm build
pnpm start:prod
```

### 6. Verificar la instalación

- **API:** http://localhost:3500
- **Documentación (Swagger):** http://localhost:3500/api/v1/docs
- **Base de datos:** localhost:5432

## 🔐 Autenticación

El sistema utiliza **JWT** para la autenticación. Endpoints principales:

- **POST** `/auth/login` - Iniciar sesión
- **POST** `/auth/confirm-account` - Confirmar cuenta
- **POST** `/auth/request-password-reset` - Solicitar reset de contraseña
- **GET** `/auth/user-profile` - Obtener perfil del usuario

### Usuario por defecto

Durante el desarrollo, puedes usar estas credenciales para iniciar sesión:

- **Usuario:** `70125834`
- **Contraseña:** `70125834`

## 📚 Documentación API

La documentación completa de la API está disponible en:

**http://localhost:3000/api/v1/docs**

Incluye:
- Esquemas de request/response
- Códigos de estado HTTP
- Ejemplos de uso
- Autenticación con Bearer Token

## 🐳 Docker Commands

```bash
# Levantar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar servicios
docker-compose down

# Generar backup de la DB
docker-compose exec work-transit-db pg_dump -U postgres -d work_transit_db > backup.sql

# Restaurar backup
docker-compose exec -T work-transit-db psql -U postgres -d work_transit_db < backup.sql
```

## 🧪 Testing

```bash
# Pruebas unitarias
pnpm test

# Pruebas e2e
pnpm test:e2e

# Coverage
pnpm test:cov
```

## 📈 Scripts Disponibles

```bash
# Desarrollo
pnpm start:dev          # Servidor en modo desarrollo
pnpm start:debug        # Servidor con debugging

# Producción
pnpm build              # Compilar proyecto
pnpm start:prod         # Servidor en modo producción

# Utilidades
pnpm lint               # Analizar código
pnpm format             # Formatear código
```

## 🌍 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DB_USERNAME` | Usuario de PostgreSQL | `postgres` |
| `DB_PASSWORD` | Contraseña de PostgreSQL | `mypassword` |
| `DB_NAME` | Nombre de la base de datos | `work_transit_db` |
| `JWT_SECRET` | Secret para JWT | `my-super-secret-key` |
| `BCRYPT_SALT_ROUNDS` | Rounds para bcrypt | `10` |

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**JosmenDev** - [GitHub](https://github.com/Josmendev)

## 🚀 Estado del Proyecto

🟢 **En Desarrollo Activo**

### Funcionalidades Implementadas

- ✅ Sistema de autenticación JWT
- ✅ Gestión de usuarios y roles
- ✅ CRUD de vehículos y marcas
- ✅ Gestión de rutas y paradas
- ✅ Sistema de viajes
- ✅ Reset de contraseñas con PIN
- ✅ Documentación con Swagger
- ✅ Dockerización completa

### Próximas Funcionalidades

- 🔄 Sistema de notificaciones
- 🔄 Reportes y analytics
- 🔄 API para aplicación móvil
- 🔄 Sistema de geolocalización