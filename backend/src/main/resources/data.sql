-- Insertar cuentas de ejemplo (valores estandarizados para Balance General)
INSERT INTO cuenta (codigo, nombre, tipo, saldo) VALUES
('1.01', 'Caja', 'ACTIVO', 5000.00),
('1.02', 'Bancos', 'ACTIVO', 15000.00),
('1.03', 'Clientes', 'ACTIVO', 8000.00),
('2.01', 'Proveedores', 'PASIVO', 7000.00),
('2.02', 'Préstamos a Largo Plazo', 'PASIVO', 10000.00),
('3.01', 'Capital Social', 'PATRIMONIO', 12000.00),
('3.02', 'Utilidades Retenidas', 'PATRIMONIO', 8000.00);

-- Insertar movimientos de ejemplo
INSERT INTO movimiento_contable (fecha, descripcion, monto, cuenta_id) VALUES
(CURRENT_DATE, 'Venta al contado', 2000.00, 1),
(CURRENT_DATE, 'Pago nómina', -1500.00, 2),
(CURRENT_DATE, 'Venta a crédito', 3500.00, 3);
