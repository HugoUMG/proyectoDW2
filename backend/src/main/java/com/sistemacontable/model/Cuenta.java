package com.sistemacontable.model;

import jakarta.persistence.*;

@Entity
@Table(name = "cuenta")
public class Cuenta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String codigo;
    
    @Column(nullable = false)
    private String nombre;
    
    @Column(nullable = false)
    private String tipo; // ACTIVO, PASIVO, PATRIMONIO
    
    @Column(nullable = false)
    private double saldo;
    
    // ✅ CAMBIAR a Integer (objeto) en lugar de int (primitivo)
    private Integer nivel; // Puede ser null
    
    // ✅ AGREGAR campo para código completo (opcional)
    private String codigoCompleto;
    
    // Constructores
    public Cuenta() {}
    
    public Cuenta(String codigo, String nombre, String tipo, double saldo) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.tipo = tipo;
        this.saldo = saldo;
    }
    
    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getCodigo() { return codigo; }
    public void setCodigo(String codigo) { this.codigo = codigo; }
    
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    
    public double getSaldo() { return saldo; }
    public void setSaldo(double saldo) { this.saldo = saldo; }
    
    // ✅ Usar Integer en lugar de int
    public Integer getNivel() { return nivel; }
    public void setNivel(Integer nivel) { this.nivel = nivel; }
    
    public String getCodigoCompleto() { return codigoCompleto; }
    public void setCodigoCompleto(String codigoCompleto) { this.codigoCompleto = codigoCompleto; }
}