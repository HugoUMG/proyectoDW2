package com.sistemacontable.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "movimiento_contable")
public class MovimientoContable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Temporal(TemporalType.DATE)
    private Date fecha;
    
    private String descripcion;
    private double monto;
    
    @ManyToOne
    @JoinColumn(name = "cuenta_id")
    private Cuenta cuenta;
    
    public MovimientoContable() {}
    
    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Date getFecha() { return fecha; }
    public void setFecha(Date fecha) { this.fecha = fecha; }
    
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    
    public double getMonto() { return monto; }
    public void setMonto(double monto) { this.monto = monto; }
    
    public Cuenta getCuenta() { return cuenta; }
    public void setCuenta(Cuenta cuenta) { this.cuenta = cuenta; }
}
