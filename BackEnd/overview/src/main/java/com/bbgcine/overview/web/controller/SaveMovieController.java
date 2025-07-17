package com.bbgcine.overview.web.controller;

import java.util.List;

import org.springdoc.api.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bbgcine.overview.entity.SaveMovie;
import com.bbgcine.overview.jwt.JwtUserDetails;
import com.bbgcine.overview.service.SaveMovieService;
import com.bbgcine.overview.web.dto.SaveMovieCreateDTO;
import com.bbgcine.overview.web.dto.SaveMovieResponseDTO;
import com.bbgcine.overview.web.dto.mapper.SaveMovieMapper;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "Movie Save", description = "Contém todas as operações necessarias aos recursos para cadastro e leitura de Id Filmes")
@RequiredArgsConstructor
@RestController
@RequestMapping("api/movie/save")
@Slf4j
public class SaveMovieController {

    private final SaveMovieService saveMovieService;

    // Salva uma lista de filmes - ID
    @Operation(summary = "Adicioanr Id Filmes.", description = "Adicionar uma lista de filmes de um usuário.", security = @SecurityRequirement(name = "security"), responses = {
            @ApiResponse(responseCode = "201", description = "Recurso criado com sucesso.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = SaveMovieCreateDTO.class))),
            @ApiResponse(responseCode = "409", description = "Filmes já cadastrado no sistema.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class))),
            @ApiResponse(responseCode = "403", description = "É necessario ter um Bearer Token Válido", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class))),
            @ApiResponse(responseCode = "422", description = "Recurso não processado por dados de entrada invalidos.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class)))
    })
    @PostMapping
    public ResponseEntity<List<SaveMovieResponseDTO>> create(@RequestBody List<SaveMovieCreateDTO> saveMovie,
            @AuthenticationPrincipal JwtUserDetails currentUser) {
        log.info("Recebida requisição para salvar filmes. Payload recebido: {}", saveMovie);
        // Validação de segurança
        if (currentUser == null || currentUser.getId() == null) {
            log.error("Tentativa de salvar filmes sem um usuário autenticado.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // 5. Garantimos a segurança: usamos o ID do usuário autenticado (do token)
        // e ignoramos qualquer userId que o front-end possa ter enviado.
        Long authenticatedUserId = currentUser.getId();
        saveMovie.forEach(dto -> dto.setUserId(authenticatedUserId));

        log.info("Payload final sendo enviado para o serviço (com userId do token): {}", saveMovie);

        // 6. Enviamos a lista corrigida e segura para o serviço
        List<SaveMovieResponseDTO> savedMovies = saveMovieService.save(saveMovie);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMovies);
    }

    @Operation(summary = "Recupera todos os id Filmes.", description = "Recurso para recuperar lista de Id filmes.", security = @SecurityRequirement(name = "security"), responses = {
            @ApiResponse(responseCode = "200", description = "Recurso criado com sucesso.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = SaveMovieCreateDTO.class))),
            @ApiResponse(responseCode = "403", description = "É necessario ter um Bearer Token Válido", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class))),
            @ApiResponse(responseCode = "403", description = "É necessario ter um Bearer Token Válido", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class))),

    })
    @GetMapping
    public ResponseEntity<List<SaveMovieResponseDTO>> searchAll(@AuthenticationPrincipal JwtUserDetails currentUser) {
        List<SaveMovie> saveM = saveMovieService.getAll(currentUser);
        return ResponseEntity.ok(SaveMovieMapper.toListUserDTO(saveM));
    }

    @Operation(summary = "Deleta filme por movieId (TMDB)", description = "Recurso para deletar filme usando o ID do filme externo (TMDB).", security = @SecurityRequirement(name = "security"), responses = {
            @ApiResponse(responseCode = "204", description = "Filme deletado com sucesso."),
            @ApiResponse(responseCode = "403", description = "Token inválido ou ausente."),
            @ApiResponse(responseCode = "404", description = "Filme não encontrado.")
    })
    @DeleteMapping("/{movieId}")
    public ResponseEntity<Void> deleteByMovieId(@PathVariable Long movieId,
                                                @AuthenticationPrincipal JwtUserDetails currentUser) {
        // CORREÇÃO: Chame o serviço que deleta pelo ID do filme (TMDB)
        saveMovieService.deleteByMovieId(movieId, currentUser);
        return ResponseEntity.noContent().build();
    }

}