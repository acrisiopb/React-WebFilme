// Caminho: BackEnd/overview/src/main/java/com/bbgcine/overview/jwt/JwtAuthorizationFilter.java
package com.bbgcine.overview.jwt;

import java.io.IOException;
import java.util.Arrays;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final JwtUserDetailsService detailsService;
    private static final String COOKIE_NAME = "@bbg";

    public JwtAuthorizationFilter(JwtUserDetailsService detailsService) {
        this.detailsService = detailsService;
    }

    private String getTokenFromRequest(HttpServletRequest request) {
        final String header = request.getHeader(JwtUtils.JWT_AUTHORIZATION);
        if (header != null && header.startsWith(JwtUtils.JWT_BEARER)) {
            return header.substring(JwtUtils.JWT_BEARER.length());
        }
        if (request.getCookies() != null) {
            return Arrays.stream(request.getCookies())
                    .filter(cookie -> COOKIE_NAME.equals(cookie.getName()))
                    .map(Cookie::getValue)
                    .findFirst()
                    .orElse(null);
        }
        return null;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws IOException, ServletException {
        final String token = getTokenFromRequest(request);
        if (token == null) {
            filterChain.doFilter(request, response);
            return;
        }
        if (!JwtUtils.isTokenValid(token)) {
            log.warn("JWT token está inválido ou expirado.");
            filterChain.doFilter(request, response);
            return;
        }
        String username = JwtUtils.getUsernameFromToken(token);
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            toAuthentication(request, username);
        }
        filterChain.doFilter(request, response);
    }

    private void toAuthentication(HttpServletRequest request, String username) {
        UserDetails userDetails = detailsService.loadUserByUsername(username);
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities()
        );
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        log.info(">>>> SUCESSO: Usuário '{}' autenticado via token e definido no contexto de segurança.", username);
    }
}