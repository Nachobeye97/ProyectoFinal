
# GrammaGo!

## Descripción del Proyecto

GrammaGo! es una aplicación interactiva diseñada para ayudar a los estudiantes a mejorar su dominio del inglés mediante ejercicios de gramática. La aplicación permite a los usuarios registrarse, acceder a lecciones personalizadas, realizar ejercicios, revisar sus respuestas y seguir su progreso. 

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:

1. **Backend (GrammaGo.Server)**: Desarrollado en .NET Core, el backend se encarga de la lógica de negocio y la gestión de datos.
2. **Frontend (grammago.cliente)**: Desarrollado en React, el frontend proporciona una interfaz de usuario atractiva y fácil de usar.

### Estructura de Carpetas

- **GrammaGo.Server**
  - Controllers: Controladores de API.
  - Models: Modelos de datos.
  - Data: Gestión de la base de datos.
  - Properties: Configuraciones del proyecto.
  - Otros archivos de configuración.

- **grammago.cliente**
  - src: Código fuente de la aplicación React.
  - public: Archivos estáticos y recursos de la aplicación.
  - Otros archivos de configuración.

## Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes elementos:

- [Node.js](https://nodejs.org/) (para el frontend)
- [.NET SDK](https://dotnet.microsoft.com/download) (para el backend)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (para la base de datos)

## Instalación

### Backend

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Nachobeye97/PFG.git
   cd GrammaGo/GrammaGo.Server
