package com.sistemacontable.service;

import com.sistemacontable.dto.TransaccionRequest;
import com.sistemacontable.model.Cuenta;
import com.sistemacontable.model.Transaccion;
import com.sistemacontable.model.TransaccionBitacora;
import com.sistemacontable.repository.CuentaRepository;
import com.sistemacontable.repository.TransaccionBitacoraRepository;
import com.sistemacontable.repository.TransaccionRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransaccionService {
    private final TransaccionRepository transaccionRepository;
    private final TransaccionBitacoraRepository bitacoraRepository;
    private final CuentaRepository cuentaRepository;

    @Value("${node.identifier:node-1}")
    private String nodeIdentifier;

    public TransaccionService(TransaccionRepository transaccionRepository,
                              TransaccionBitacoraRepository bitacoraRepository,
                              CuentaRepository cuentaRepository) {
        this.transaccionRepository = transaccionRepository;
        this.bitacoraRepository = bitacoraRepository;
        this.cuentaRepository = cuentaRepository;
    }

    public List<Transaccion> listarTransacciones() {
        return transaccionRepository.findAll();
    }

    public List<TransaccionBitacora> listarBitacora() {
        return bitacoraRepository.findAll();
    }

    @Transactional
    public Transaccion crearTransaccion(TransaccionRequest request) {
        Cuenta cuenta = cuentaRepository.findById(request.getCuentaId())
                .orElseThrow(() -> new IllegalArgumentException("Cuenta no encontrada"));

        String ip = obtenerIpDelNodo();

        Transaccion transaccion = new Transaccion();
        transaccion.setCuenta(cuenta);
        transaccion.setDescripcion(request.getDescripcion());
        transaccion.setMonto(request.getMonto());
        transaccion.setFecha(LocalDateTime.now());
        transaccion.setNodoId(nodeIdentifier);
        transaccion.setNodoIp(ip);

        Transaccion guardada = transaccionRepository.save(transaccion);

        cuenta.setSaldo(cuenta.getSaldo() + request.getMonto());
        cuentaRepository.save(cuenta);

        TransaccionBitacora bitacora = new TransaccionBitacora();
        bitacora.setTransaccion(guardada);
        bitacora.setDetalle(String.format("Transacción '%s' registrada para la cuenta %s (%s)",
                request.getDescripcion(), cuenta.getNombre(), cuenta.getCodigo()));
        bitacora.setNodoId(nodeIdentifier);
        bitacora.setNodoIp(ip);
        bitacora.setFechaRegistro(LocalDateTime.now());
        bitacoraRepository.save(bitacora);

        return guardada;
    }

    private String obtenerIpDelNodo() {
        try {
            return InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            return "0.0.0.0";
        }
    }
}
