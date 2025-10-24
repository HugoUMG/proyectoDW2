package com.sistemacontable.repository;

import com.sistemacontable.model.Cuenta;
import com.sistemacontable.model.TipoCuenta; // ✅ CORREGIDO
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CuentaRepository extends JpaRepository<Cuenta, Long> {
    List<Cuenta> findByTipo(TipoCuenta tipo); // ✅ CORREGIDO
    Cuenta findByCodigo(String codigo);
}