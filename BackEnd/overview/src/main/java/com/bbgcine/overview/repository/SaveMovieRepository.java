package com.bbgcine.overview.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bbgcine.overview.entity.SaveMovie;

public interface SaveMovieRepository extends JpaRepository<SaveMovie, Long> {
}