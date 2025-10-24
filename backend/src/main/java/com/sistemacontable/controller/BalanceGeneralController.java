package com.sistemacontable.controller;

import com.sistemacontable.service.BalanceGeneralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/balance")
@CrossOrigin(origins = "*") // ✅ Permitir CORS
public class BalanceGeneralController {
    
    @Autowired
    private BalanceGeneralService balanceService;
    
    @GetMapping
    public Map<String, Object> obtenerBalanceGeneral() {
        return balanceService.generarBalanceGeneral();
    }
}