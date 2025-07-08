package com.bbgcine.overview.service;

import org.springframework.stereotype.Service;

import com.bbgcine.overview.entity.User;
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
        } catch (Exception ex) {
            throw new Exception(ex.getMessage());
        }
    }

}
