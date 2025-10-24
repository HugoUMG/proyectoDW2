package com.sistemacontable.controller;

import com.sistemacontable.dto.TransaccionRequest;
import com.sistemacontable.model.Transaccion;
import com.sistemacontable.model.TransaccionBitacora;
import com.sistemacontable.service.TransaccionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transacciones")
@CrossOrigin(origins = "*")
public class TransaccionController {

    private final TransaccionService transaccionService;

    public TransaccionController(TransaccionService transaccionService) {
        this.transaccionService = transaccionService;
    }

    @GetMapping
    public ResponseEntity<List<Transaccion>> listarTransacciones() {
        return ResponseEntity.ok(transaccionService.listarTransacciones());
    }

    @PostMapping
    public ResponseEntity<Transaccion> crearTransaccion(@RequestBody TransaccionRequest request) {
        return ResponseEntity.ok(transaccionService.crearTransaccion(request));
    }

    @GetMapping("/bitacora")
    public ResponseEntity<List<TransaccionBitacora>> listarBitacora() {
        return ResponseEntity.ok(transaccionService.listarBitacora());
    }
}
