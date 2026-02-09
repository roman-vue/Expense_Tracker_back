# Expense Tracker Backend

## 📋 Descripción del Proyecto

**Expense Tracker Backend** es una API RESTful construida con NestJS para la gestión de finanzas personales. Esta aplicación permite a los usuarios gestionar sus billeteras, categorías de gastos, transacciones y mantener un control completo sobre sus finanzas.

### 🎯 Características Principales

- **Gestión de Billeteras**: Crear, actualizar, eliminar y consultar billeteras personales
- **Control de Transacciones**: Registrar, editar y eliminar transacciones financieras
- **Sistema de Categorías**: Organizar gastos mediante categorías personalizadas
- **Autenticación JWT**: Sistema seguro de autenticación basado en tokens
- **Documentación Swagger**: API documentada automáticamente
- **Caché Redis**: Mejora de rendimiento con Redis
- **Base de Datos MongoDB**: Almacenamiento flexible y escalable

---

## 🏗️ Arquitectura del Sistema

### Tecnologías Utilizadas

| Tecnología     | Versión | Propósito                |
| -------------- | ------- | ------------------------ |
| **Node.js**    | 19      | Runtime principal        |
| **NestJS**     | 10.0.0  | Framework backend        |
| **TypeScript** | 5.1.3   | Lenguaje de programación |
| **MongoDB**    | 8.8.2   | Base de datos NoSQL      |
| **Redis**      | 5.4.2   | Caché y sesiones         |
| **JWT**        | 9.0.2   | Autenticación            |
| **Swagger**    | 8.0.7   | Documentación API        |

### Estructura del Proyecto

```
src/
├── app.module.ts              # Módulo principal de la aplicación
├── main.ts                    # Punto de entrada
├── api/                       # Configuración de API
├── database/                  # Configuración y esquemas de BD
│   ├── database.module.ts
│   └── schemas/               # Esquemas Mongoose
│       ├── users.schema.ts
│       ├── wallet.schema.ts
│       └── categories.schema.ts
├── guards/                    # Guards de autenticación
├── modules/                   # Módulos de negocio
│   ├── auth/                  # Autenticación
│   ├── users/                 # Gestión de usuarios
│   ├── wallet/                # Gestión de billeteras
│   ├── categories/            # Gestión de categorías
│   └── dashboard/             # Panel de control
├── redis/                     # Configuración Redis
└── settings/                  # Configuraciones globales
    ├── exceptions/            # Manejo de excepciones
    ├── filter/                # Filtros globales
    ├── interceptors/          # Interceptores
    ├── logger/                # Sistema de logging
    └── swagger/               # Configuración Swagger
```

---

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 19 o superior
- MongoDB 5.0 o superior
- Redis 6.0 o superior
- npm o yarn

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd Expense_Tracker_back
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
# Tokens de Autenticación
ACCESS_TOKEN_SECRET=tu_secreto_access_token
REFRESH_TOKEN_SECRET=tu_secreto_refresh_token

# Configuración API
API_PREFIX=api
PORT=3000

# Base de Datos MongoDB
MONGOURL=mongodb://localhost:27017/expense_tracker

# Configuración Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0
```

### 4. Ejecutar la Aplicación

#### Modo Desarrollo

```bash
npm run start:dev
```

#### Modo Producción

```bash
npm run build
npm run start:prod
```

---

## 📚 Documentación de la API

### Endpoints Principales

#### 🔐 Autenticación

- `POST /api/auth/login` - Inicio de sesión
- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/refresh` - Refrescar token

#### 👤 Usuarios

- `GET /api/users/profile` - Obtener perfil
- `PUT /api/users/profile` - Actualizar perfil

#### 💰 Billeteras (Wallets)

- `GET /api/wallet` - Listar billeteras del usuario
- `POST /api/wallet` - Crear nueva billetera
- `GET /api/wallet/:id` - Obtener detalles de billetera
- `PATCH /api/wallet/:id` - Actualizar billetera
- `DELETE /api/wallet/:id` - Eliminar billetera

#### 📊 Transacciones

- `POST /api/wallet/add-transactions/:walletId` - Agregar transacción
- `PUT /api/wallet/edit-transactions/:transactionId/:walletId` - Editar transacción
- `DELETE /api/wallet/delete-transactions/:transactionId/:walletId` - Eliminar transacción

#### 🏷️ Categorías

- `GET /api/categories` - Listar categorías
- `POST /api/categories` - Crear categoría
- `GET /api/categories/:id` - Obtener categoría
- `PATCH /api/categories/:id` - Actualizar categoría
- `DELETE /api/categories/:id` - Eliminar categoría

### 📖 Documentación Interactiva

Una vez iniciada la aplicación, puedes acceder a la documentación Swagger en:

```
http://localhost:3000/api/docs
```

---

## 🔧 Modelos de Datos

### User (Usuario)

```typescript
{
  name: string;
  email: string; // único
  password: string; // encriptado
  status: boolean; // activo/inactivo
}
```

### Wallet (Billetera)

```typescript
{
  name: string; // único por usuario
  userId: string;
  transactions: Array<ITransactions>;
  status: boolean;
  createdAt: Date;
}
```

### Category (Categoría)

```typescript
{
  name: string; // único por usuario
  userId: string;
  status: boolean;
}
```

### Transaction (Transacción)

```typescript
{
  amount: number;
  type: 'income' | 'expense';
  categoryId: string;
  description: string;
  date: Date;
}
```

---

## 🐳 Docker

### Construir Imagen Docker

```bash
docker build -t expense-tracker-backend .
```

### Ejecutar Contenedor Docker

```bash
docker run -p 3000:3000 \
  -e ACCESS_TOKEN_SECRET=tu_secreto \
  -e MONGOURL=mongodb://host.docker.internal:27017/expense_tracker \
  -e REDIS_HOST=host.docker.internal \
  expense-tracker-backend
```

---

## 🧪 Testing

### Ejecutar Tests Unitarios

```bash
npm run test
```

### Ejecutar Tests con Cobertura

```bash
npm run test:cov
```

### Ejecutar Tests E2E

```bash
npm run test:e2e
```

---

## 🔒 Seguridad

### Implementaciones de Seguridad

- **Autenticación JWT**: Tokens de acceso y refresco
- **Encriptación de Contraseñas**: bcrypt para hashing
- **Validación de Entradas**: class-validator y class-transformer
- **CORS**: Configurado para producción
- **Guards de Autenticación**: Protección de endpoints

### Headers de Autenticación

Para acceder a los endpoints protegidos, incluye:

```http
Authorization: Bearer <access_token>
user-email: <user_email>
```

---

## 📊 Monitoreo y Logging

### Sistema de Logging

La aplicación incluye un sistema de logging completo:

- **Niveles**: DEBUG, INFO, WARN, ERROR
- **Formato**: Structured logging
- **Salida**: Consola (configurable para archivos)

### Health Check

Endpoint para verificar el estado de la API:

```bash
GET http://localhost:3000/
```

Respuesta:

```json
{
  "message": "It's Ok",
  "status": 200,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## 🚀 Despliegue

### Producción

1. **Construir la aplicación**:

   ```bash
   npm run build
   ```

2. **Configurar variables de entorno** de producción

3. **Ejecutar en modo producción**:
   ```bash
   npm run start:prod
   ```

### Consideraciones de Producción

- Configurar MongoDB con réplica set
- Configurar Redis cluster para alta disponibilidad
- Implementar balanceador de carga
- Configurar SSL/TLS
- Monitorear con herramientas como PM2

---

## 🤝 Contribución

### Flujo de Trabajo

1. Fork del repositorio
2. Crear rama de características: `git checkout -feature/nueva-caracteristica`
3. Commits descriptivos: `git commit -m 'Add nueva característica'`
4. Push a la rama: `git push origin feature/nueva-caracteristica`
5. Pull Request

### Estándares de Código

- **Linting**: ESLint con configuración NestJS
- **Formato**: Prettier
- **TypeScript**: Tipado estricto
- **Testing**: Cobertura mínima del 80%

---

## 📝 Licencia

Este proyecto está licenciado bajo la licencia UNLICENSED.

---

## 🆘 Soporte

### Problemas Comunes

1. **Error de conexión MongoDB**:
   - Verificar que MongoDB esté corriendo
   - Comprobar la URL de conexión en `.env`

2. **Error de conexión Redis**:
   - Verificar que Redis esté corriendo
   - Comprobar host y puerto en `.env`

3. **Token inválido**:
   - Verificar los secretos JWT en `.env`
   - Asegurar que el token no esté expirado

### Contacto

Para soporte técnico o preguntas:

- Crear un issue en el repositorio
- Revisar la documentación de Swagger
- Consultar los logs de la aplicación

---

## 🔄 Versiones

### v0.0.1 (Actual)

- Versión inicial del proyecto
- Funcionalidades básicas de CRUD
- Autenticación JWT
- Documentación Swagger

---

## 📈 Roadmap

### Próximas Características

- [ ] Integración con pasarelas de pago
- [ ] Sistema de notificaciones
- [ ] Dashboard analítico
- [ ] Exportación de datos (PDF, Excel)
- [ ] API GraphQL
- [ ] Microservicios architecture

### Mejoras Técnicas

- [ ] Implementación de eventos (Event Sourcing)
- [ ] Caching avanzado
- [ ] Optimización de consultas
- [ ] Tests de carga automatizados
