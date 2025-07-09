package com.bbgcine.overview.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bbgcine.overview.entity.SaveMovie;
import com.bbgcine.overview.entity.User;
import com.bbgcine.overview.repository.SaveMovieRepository;
import com.bbgcine.overview.repository.UserRepository;
import com.bbgcine.overview.web.dto.SaveMovieCreateDTO;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SaveMovieService {

    private final SaveMovieRepository saveMovieRepository;
    private final UserRepository userRepository;

    // public List<SaveMovieCreateDTO> save(List<SaveMovieCreateDTO> saveMoveDTOs) {
    //     List<SaveMovie> entities = saveMoveDTOs.stream().map(dto -> {
    //         User user = userRepository.findById(dto.getUserId())
    //                 .orElseThrow(() -> new RuntimeException("user not found"));

    //         SaveMovie movie = new SaveMovie();
    //         movie.setMovieId(dto.getMovieId());
    //         movie.setUser(user);
    //         return movie;
    //     }).toList();

    //     List<SaveMovie> saved = saveMovieRepository.saveAll(entities);

    //     return saved.stream().map(entity -> {
    //         SaveMovieCreateDTO dto = new SaveMovieCreateDTO();
    //         dto.setMovieId(entity.getUser().getId());
    //         return dto;
    //     }).toList();
    // }

}
