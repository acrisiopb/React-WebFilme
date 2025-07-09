package com.bbgcine.overview.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;


@Tag(name = "Movie Save - Indentificaçaõ", description = "Contém todas as operações necessarias aos recursos para cadastro, edição e leitura de Id Movie")
@RequiredArgsConstructor
@RestController
@RequestMapping("api/movie/save")
public class SaveMovieController {

    
}
