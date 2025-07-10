package com.bbgcine.overview.web.dto.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.bbgcine.overview.entity.SaveMovie;
import com.bbgcine.overview.web.dto.SaveMovieCreateDTO;
import com.bbgcine.overview.web.dto.SaveMovieResponseDTO;
@Component
public class SaveMovieMapper {
    
    public static SaveMovie toSaveMovie(SaveMovieCreateDTO sDto){
        return new ModelMapper().map(sDto, SaveMovie.class);
    }


    public SaveMovieResponseDTO  toResponse(SaveMovie entity){
       return new ModelMapper().map(entity, SaveMovieResponseDTO.class);
        
    }
}
