# Sistema Contable Básico

Sistema para gestionar cuentas contables y generar balances generales.

## Características
- Gestión de cuentas contables
- Registro de movimientos contables
- Registro de transacciones con bitácora de nodos
- Generación de balance general
- Interfaz web con Angular
- API REST con Spring Boot
- Base de datos MySQL
- Autenticación con registro e inicio de sesión

## Novedades de esta iteración
- Se implementó un **módulo de transacciones** que actualiza los saldos de las cuentas en tiempo real.
- Cada transacción captura automáticamente el identificador y la IP del nodo que la procesó.
- Se agregó una **bitácora histórica** para auditar la distribución del tráfico entre nodos en ambientes con balanceador de carga.
- El frontend incluye un panel para registrar transacciones y visualizar la bitácora por nodo.
- Nuevo módulo de autenticación con registro y login que expone endpoints REST y una interfaz Angular para gestionar sesiones.
- Nueva documentación de despliegue multinstancia disponible en [`docs/deployment-nodos.md`](docs/deployment-nodos.md).

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
- [Nombre del integrante 1]
- [Nombre del integrante 2]
- [Nombre del integrante 3]

## Repositorio
- URL: [URL del repositorio GitHub]
