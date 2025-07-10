package com.bbgcine.overview.web.controller;

import java.util.List;

import org.springdoc.api.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bbgcine.overview.entity.SaveMovie;
import com.bbgcine.overview.service.SaveMovieService;
import com.bbgcine.overview.web.dto.SaveMovieCreateDTO;
import com.bbgcine.overview.web.dto.SaveMovieResponseDTO;
import com.bbgcine.overview.web.dto.UserResponseDTO;
import com.bbgcine.overview.web.dto.mapper.SaveMovieMapper;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "Movie Save", description = "Contém todas as operações necessarias aos recursos para cadastro e leitura de Id Filmes")
@RequiredArgsConstructor
@RestController
@RequestMapping("api/movie/save")
public class SaveMovieController {

    private final SaveMovieService saveMovieService;

    // Salva uma lista de filmes - ID
    @Operation(summary = "Adicioanr Id Filmes.", description = "Adicionar uma lista de filmes de um usuário.", responses = {
            @ApiResponse(responseCode = "201", description = "Recurso criado com sucesso.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = SaveMovieCreateDTO.class))),
            // @ApiResponse(responseCode = "409", description = "Filmes já cadastrado no
            // sistema.", content = @Content(mediaType = "application/json", schema =
            // @Schema(implementation = ErrorMessage.class))),
            @ApiResponse(responseCode = "422", description = "Recurso não processado por dados de entrada invalidos.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class)))
    })
    @PostMapping
    public ResponseEntity<List<SaveMovieResponseDTO>> create(@RequestBody List<SaveMovieCreateDTO> saveMovie) {
        return ResponseEntity.status(HttpStatus.CREATED).body(saveMovieService.save(saveMovie));
    }

    @Operation(summary = "Recupera todos os id Filmes.", description = "Recurso para recuperar lista de Id filmes.", responses = {
            @ApiResponse(responseCode = "200", description = "Recurso criado com sucesso.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = SaveMovieCreateDTO.class))),
            // @ApiResponse(responseCode = "409", description = "Filmes já cadastrado no
            // sistema.", content = @Content(mediaType = "application/json", schema =
            // @Schema(implementation = ErrorMessage.class))),
    })
    @GetMapping
    public ResponseEntity<List<SaveMovieResponseDTO>> searchAll() {
        List<SaveMovie> saveM = saveMovieService.getAll();
        return ResponseEntity.ok(SaveMovieMapper.toListUserDTO(saveM));
    }
}