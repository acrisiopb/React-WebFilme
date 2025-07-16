// Caminho: .../src/main/java/com/bbgcine/overview/web/controller/AutenticacaoController.java
package com.bbgcine.overview.web.controller;

// Remova a importação de jakarta.servlet.http.Cookie
// Mantenha as outras importações
import com.bbgcine.overview.jwt.JwtToken;
import com.bbgcine.overview.jwt.JwtUserDetailsService;
import com.bbgcine.overview.web.dto.UserLoginDto;
import com.bbgcine.overview.web.exception.ErrorMessage;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Tag(name = "Autenticação", description = "Recurso para autenticação de API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class AutenticacaoController {

    private final JwtUserDetailsService detailsService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/auth")
    public ResponseEntity<?> authenticar(@RequestBody @Valid UserLoginDto dto, HttpServletRequest request) {
        log.info("Processo de autenticação pelo login {}", dto.getEmail());
        try {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());
            authenticationManager.authenticate(authenticationToken);
            
            // Geramos o token
            JwtToken token = detailsService.getTokenAuthenticated(dto.getEmail());
            
            // Retornamos o token diretamente no corpo da resposta
            return ResponseEntity.ok(token);

        } catch (AuthenticationException ex) {
            log.warn("Bad credentials from username '{}'", dto.getEmail());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorMessage(request, HttpStatus.UNAUTHORIZED, "Credenciais Inválidas"));
    }
}