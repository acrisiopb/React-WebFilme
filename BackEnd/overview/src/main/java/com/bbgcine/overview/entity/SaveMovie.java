package com.bbgcine.overview.entity;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_movie_save")
public class SaveMovie implements Serializable{

    private Long id;
    private Long movieId; // Api ID

    @ManyToOne
    @JoinColumn(name = "tb_movie_save_fk_id_tb_user")
    private User user;
}
