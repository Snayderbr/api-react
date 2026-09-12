# IUDigital - API REST + React

Proyecto completo del caso de estudio de Películas y Series.

## Backend
Node.js + Express + Sequelize + SQLite.

```bash
npm install
npm run seed
npm run dev
```

API: http://localhost:3000

## Frontend
ReactJS + Vite.

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

Luego abre la URL que muestre Vite, normalmente http://localhost:5173.

El frontend consume:
- `/api/generos`
- `/api/directores`
- `/api/productoras`
- `/api/tipos`
- `/api/medias`

React se comunica con la API mediante `fetch`. Sequelize permanece en el backend para manejar SQLite.

## Nota
La base `database.sqlite` se crea automáticamente al iniciar el backend. `npm run seed` carga datos iniciales.
