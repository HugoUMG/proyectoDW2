# Sistema Contable Básico

Sistema para gestionar cuentas contables y generar balances generales.

## Características
- Gestión de cuentas contables y catálogo jerárquico de cuentas.
- Registro de movimientos contables vinculados a transacciones.
- Bitácora de distribución por nodo para entornos balanceados.
- Generación de balance general y reportes auxiliares.
- Interfaz web con Angular.
- API REST con Spring Boot.
- Persistencia con base de datos H2 embebida para desarrollo.
- Autenticación con registro e inicio de sesión.

## Novedades de esta iteración
- Se implementó un **módulo de transacciones** que actualiza los saldos de las cuentas en tiempo real.
- Cada transacción captura automáticamente el identificador y la IP del nodo que la procesó.
- Se agregó una **bitácora histórica** para auditar la distribución del tráfico entre nodos en ambientes con balanceador de carga.
- El frontend incluye un panel para registrar transacciones y visualizar la bitácora por nodo.
- Nuevo módulo de autenticación con registro y login que expone endpoints REST y una interfaz Angular para gestionar sesiones.
- Nueva documentación de despliegue multinstancia disponible en [`docs/deployment-nodos.md`](docs/deployment-nodos.md).

## Estructura del proyecto

```text
.
├── backend/                     # API REST con Spring Boot
│   ├── pom.xml                  # Gestión de dependencias Maven
│   ├── src/
│   │   ├── main/java/com/sistemacontable/
│   │   │   ├── config/          # Configuración (seguridad, beans comunes)
│   │   │   ├── controller/      # Controladores REST
│   │   │   ├── dto/             # Objetos de transferencia de datos
│   │   │   ├── model/           # Entidades JPA
│   │   │   ├── repository/      # Repositorios Spring Data
│   │   │   └── service/         # Lógica de negocio
│   │   └── main/resources/
│   │       ├── application.properties   # Configuración del backend
│   │       └── data.sql                  # Datos iniciales de la base H2
│   └── data/                   # Carpeta generada para el archivo de base de datos H2
├── frontend/                    # Cliente Angular
│   ├── package.json             # Dependencias de Node.js
│   ├── angular.json             # Configuración Angular CLI
│   └── src/                     # Código fuente del frontend
├── docs/                        # Documentación adicional (balanceo por nodos, diagramas)
│   └── deployment-nodos.md
├── README.md                    # Este documento
└── INSTRUCCIONES.md             # Guía rápida interna del equipo
```

> **Nota:** Al ejecutar el backend por primera vez se crea automáticamente la carpeta `backend/data/` que contiene el archivo de base de datos `sistema_contable.mv.db`. Añade esta carpeta al control de versiones solo si deseas compartir datos de ejemplo; de forma predeterminada está excluida mediante `.gitignore`.

## Requisitos previos

- **Backend:** Java 17+, Maven 3.9+, conexión HTTP para descargar dependencias.
- **Frontend:** Node.js 18+ y Angular CLI 16+.
- **Base de datos:** Ninguna instalación externa requerida; se usa H2 embebida.

## Puesta en marcha

1. **Backend**
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   El servicio expone la API en `http://localhost:8080/api`. El archivo de base de datos se guarda en `backend/data/sistema_contable.mv.db`.

2. **Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   La interfaz estará disponible en `http://localhost:4200/` y se comunica con el backend vía `/api`.

## Administración de la base de datos H2

- **URL JDBC:** `jdbc:h2:file:./data/sistema_contable`
- **Usuario:** `sa`
- **Contraseña:** _(vacía)_
- **Consola web:** habilitada en `http://localhost:8080/h2-console`. Ingresa la URL JDBC anterior y las credenciales para inspeccionar tablas y ejecutar consultas SQL.
- **Ubicación de archivos:** `backend/data/` se crea relativo al directorio de ejecución del backend. Copia esa carpeta para respaldar o trasladar la base de datos.
- **Respaldo manual:** detén el backend, duplica la carpeta `backend/data/` y almacénala de forma segura. Para restaurar, reemplaza el contenido existente antes de reiniciar la aplicación.
- **Inicialización de datos:** `backend/src/main/resources/data.sql` define usuarios, catálogos y datos contables base. Se ejecuta automáticamente cada vez que la base está vacía.

> Para ambientes compartidos o de producción se recomienda migrar a una base relacional externa (por ejemplo, MySQL o PostgreSQL) que permita acceso concurrente desde múltiples nodos.

## Funcionamiento por nodos y balanceo de carga

- El backend expone la propiedad `node.identifier`, que identifica el nodo que procesó cada transacción. Si no se define, toma el valor `node-1`.
- Cada registro en las tablas de transacciones incluye el nodo (`nodo_id`) y la dirección IP (`nodo_ip`).
- El frontend muestra en tiempo real la bitácora de nodos para auditar la distribución de carga.
- Para simular múltiples nodos en local puedes ejecutar varias instancias del backend configurando la variable de entorno:
  ```bash
  NODE_IDENTIFIER=node-a mvn spring-boot:run
  NODE_IDENTIFIER=node-b mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Dserver.port=8081"
  ```
- Consulta la guía detallada en [`docs/deployment-nodos.md`](docs/deployment-nodos.md) para desplegar la solución detrás de un balanceador como Nginx.

## Guardar y compartir la base de datos entre nodos

- La base H2 embebida está pensada para desarrollo local o demos. Cada nodo debería tener su propia copia para evitar bloqueos concurrentes.
- Si necesitas compartir estado entre nodos balanceados, migra a un motor externo y apunta `spring.datasource.url` al servidor centralizado.
- Para transferir datos del H2 embebido a otro motor puedes exportar el esquema y datos desde la consola con:
  ```sql
  SCRIPT TO 'backup.sql';
  ```
  Luego importa el script en el motor de destino.
- En despliegues de laboratorio, sincroniza manualmente las carpetas `backend/data/` entre nodos antes de iniciar los servicios.

## Credenciales por defecto
- Usuario: `admin`
- Contraseña: `admin123`

## Escenario del ciclo contable
- Empresa de referencia: **Almacén «El Planeador»**, propiedad de Horacio Porras. Inicia operaciones el 1 de enero de 2024 como MIPYME dedicada a la compra y venta de mercaderías.
- **Saldos iniciales:** Efectivo Q381,000 · Cuenta bancaria Q68,000 · Mercaderías Q78,000 · Mobiliario y equipo Q26,000 · Proveedores Q37,000 · Letras de cambio Q8,000 · Capital Q448,000.
- **Movimientos del período:** operaciones bancarias (depósitos, pago de alquiler, pago a proveedores), ventas al contado y a crédito, compras mixtas y gastos operativos. Inventario final Q86,000.
- **Libros contables soportados:** registro de transacciones en Libro Diario, traslado automático al Libro Mayor y balance de comprobación con alertas de cuadratura.
- **Estados financieros generados:** Balance General, Estado de Resultados y comparativos mensuales.
- **Extras proyectados para MIPYMES:** módulos de inventario, bancos y caja, clientes y proveedores, reportes descargables y perfiles multiusuario.

## Integrantes del Proyecto
HUGO EMMANUEL RIVERA GUZMAN - 1490-22-16766
ALFREDO JOSELITO VICENTE GARCIA 1490-22-13637
BEATRÍZ VICENTE JIMÉNEZ, 1490-16-2739
BOANERGES ISRAEL OCHOA MARROQUIN 1490-17-14754
