# Prueba Técnica Frontend React

Este es un proyecto frontend desarrollado con React y Vite, que implementa una interfaz de usuario moderna y responsiva.

## Tecnologías Principales

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **UI Framework**: Material-UI (MUI)
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **API Client**: Axios
- **Notificaciones**: React Hot Toast
- **Alertas**: SweetAlert2
- **Estilos**: Tailwind CSS

## Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/joh0312/PruebaTecnicaFrontendReact.git
```

2. Instalar dependencias:
```bash
npm install
# o
yarn install
```

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Genera la build de producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linting del código

## Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── pages/         # Páginas de la aplicación
├── store/         # Configuración de Redux
├── styles/        # Estilos globales
├── utils/         # Funciones utilitarias
└── App.jsx        # Componente principal
```

## Variables de Entorno

El proyecto utiliza un archivo `.env` para configuraciones sensibles. Asegúrate de crear un archivo `.env` con las variables necesarias.

## Despliegue

El proyecto está configurado para ser desplegado en cualquier plataforma que soporte aplicaciones React/Vite.