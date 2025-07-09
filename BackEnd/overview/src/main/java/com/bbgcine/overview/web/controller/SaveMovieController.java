package com.bbgcine.overview.web.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.bbgcine.overview.service.SaveMovieService;
import com.bbgcine.overview.web.dto.SaveMovieCreateDTO;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;


@Tag(name = "Movie Save", description = "Contém todas as operações necessarias aos recursos para cadastro, edição e leitura de Id Movie")
@RequiredArgsConstructor
@RestController
@RequestMapping("api/movie/save")
public class SaveMovieController {

    private final SaveMovieService saveMovieService;


    // @PostMapping
    // public ResponseEntity<List<SaveMovieCreateDTO>> create(@RequestBody List<SaveMovieCreateDTO> saveMovie){
        
    //     List<SaveMovieCreateDTO> sMovie = saveMovieService.save(saveMovie);
    //     return ResponseEntity.status(HttpStatus.CREATED).body(sMovie);

    // }
}
