package com.bbgcine.overview.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.bbgcine.overview.entity.User;
import com.bbgcine.overview.exception.EntityNotFoundException;
import com.bbgcine.overview.exception.PasswordInvalidException;
import com.bbgcine.overview.exception.UsernameUniqueViolationException;
import com.bbgcine.overview.jwt.JwtUserDetails;
import com.bbgcine.overview.repository.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepositoy;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public User save(User user) throws Exception {
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
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
    return userRepositoy.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com id: " + id));
}


    


    @Transactional
    public User updatePass(JwtUserDetails currentUser, String currentPassword, String newPassword,
            String confirmPassword) {

        if (!newPassword.equals(confirmPassword)) {
            throw new PasswordInvalidException("Nova senha não confere com confirmação de senha..");
        }

        Long userId = currentUser.getId();
        User u = searchById(userId);

        if (!passwordEncoder.matches(currentPassword, u.getPassword())) {
            throw new RuntimeException("Sua senha não confere");
        }

        u.setPassword(passwordEncoder.encode(newPassword));

        return u;

    }

    @Transactional(readOnly = true)
    public User searchEmail(String email) {

        return userRepositoy.findByEmail(email).orElseThrow(
                () -> new EntityNotFoundException(
                        String.format("Email  = %s , não encontrado", email)));
    }

}
