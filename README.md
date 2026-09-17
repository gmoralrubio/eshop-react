# eShop — Practica final modulo Fundamentos React

Aplicacion web de compraventa de articulos de segunda mano. Permite a usuarios registrados publicar, editar, eliminar y filtrar productos por nombre, precio y etiquetas (tags). Construida con React 19, TypeScript, Tailwind CSS y daisyUI.

La API REST vive en la carpeta hermana `practica-intro-react-backend` (sparrest.js + JWT). Hay que arrancarla en `http://localhost:8000` para que el frontend funcione.

## Requisitos

- Node.js v24+ (ver `.nvmrc`)
- [sparrest.js](https://github.com/kasappeal/sparrest.js) corriendo en `localhost:8000`

## Instalacion

```bash
cp .env.example .env
npm install
npm run dev
```

El servidor de desarrollo de Vite arranca en `http://localhost:5173`.

## Backend (API REST)

El proyecto consume una API REST provista por [sparrest.js](https://github.com/kasappeal/sparrest.js), con autenticación JWT.

Los datos de prueba se encuentran en:

```bash
./data/db.json
```

Para configurarlo:

```bash
# Clonar el repositorio
git clone https://github.com/kasappeal/sparrest.js.git

# Instalar dependencias
cd sparrest.js && npm install

# Reemplazar el archivo de datos por el del proyecto
cp ../wallapop-js/data/db.json ./data/db.json

# Arrancar en el puerto 8000
npm start
```

## Variables de entorno

| Variable             | Valor de desarrollo          |
| -------------------- | ---------------------------- |
| `VITE_API_BASE_URL`  | `http://localhost:8000/api`  |
| `VITE_AUTH_BASE_URL` | `http://localhost:8000/auth` |

## Scripts

```bash
npm run dev      # Desarrollo (HMR)
npm run build    # Build de produccion
npm run preview  # Preview del build
npm run lint     # ESLint
```

## Paginas disponibles

| Ruta             | Descripcion                                   | Auth |
| ---------------- | --------------------------------------------- | ---- |
| `/`              | Listado de productos con filtros y paginacion | No   |
| `/:productId`    | Detalle de producto                           | No\* |
| `/products`      | Gestion de productos (CRUD)                   | Si   |
| `/auth/login`    | Formulario de inicio de sesion                | No   |
| `/auth/register` | Formulario de registro de usuario             | No   |

> \* Ver productos no requiere autenticacion. Para **crear, editar o eliminar** productos es necesario iniciar sesion y ser el propietario. La ruta `/products` esta protegida y redirige al login si no hay sesion activa.

## Filtros de productos

Los productos se pueden filtrar por:

- **Busqueda**: texto parcial sobre el nombre
- **Precio**: rango minimo y maximo
- **Tags**: combinacion de `tech`, `sport` y `home`. Se pueden seleccionar varios simultaneamente. Los productos tienen de 1 a 3 tags asignadas.

## Funcionamiento general

La pagina de inicio (`/`) muestra **todos los productos de todos los usuarios** sin necesidad de autenticacion. Es una vista publica de todo el catalogo disponible.

Los usuarios pueden registrarse en `/auth/register` e iniciar sesion en `/auth/login`. Una vez autenticados:

- Aparece el enlace **"My products"** en la cabecera, que da acceso a la zona de gestion de productos.
- En `/products` se pueden crear, editar y eliminar productos mediante formularios modales.
- Los formularios de creacion, edicion y eliminacion usan componentes dedicados (`ProductCreateForm`, `ProductEditForm`, `ProductDeleteForm`).

La autenticacion se gestiona mediante **JWT (Bearer token)** almacenado en `localStorage`. Los errores y notificaciones se muestran al usuario mediante un sistema de **toast**.

## Usuarios de prueba

Los datos de prueba del backend incluyen dos usuarios:

| Nombre   | Email             | Contraseña |
| -------- | ----------------- | ---------- |
| John Doe | johndoe@email.com | 123123     |
| Admin    | admin@email.com   | 123123     |

> [!NOTE]
> El backend usa `username` como campo de login, no `email`. Ambos usuarios usan su email como valor del campo `username`.

## Estructura del proyecto

```
practica-final/
├── src/
│   ├── main.tsx                   # Punto de entrada
│   ├── index.css                  # Tailwind CSS + daisyUI
│   ├── features/
│   │   ├── App/                   # Layout, router, loaders
│   │   ├── Auth/                  # Autenticacion
│   │   │   ├── context/           #   AuthContext + AuthProvider
│   │   │   ├── hooks/             #   useAuth
│   │   │   ├── services/          #   authRepository (API calls)
│   │   │   ├── types/             #   AuthState, AccessToken
│   │   │   └── views/             #   LoginPage, RegisterPage
│   │   └── Products/              # Gestion de productos
│   │       ├── components/        #   ProductCard, formularios CRUD
│   │       ├── hooks/             #   useProducts, useProductDetail
│   │       ├── services/          #   productRepository (API calls)
│   │       ├── types/             #   Product, ProductCreateDTO
│   │       ├── utils/             #   formatDate, toEuro, mapProduct
│   │       └── views/             #   ProductListPage, ProductDetailPage
│   └── shared/                    # Recursos compartidos
│       ├── components/            #   Header, Footer, Badge, Dialog, Toast
│       ├── context/               #   ToastContext + ToastProvider
│       ├── hooks/                 #   useToast
│       ├── types/                 #   Tipos compartidos
│       └── utils/                 #   parseError, parseErrorResponse
├── package.json
└── README.md
```
