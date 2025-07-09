package com.bbgcine.overview.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bbgcine.overview.entity.User;
import com.bbgcine.overview.exception.EntityNotFoundException;
import com.bbgcine.overview.exception.PasswordInvalidException;
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

    @Transactional(readOnly = true)
    public User searchById(Long id) {
        return userRepositoy.findById(id).orElseThrow(
                () -> new EntityNotFoundException(String.format("Usuário id = %s, não encontrado. ", id)));

    }
    
    @Transactional
    public User updatePass(Long id, String currentPassword, String newPassword, String confirmPassword) {

        if (!newPassword.equals(confirmPassword)) {
            throw new PasswordInvalidException("Nova senha não confere com confirmação de senha..");
        }

        User u = searchById(id);

        if (!u.getPassword().equals(currentPassword)) {
            throw new RuntimeException("Sua senha não confere");
        }

        u.setPassword(newPassword);

        return u;

        
    }

}
