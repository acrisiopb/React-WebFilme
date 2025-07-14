package com.bbgcine.overview.jwt;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.bbgcine.overview.entity.User;
import com.bbgcine.overview.exception.EntityNotFoundException;
import com.bbgcine.overview.service.UserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class JwtUserDetailsService implements UserDetailsService {

    private final UserService usuarioService;

    @Override
    public UserDetails loadUserByUsername(String email) throws EntityNotFoundException {
        User usuario = usuarioService.searchEmail(email);
        return new JwtUserDetails(usuario); // Corrigido para retornar o usuário encontrado
    }

    public JwtToken getTokenAuthenticated(String email) {
        // Você pode adicionar a role do usuário aqui se necessário
        String role = "USER"; // Exemplo, você pode buscar a role do usuário
        return JwtUtils.createToken(email, role);
    }
}