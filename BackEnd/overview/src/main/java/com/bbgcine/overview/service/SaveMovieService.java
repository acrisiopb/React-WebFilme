package com.bbgcine.overview.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bbgcine.overview.entity.SaveMovie;
import com.bbgcine.overview.entity.User;
import com.bbgcine.overview.exception.EntityNotFoundException;
import com.bbgcine.overview.jwt.JwtUserDetails;
import com.bbgcine.overview.repository.SaveMovieRepository;
import com.bbgcine.overview.repository.UserRepository;
import com.bbgcine.overview.web.dto.SaveMovieCreateDTO;
import com.bbgcine.overview.web.dto.SaveMovieResponseDTO;
import com.bbgcine.overview.web.dto.mapper.SaveMovieMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Slf4j
public class SaveMovieService {

    private final SaveMovieRepository saveMovieRepository;
    private final UserRepository userRepository;
    private final SaveMovieMapper mapper;
@Transactional
public List<SaveMovieResponseDTO> save(List<SaveMovieCreateDTO> saveMovieDtos) {
    // 1. Converte a lista de DTOs numa lista de entidades para salvar
    List<SaveMovie> moviesToSave = saveMovieDtos.stream()
            .map(dto -> { // 2. Para CADA filme na lista...
                User user = userRepository.findById(dto.getUserId())
                        .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

                // 3. Verifica se ESTE filme específico já existe para este utilizador
                Optional<SaveMovie> existingMovie = saveMovieRepository.findByMovieIdAndUserId(dto.getMovieId(), user.getId());
                
                // 4. Se o filme JÁ EXISTIR, ele é "marcado" como nulo e ignorado
                if (existingMovie.isPresent()) {
                    log.warn("Filme duplicado ignorado. MovieId: {}, UserId: {}", dto.getMovieId(), user.getId());
                    return null; 
                }
                
                // 5. Se for um filme NOVO, a entidade é criada normalmente
                SaveMovie movie = mapper.toSaveMovie(dto);
                movie.setUser(user);
                return movie;
            })
            .filter(java.util.Objects::nonNull) // 6. Remove todos os filmes "marcados" como nulos (os duplicados)
            .toList();

    // 7. Se a lista final de filmes para salvar estiver vazia, não faz nada
    if (moviesToSave.isEmpty()) {
        log.info("Nenhum filme novo para salvar.");
        return List.of();
    }
    
    // 8. Salva no banco de dados APENAS os filmes novos que restaram na lista
    List<SaveMovie> saved = saveMovieRepository.saveAll(moviesToSave);
    return saved.stream()
            .map(t -> mapper.toResponse(t))
            .toList();
}

    @Transactional(readOnly = true)
    public List<SaveMovie> getAll(JwtUserDetails currentUser) {
        return saveMovieRepository.findAllByUserId(currentUser.getId());
    }

    @Transactional
    public void deleteById(Long id, JwtUserDetails currentUser) {
        SaveMovie movie = saveMovieRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Filme com id " + id + " não encontrado"));

        log.info("Tentativa de exclusão do filme ID: {}. Dono do filme (ID): {}. Usuário da requisição (ID): {}",
                id, movie.getUser().getId(), currentUser.getId());

        if (!movie.getUser().getId().equals(currentUser.getId())) {
            log.warn("ACESSO NEGADO! Usuário ID {} tentou apagar filme do usuário ID {}",
                    currentUser.getId(), movie.getUser().getId());
            throw new AccessDeniedException("Acesso negado. Você não tem permissão para apagar este filme.");
        }
        saveMovieRepository.delete(movie);
        log.info("Filme ID {} apagado com sucesso pelo usuário ID {}", id, currentUser.getId());
    }

   
    @Transactional
    public void deleteByMovieId(Long movieId, JwtUserDetails currentUser) {
        // --- INÍCIO DO CÓDIGO DE DEBUG ---
        if (currentUser == null || currentUser.getId() == null) {
            log.error("[DEBUG] Tentativa de apagar sem utilizador autenticado no serviço.");
            throw new AccessDeniedException("Utilizador não autenticado.");
        }

        Long currentUserId = currentUser.getId();
        log.info("[DEBUG] A tentar apagar filme com movieId: {} para o utilizador com userId: {}", movieId, currentUserId);
        // --- FIM DO CÓDIGO DE DEBUG ---

        Optional<SaveMovie> optional = saveMovieRepository.findByMovieIdAndUserId(movieId, currentUserId);

        if (optional.isEmpty()) {
            // --- INÍCIO DO CÓDIGO DE DEBUG ---
            log.warn("[DEBUG] FILME NÃO ENCONTRADO! A query findByMovieIdAndUserId({}, {}) não retornou resultados.", movieId, currentUserId);
            // --- FIM DO CÓDIGO DE DEBUG ---
            throw new EntityNotFoundException("Filme não encontrado na sua lista de favoritos");
        }

        SaveMovie movieToDelete = optional.get();
        log.info("[DEBUG] Filme encontrado com sucesso. ID interno a ser apagado: {}. A apagar agora...", movieToDelete.getId());
        saveMovieRepository.deleteById(movieToDelete.getId());
        log.info("[DEBUG] Filme com ID interno {} apagado com sucesso.", movieToDelete.getId());
    }

}
