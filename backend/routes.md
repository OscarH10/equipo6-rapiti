# API Routes - Proyecto Rapiti

**Sistema de Comparación de Precios en Supermercados Locales**

## Tabla de Contenidos

- [Autenticación](#autenticación)
- [Productos](#productos)
- [Precios](#precios)
- [Tiendas](#tiendas)
- [Reportes de Usuarios](#reportes-de-usuarios)
- [Búsqueda](#búsqueda)
- [Perfil de Usuario](#perfil-de-usuario)

---

## Autenticación

### Registro de nuevo usuario

```
POST /api/auth/register
```

**Body:**
```json
{
  "nombre": "string",
  "email": "string",
  "password": "string",
  "telefono": "string (opcional)"
}
```

### Inicio de sesión

```
POST /api/auth/login
```

**Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

### Cerrar sesión

```
POST /api/auth/logout
```

**Headers:** `Authorization: Bearer {token}`

### Verificar token

```
GET /api/auth/verify
```

**Headers:** `Authorization: Bearer {token}`

### Recuperar contraseña

```
POST /api/auth/forgot-password
```

**Body:**
```json
{
  "email": "string"
}
```

### Restablecer contraseña

```
POST /api/auth/reset-password
```

**Body:**
```json
{
  "token": "string",
  "newPassword": "string"
}
```

---

## Productos

### Buscar productos

```
GET /api/productos?nombre={nombre}&categoria={categoria}&limit={limit}&offset={offset}
```

**Query Params:**
- `nombre` (string, opcional): Nombre del producto a buscar
- `categoria` (string, opcional): Filtrar por categoría
- `limit` (number, opcional): Cantidad de resultados (default: 20)
- `offset` (number, opcional): Paginación (default: 0)

### Obtener detalle de un producto

```
GET /api/productos/:id
```

**Response:** Información completa del producto incluyendo historial de precios

### Crear nuevo producto

```
POST /api/productos
```

**Headers:** `Authorization: Bearer {token}` (Admin)

**Body:**
```json
{
  "nombre": "string",
  "descripcion": "string",
  "categoria": "string",
  "marca": "string",
  "codigoBarras": "string (opcional)",
  "imagen": "string (URL opcional)"
}
```

### Actualizar producto

```
PUT /api/productos/:id
```

**Headers:** `Authorization: Bearer {token}` (Admin)

**Body:** Campos a actualizar

### Eliminar producto

```
DELETE /api/productos/:id
```

**Headers:** `Authorization: Bearer {token}` (Admin)

### Obtener categorías

```
GET /api/productos/categorias
```

**Response:** Lista de todas las categorías disponibles

---

## Precios

### Obtener precios de un producto

```
GET /api/precios/producto/:productoId
```

**Response:** Lista de precios del producto en diferentes tiendas, ordenados por menor precio

### Reportar precio de un producto

```
POST /api/precios
```

**Headers:** `Authorization: Bearer {token}`

**Body:**
```json
{
  "productoId": "string",
  "tiendaId": "string",
  "precio": "number",
  "foto": "string (base64 opcional)",
  "comentario": "string (opcional)"
}
```

### Comparar precios entre tiendas

```
GET /api/precios/comparar?productoId={id}&tiendas={id1,id2,id3}
```

**Query Params:**
- `productoId` (string, requerido)
- `tiendas` (string, opcional): IDs separados por comas

### Historial de precios de un producto

```
GET /api/precios/historial/:productoId?dias={dias}
```

**Query Params:**
- `dias` (number, opcional): Últimos N días (default: 30)

### Actualizar precio reportado

```
PUT /api/precios/:id
```

**Headers:** `Authorization: Bearer {token}` (Propietario o Admin)

**Body:**
```json
{
  "precio": "number",
  "comentario": "string (opcional)"
}
```

### Eliminar reporte de precio

```
DELETE /api/precios/:id
```

**Headers:** `Authorization: Bearer {token}` (Propietario o Admin)

### Verificar precio

```
POST /api/precios/:id/verificar
```

**Headers:** `Authorization: Bearer {token}`

**Body:**
```json
{
  "correcto": "boolean"
}
```

---

## Tiendas

### Listar todas las tiendas

```
GET /api/tiendas?limit={limit}&offset={offset}
```

**Query Params:**
- `limit` (number, opcional): default 50
- `offset` (number, opcional): default 0

### Obtener detalle de una tienda

```
GET /api/tiendas/:id
```

**Response:** Información completa de la tienda + productos con precios

### Obtener tiendas cercanas

```
GET /api/tiendas/cercanas?lat={lat}&lng={lng}&radio={radio}
```

**Query Params:**
- `lat` (number, requerido): Latitud
- `lng` (number, requerido): Longitud
- `radio` (number, opcional): Radio en km (default: 5)

### Agregar nueva tienda

```
POST /api/tiendas
```

**Headers:** `Authorization: Bearer {token}` (Admin)

**Body:**
```json
{
  "nombre": "string",
  "direccion": "string",
  "latitud": "number",
  "longitud": "number",
  "telefono": "string (opcional)",
  "horario": "string (opcional)",
  "tipo": "string (supermercado, tienda, mercado, etc.)"
}
```

### Actualizar tienda

```
PUT /api/tiendas/:id
```

**Headers:** `Authorization: Bearer {token}` (Admin)

### Eliminar tienda

```
DELETE /api/tiendas/:id
```

**Headers:** `Authorization: Bearer {token}` (Admin)

---

## Reportes de Usuarios

### Reportar precio incorrecto

```
POST /api/reportes/precio
```

**Headers:** `Authorization: Bearer {token}`

**Body:**
```json
{
  "precioId": "string",
  "motivo": "string",
  "comentario": "string (opcional)"
}
```

### Ver mis reportes de precios

```
GET /api/reportes/mis-reportes
```

**Headers:** `Authorization: Bearer {token}`

### Ver todos los reportes pendientes

```
GET /api/reportes/pendientes
```

**Headers:** `Authorization: Bearer {token}` (Moderador/Admin)

### Resolver reporte

```
PUT /api/reportes/:id/resolver
```

**Headers:** `Authorization: Bearer {token}` (Moderador/Admin)

**Body:**
```json
{
  "accion": "string (aprobar, rechazar, eliminar_precio)",
  "comentario": "string (opcional)"
}
```

---

## Búsqueda

### Búsqueda global

```
GET /api/buscar?q={query}&tipo={tipo}&limit={limit}
```

**Query Params:**
- `q` (string, requerido): Término de búsqueda
- `tipo` (string, opcional): "productos", "tiendas", "todo" (default: "todo")
- `limit` (number, opcional): default 20

### Búsqueda específica de productos

```
GET /api/buscar/productos?q={query}&categoria={categoria}
```

### Búsqueda específica de tiendas

```
GET /api/buscar/tiendas?q={query}&tipo={tipo}
```

### Productos más buscados

```
GET /api/buscar/populares?limit={limit}
```

---

## Perfil de Usuario

### Obtener perfil del usuario

```
GET /api/perfil
```

**Headers:** `Authorization: Bearer {token}`

### Actualizar perfil

```
PUT /api/perfil
```

**Headers:** `Authorization: Bearer {token}`

**Body:**
```json
{
  "nombre": "string (opcional)",
  "telefono": "string (opcional)",
  "preferencias": {
    "tiendas_favoritas": ["id1", "id2"],
    "notificaciones": "boolean"
  }
}
```

### Historial de actividad

```
GET /api/perfil/actividad?limit={limit}
```

**Headers:** `Authorization: Bearer {token}`

### Precios reportados por el usuario

```
GET /api/perfil/precios-reportados
```

**Headers:** `Authorization: Bearer {token}`

### Estadísticas del usuario

```
GET /api/perfil/estadisticas
```

**Headers:** `Authorization: Bearer {token}`

**Response:** Total de reportes, verificaciones, puntuación, etc.

---

## Estadísticas y Analytics (Opcional - Fase 2)

### Productos con mayor variación de precio

```
GET /api/stats/variacion-precios
```

### Tiendas más económicas por categoría

```
GET /api/stats/tiendas-economicas?categoria={categoria}
```

### Tendencias de precios

```
GET /api/stats/tendencias?productoId={id}&periodo={dias}
```

---

## Notas Técnicas

### Autenticación

- Todas las rutas marcadas con `Authorization: Bearer {token}` requieren JWT válido
- Los tokens expiran en 24 horas
- Refresh tokens disponibles en `/api/auth/refresh`

### Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 OK | Solicitud exitosa |
| 201 Created | Recurso creado exitosamente |
| 400 Bad Request | Datos inválidos o faltantes |
| 401 Unauthorized | Token inválido o faltante |
| 403 Forbidden | Sin permisos suficientes |
| 404 Not Found | Recurso no encontrado |
| 500 Internal Server Error | Error del servidor |

### Paginación

- Las rutas con paginación usan `limit` y `offset`
- Respuesta incluye: `data`, `total`, `limit`, `offset`

### Rate Limiting

| Tipo | Límite |
|------|--------|
| Usuarios no autenticados | 100 requests/hora |
| Usuarios autenticados | 500 requests/hora |
| Endpoints de escritura | 50 requests/hora |

---

## Versión

- **Documento:** v1.0
- **Fecha:** Enero 2026
- **Equipo:** Equipo 6 - Proyecto Rapiti
- **Backend Developer:** Ciro
