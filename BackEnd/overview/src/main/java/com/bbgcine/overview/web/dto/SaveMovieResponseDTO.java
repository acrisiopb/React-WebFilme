package com.bbgcine.overview.web.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SaveMovieResponseDTO {

    private Long id;

    private Long movieId;

    private Long userId;
}
