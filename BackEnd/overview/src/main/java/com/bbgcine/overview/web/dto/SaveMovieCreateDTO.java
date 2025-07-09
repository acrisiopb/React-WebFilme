package com.bbgcine.overview.web.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SaveMovieCreateDTO {

    @JsonIgnore
    private Long id;

    private Long movieId;

    private Long userId;
}
