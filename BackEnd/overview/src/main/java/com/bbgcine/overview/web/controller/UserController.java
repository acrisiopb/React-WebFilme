package com.bbgcine.overview.web.controller;

import java.util.List;

import org.springdoc.api.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bbgcine.overview.entity.User;
import com.bbgcine.overview.jwt.JwtUserDetails;
import com.bbgcine.overview.service.UserService;
import com.bbgcine.overview.web.dto.UserCreateDTO;
import com.bbgcine.overview.web.dto.UserPassworDTO;
import com.bbgcine.overview.web.dto.UserResponseDTO;
import com.bbgcine.overview.web.dto.mapper.UserMapper;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Tag(name = "Usuário", description = "Contém todas as operações relativas aos recurso para cadastro, edição e leitura de um usuário.")
@RestController
@RequestMapping("api/register")
public class UserController {

    private final UserService userService;

    // CRIAR USUARIO
    @Operation(summary = "Criar um novo usuário.", description = "Recurso para criar um novo usuário.", responses = {
            @ApiResponse(responseCode = "201", description = "Recurso criado com sucesso.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResponseDTO.class))),
            @ApiResponse(responseCode = "409", description = "Usuário e-mail já cadastrado no sistema.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class))),
            @ApiResponse(responseCode = "422", description = "Recurso não processado por dados de entrada invalidos.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class)))
    })
    @PostMapping
    public ResponseEntity<UserResponseDTO> create(@Valid @RequestBody UserCreateDTO createDTO) throws Exception {
        User savedUser = userService.save(UserMapper.toUser(createDTO));
        UserResponseDTO responseDTO = UserMapper.toUserResponseDTO(savedUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    // BUSCAR TODOS OS USUARIOS
    @Operation(summary = "Lista todos os usuários.", description = "", security = @SecurityRequirement(name = "security"), responses = {
            @ApiResponse(responseCode = "200", description = "Usuários recuperado com sucesso.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResponseDTO.class))),
            @ApiResponse(responseCode = "403", description = "É necessario ter um Bearer Token Válido", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class))),

    })
    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAll() {
        List<User> users = userService.searchAll();
        return ResponseEntity.ok(UserMapper.toListUserDTO(users));
    }

    // BUSCAR USUARIO POR ID
    @Operation(summary = "Localizar usuario.", description = "Recurso para localizar um usuário pelo ID.", security = @SecurityRequirement(name = "security"), responses = {

            @ApiResponse(responseCode = "200", description = "Recurso localizado com sucesso.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResponseDTO.class))),

            @ApiResponse(responseCode = "404", description = "Usuario não encontrado.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class))),

            @ApiResponse(responseCode = "403", description = "É necessario ter um Bearer Token Válido", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class)))

    })
    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getById(@AuthenticationPrincipal JwtUserDetails currentUser) {
        User user = userService.searchById(currentUser.getId());
        return ResponseEntity.ok(UserMapper.toUserResponseDTO(user));
    }

    // ALTERAR PASSWORD
    @Operation(summary = "Atualizar senha.", description = "", security = @SecurityRequirement(name = "security"), responses = {

            @ApiResponse(responseCode = "204", description = "Senha atualizada com sucesso.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Void.class))),

            @ApiResponse(responseCode = "400", description = "Senha não confere.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class))),

            @ApiResponse(responseCode = "404", description = "Recurso não encontrado.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class))),

            @ApiResponse(responseCode = "403", description = "É necessario ter um Bearer Token Válido", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class))),

            @ApiResponse(responseCode = "422", description = "Erro de validação nos campos enviados. Verifique os detalhes e tente novamente.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class))),
    })

    @PatchMapping
    public ResponseEntity<Void> updatePassword(@Valid @RequestBody UserPassworDTO dto,
            @AuthenticationPrincipal JwtUserDetails currentUser) {
        userService.updatePass(currentUser, dto.getCurrentPassword(), dto.getNewPassword(), dto.getConfirmPassword());
        return ResponseEntity.noContent().build();
    }

}
