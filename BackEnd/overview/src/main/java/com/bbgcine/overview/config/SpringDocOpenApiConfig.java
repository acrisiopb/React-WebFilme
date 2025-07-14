package com.bbgcine.overview.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SpringDocOpenApiConfig {
    
    @Bean
    public OpenAPI openAPI(){
        return new OpenAPI()
        .components(new Components().addSecuritySchemes("security", securityScheme() ))
        .info(
            new Info()
            .title("REST API - BBG Cine OverView")
            .description("API para controle de sessão de usuario e salvamento de preferência")
            .version("1.0v")
            .license(new License().name("Github | Api - BBG").url("https://github.com/acrisiopb/React-WebFilme"))
            .contact(new Contact().name("Acrísio Cruz").url("https://www.linkedin.com/in/acrisio-cruz-910261243/"))
        );
    }


     private SecurityScheme securityScheme(){
        return new SecurityScheme()
        .description("Insira um bearer token valido para prosseguir")
        .type(SecurityScheme.Type.HTTP)
        .in(SecurityScheme.In.HEADER)
        .scheme("bearer")
        .bearerFormat("JWT")
        .name("security");
    } 
}
