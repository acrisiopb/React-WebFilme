package com.bbgcine.overview.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bbgcine.overview.entity.User;
import com.bbgcine.overview.exception.UsernameUniqueViolationException;
import com.bbgcine.overview.repository.*;

import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepositoy;

    @Transactional
    public User save(User user) throws Exception {
        try {
            return userRepositoy.save(user);
        } catch (org.springframework.dao.DataIntegrityViolationException ex) {
            throw new UsernameUniqueViolationException(
                    String.format("Email: %s , já existente", user.getEmail()));
        }
    }

    @Transactional(readOnly = true)
    public List<User> searchAll() {
        return userRepositoy.findAll();
    }

    // public void updatePass(Long id, String currentPassword, String newPassword, String confirmPassword) {
        //implementa buscar por Id
    // }

}
