package com.bbgcine.overview.web.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserCreateDTO {

    @JsonIgnore
    private Long id;

    @NotBlank
    private String username;

    @NotBlank
    @Email(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$", message = "Formato do e-mail está inválido")
    private String email;

    @NotBlank
    @Size(min = 6, max = 8)
    private String password;
}
