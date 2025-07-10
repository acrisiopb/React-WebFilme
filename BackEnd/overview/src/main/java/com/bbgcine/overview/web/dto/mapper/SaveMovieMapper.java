package com.bbgcine.overview.web.dto.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.bbgcine.overview.entity.SaveMovie;
import com.bbgcine.overview.web.dto.SaveMovieCreateDTO;
import com.bbgcine.overview.web.dto.SaveMovieResponseDTO;

@Component
public class SaveMovieMapper {

    public static SaveMovie toSaveMovie(SaveMovieCreateDTO sDto) {
        return new ModelMapper().map(sDto, SaveMovie.class);
    }

    public static SaveMovieResponseDTO toResponse(SaveMovie entity) {
        return new ModelMapper().map(entity, SaveMovieResponseDTO.class);

    }

    public static List<SaveMovieResponseDTO> toListUserDTO(List<SaveMovie> saveM) {
        return saveM.stream()
                .map(sm -> toResponse(sm)) // aqui não pode chamar o método não-static
                .collect(Collectors.toList());
    }
}
