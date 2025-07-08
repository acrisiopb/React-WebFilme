package com.bbgcine.overview.service;

import org.springframework.stereotype.Service;

import com.bbgcine.overview.entity.User;
import com.bbgcine.overview.exception.UsernameUniqueViolationException;
import com.bbgcine.overview.repository.*;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepositoy;

    public User save(User user) throws Exception {
        try {
            return userRepositoy.save(user);
        } catch (org.springframework.dao.DataIntegrityViolationException ex) {
            throw new UsernameUniqueViolationException(
                String.format("Email: %s já existente", user.getEmail()));
        }
    }

}
