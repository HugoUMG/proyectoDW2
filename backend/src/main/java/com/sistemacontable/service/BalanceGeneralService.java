package com.sistemacontable.service;

import com.sistemacontable.model.Cuenta;
import com.sistemacontable.repository.CuentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BalanceGeneralService {
    
    @Autowired
    private CuentaRepository cuentaRepository;
    
    public Map<String, Object> generarBalanceGeneral() {
        Map<String, Object> balance = new HashMap<>();
        
        try {
            // Obtener TODAS las cuentas primero
            List<Cuenta> todasCuentas = cuentaRepository.findAll();
            
            // Inicializar listas vacías
            List<Cuenta> activos = new ArrayList<>();
            List<Cuenta> pasivos = new ArrayList<>();
            List<Cuenta> patrimonio = new ArrayList<>();
            
            // Filtrar manualmente por tipo String
            for (Cuenta cuenta : todasCuentas) {
                if (cuenta.getTipo() != null) {
                    if (cuenta.getTipo().equals("ACTIVO")) {
                        activos.add(cuenta);
                    } else if (cuenta.getTipo().equals("PASIVO")) {
                        pasivos.add(cuenta);
                    } else if (cuenta.getTipo().equals("PATRIMONIO")) {
                        patrimonio.add(cuenta);
                    }
                }
            }
            
            // Calcular totales con protección contra null
            double totalActivos = activos.stream().mapToDouble(c -> c.getSaldo()).sum();
            double totalPasivos = pasivos.stream().mapToDouble(c -> c.getSaldo()).sum();
            double totalPatrimonio = patrimonio.stream().mapToDouble(c -> c.getSaldo()).sum();
            
            // Construir respuesta
            balance.put("activos", activos);
            balance.put("pasivos", pasivos);
            balance.put("patrimonio", patrimonio);
            balance.put("totalActivos", totalActivos);
            balance.put("totalPasivos", totalPasivos);
            balance.put("totalPatrimonio", totalPatrimonio);
            balance.put("totalPasivosPatrimonio", totalPasivos + totalPatrimonio);
            balance.put("balanceVerificado", Math.abs(totalActivos - (totalPasivos + totalPatrimonio)) < 0.01);
            
        } catch (Exception e) {
            // En caso de error, retornar estructura básica
            balance.put("error", "Error: " + e.getMessage());
            balance.put("activos", new ArrayList<>());
            balance.put("pasivos", new ArrayList<>());
            balance.put("patrimonio", new ArrayList<>());
            balance.put("totalActivos", 0.0);
            balance.put("totalPasivos", 0.0);
            balance.put("totalPatrimonio", 0.0);
            balance.put("totalPasivosPatrimonio", 0.0);
            balance.put("balanceVerificado", false);
        }
        
        return balance;
    }
}