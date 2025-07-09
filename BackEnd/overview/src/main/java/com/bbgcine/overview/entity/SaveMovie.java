package com.bbgcine.overview.entity;

import java.io.Serializable;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_movie_save")
public class SaveMovie implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)    
    @Column(name = "id_tb_movie_save")
    private Long id;

    @Column(name = "tb_movie_save_moveid")
    private Long movieId; // Api ID

    @ManyToOne
    @JoinColumn(name = "tb_movie_save_fk_id_tb_user")
    private User user;
}
