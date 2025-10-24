package com.sistemacontable.repository;

import com.sistemacontable.model.MovimientoContable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MovimientoRepository extends JpaRepository<MovimientoContable, Long> {
    List<MovimientoContable> findByCuentaId(Long cuentaId);
}
