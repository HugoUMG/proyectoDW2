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

## Novedades de esta iteración
- Se implementó un **módulo de transacciones** que actualiza los saldos de las cuentas en tiempo real.
- Cada transacción captura automáticamente el identificador y la IP del nodo que la procesó.
- Se agregó una **bitácora histórica** para auditar la distribución del tráfico entre nodos en ambientes con balanceador de carga.
- El frontend incluye un panel para registrar transacciones y visualizar la bitácora por nodo.
- Nueva documentación de despliegue multinstancia disponible en [`docs/deployment-nodos.md`](docs/deployment-nodos.md).

## Integrantes del Proyecto
- [Nombre del integrante 1]
- [Nombre del integrante 2]
- [Nombre del integrante 3]

## Repositorio
- URL: [URL del repositorio GitHub]
