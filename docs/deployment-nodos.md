# Arquitectura con balanceador y nodos redundantes

Este documento resume la estrategia empleada para desplegar el sistema contable en un escenario con **balanceo de carga** y **dos nodos de aplicación** que ejecutan exactamente el mismo artefacto. También se describe la bitácora que permite auditar en qué nodo fue atendida cada transacción registrada en el sistema.

## 1. Componentes principales

```
                        ┌──────────────────────┐
                        │      Usuarios        │
                        └─────────┬────────────┘
                                  │ HTTPS
                        ┌─────────▼────────────┐
                        │  Balanceador (Nginx) │
                        └─────────┬────────────┘
                      Round Robin │
        ┌─────────────────────────┴─────────────────────────┐
        │                                                   │
┌───────▼────────┐                                   ┌──────▼────────┐
│  Nodo A        │                                   │  Nodo B        │
│ Backend 8080   │                                   │ Backend 8080   │
│ Frontend 4200  │                                   │ Frontend 4200  │
│ node.identifier│                                   │ node.identifier│
│ = "node-a"     │                                   │ = "node-b"     │
└───────┬────────┘                                   └──────┬────────┘
        │ JDBC                                                │ JDBC
        └────────────┬────────────────────────────────────────┘
                     │
           ┌─────────▼───────────┐
           │  Base de datos SQL  │
           └─────────────────────┘
```

### Balanceador de carga
- **Tecnología sugerida:** Nginx o HAProxy.
- **Algoritmo:** *Round Robin* simple.
- **Salud de nodos:** revisar con `proxy_pass` y `max_fails` / `fail_timeout` para sacar nodos fuera de rotación.

### Nodos de aplicación
- Son instancias idénticas del backend Spring Boot y del frontend Angular.
- Cada nodo define una variable de entorno `NODE_IDENTIFIER` distinta (por ejemplo, `node-a` y `node-b`).
- Ambos nodos apuntan a la misma base de datos MySQL, lo que permite compartir estado persistente.

## 2. Configuración del identificador de nodo

El backend ahora expone la propiedad `node.identifier`. Si se omite, toma el valor por defecto `node-1`. Para distinguir los nodos se recomienda:

```bash
# Nodo A
export NODE_IDENTIFIER=node-a
java -jar backend.jar

# Nodo B
export NODE_IDENTIFIER=node-b
java -jar backend.jar
```

En Spring Boot la variable se mapea automáticamente si se ejecuta como `NODE_IDENTIFIER`, `node.identifier` en un archivo `application-node.properties` o usando parámetros `--node.identifier=node-a`.

## 3. Bitácora de transacciones por nodo

- Cada alta de transacción genera un registro en la tabla `transaccion` con los campos `nodo_id` e `nodo_ip`.
- Adicionalmente se inserta una entrada en la tabla `transaccion_bitacora` que conserva la hora exacta, el nodo responsable y un texto descriptivo.
- El frontend muestra tanto las transacciones como la bitácora para visualizar el reparto de carga en tiempo real.

## 4. Flujo de implementación

1. **Provisionar nodos**: dos máquinas (o contenedores) con Java 17+, Node.js y acceso a la base de datos.
2. **Configurar balanceador**: distribuir tráfico HTTP/HTTPS entrante hacia ambos nodos (ejemplo con Nginx):

   ```nginx
   upstream dw2_app {
     server 10.0.0.10:8080 max_fails=3 fail_timeout=30s;
     server 10.0.0.11:8080 max_fails=3 fail_timeout=30s;
   }

   server {
     listen 80;
     server_name sistema.contable.demo;

     location /api/ {
       proxy_pass http://dw2_app;
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
     }

     location / {
       proxy_pass http://dw2_frontend;
     }
   }

   upstream dw2_frontend {
     server 10.0.0.10:4200;
     server 10.0.0.11:4200;
   }
   ```

3. **Desplegar backend y frontend** en ambos nodos, apuntando al mismo origen de datos.
4. **Definir `NODE_IDENTIFIER`** distinto en cada nodo y reiniciar los servicios.
5. **Verificar** registrando transacciones desde el frontend y observando que la bitácora alterna entre nodos.

## 5. Consideraciones adicionales

- **Escalamiento:** se pueden añadir más nodos repitiendo el proceso y dándoles identificadores únicos.
- **Observabilidad:** la bitácora en base de datos puede exportarse a un SIEM o a un dashboard de monitoreo.
- **Tolerancia a fallos:** si un nodo cae, el balanceador lo excluye y las transacciones seguirán registrándose en los nodos restantes.
- **Persistencia compartida:** la base de datos debe ser altamente disponible (por ejemplo, MySQL en modo réplica primaria-secundaria).

Esta documentación sirve como guía rápida para replicar la arquitectura y comprobar el cumplimiento del requerimiento de balanceo y trazabilidad de nodos.
