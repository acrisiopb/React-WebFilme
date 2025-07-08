
package com.bbgcine.overview.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bbgcine.overview.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
}