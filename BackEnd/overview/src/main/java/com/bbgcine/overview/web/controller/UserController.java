package com.bbgcine.overview.web.controller;

import org.springdoc.api.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bbgcine.overview.entity.User;
import com.bbgcine.overview.service.UserService;
import com.bbgcine.overview.web.dto.UserCreateDTO;
import com.bbgcine.overview.web.dto.UserResponseDTO;
import com.bbgcine.overview.web.dto.mapper.UserMapper;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Tag(name = "Usuário", description = "Contém todas as operações relativas aos recurso para cadastro, edição e leitura de um usuário.")
@RestController
@RequestMapping("api/register")
public class UserController {
    private final UserService userService;

    @Operation(summary = "Criar um novo usuário.", description = "Recurso para criar um novo usuário.", responses = {
            @ApiResponse(responseCode = "201", description = "Recurso criado com sucesso.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResponseDTO.class))),
            @ApiResponse(responseCode = "409", description = "Usuário e-mail já cadastrado no sistema.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class))),
            @ApiResponse(responseCode = "422", description = "Recurso não processado por dados de entrada invalidos.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class)))
    })
    @PostMapping
    public ResponseEntity<UserResponseDTO> create(@RequestBody UserCreateDTO createDTO) throws Exception {
        User savedUser = userService.save(UserMapper.toUser(createDTO));
        UserResponseDTO responseDTO = UserMapper.toUserResponseDTO(savedUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

}
