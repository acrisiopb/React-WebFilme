package com.bbgcine.overview.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_user")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tb_user")
    protected Long id;
    @Column(name = "tb_user_username", nullable = false, unique = false, length = 100)
    private String username;
    @Column(name = "tb_user_email", nullable = false, unique = true, length = 100)
    private String email;
    @Column(name = "tb_user_password", nullable = false, length = 200)
    private String Password;

    // Auditoria
    @Column(name = "tb_user_creationDate")
    private LocalDateTime creationDate;
    @Column(name = "tb_user_modificationDate")
    private LocalDateTime modificationDate;
    @Column(name = "tb_user_creatorBy")
    private String creatorBy;
    @Column(name = "tb_user_modificationBy")
    private String modificationBy;

}
