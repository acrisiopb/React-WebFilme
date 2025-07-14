package com.bbgcine.overview.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bbgcine.overview.entity.SaveMovie;
import com.bbgcine.overview.entity.User;
import com.bbgcine.overview.exception.EntityNotFoundException;
import com.bbgcine.overview.repository.SaveMovieRepository;
import com.bbgcine.overview.repository.UserRepository;
import com.bbgcine.overview.web.dto.SaveMovieCreateDTO;
import com.bbgcine.overview.web.dto.SaveMovieResponseDTO;
import com.bbgcine.overview.web.dto.mapper.SaveMovieMapper;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SaveMovieService {

    private final SaveMovieRepository saveMovieRepository;
    private final UserRepository userRepository;
    private final SaveMovieMapper mapper;

    @Transactional
    public List<SaveMovieResponseDTO> save(List<SaveMovieCreateDTO> saveMovie) {
        List<SaveMovie> entities = saveMovie.stream()
                .map(dto -> {
                    SaveMovie movie = mapper.toSaveMovie(dto);
                    User user = userRepository.findById(dto.getUserId())
                            .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
                    movie.setUser(user);
                    return movie;
                })
                .toList();

        List<SaveMovie> saved = saveMovieRepository.saveAll(entities);
        return saved.stream()
                .map(arg0 -> mapper.toResponse(arg0))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<SaveMovie> getAll() {
        return saveMovieRepository.findAll();
    }

   public void deleteById(Long id) {
    SaveMovie movie = saveMovieRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Filme com id " + id + " não encontrado"));

    saveMovieRepository.deleteById(id);
}

}
