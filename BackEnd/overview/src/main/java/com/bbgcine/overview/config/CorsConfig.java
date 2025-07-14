package com.bbgcine.overview.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer{
 
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Aplica a todos os endpoints
            .allowedOrigins("http://localhost:3000") // Permite requisições desta origem
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "TRACE", "CONNECT") // Métodos HTTP permitidos
            .allowedHeaders("*") // Permite todos os cabeçalhos
            .allowCredentials(true); // Permite credenciais (cookies, etc.)
    }
}
