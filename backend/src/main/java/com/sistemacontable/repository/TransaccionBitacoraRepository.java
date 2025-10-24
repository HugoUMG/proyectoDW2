package com.sistemacontable.repository;

import com.sistemacontable.model.TransaccionBitacora;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransaccionBitacoraRepository extends JpaRepository<TransaccionBitacora, Long> {
}
