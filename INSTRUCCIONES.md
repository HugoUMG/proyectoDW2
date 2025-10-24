# Sistema Contable - Instrucciones de Instalación

## Requisitos Previos
- Java 17 o superior
- Node.js y npm
- Angular CLI
- XAMPP (MySQL)
- Maven

## Configuración Base de Datos
1. Iniciar XAMPP y asegurarse que MySQL está ejecutándose
2. Abrir phpMyAdmin o MySQL Workbench
3. Ejecutar el script database/sistema_contable.sql

## Configuración Backend (Spring Boot)
1. Navegar a la carpeta backend: `cd backend`
2. Compilar el proyecto: `mvn clean install`
3. Ejecutar la aplicación: `mvn spring-boot:run`
4. El backend estará disponible en http://localhost:8080

## Configuración Frontend (Angular)
1. Navegar a la carpeta frontend: `cd frontend`
2. Instalar dependencias: `npm install`
3. Ejecutar la aplicación: `ng serve`
4. El frontend estará disponible en http://localhost:4200

## Credenciales de Acceso
- Usuario: admin
- Contraseña: password

## Estructura del Proyecto
- `/backend` - Aplicación Spring Boot
- `/frontend` - Aplicación Angular
- `/database` - Scripts de base de datos
