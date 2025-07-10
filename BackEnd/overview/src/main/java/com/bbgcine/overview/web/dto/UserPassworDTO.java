package com.bbgcine.overview.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserPassworDTO {

    @NotBlank
    @Size(min = 6, max = 8)
    private String currentPassword;

    @NotBlank
    @Size(min = 6, max = 8)
    private String newPassword;

    @NotBlank
    @Size(min = 6, max = 8)
    private String confirmPassword;

}
