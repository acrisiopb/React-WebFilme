package com.bbgcine.overview.service;

import org.springframework.stereotype.Service;

import com.bbgcine.overview.repository.SaveMovieRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SaveMovieService {
   
   private final SaveMovieRepository saveMovieRepository;
   
   
}
