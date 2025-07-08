package com.bbgcine.overview.web.dto.mapper;

import org.modelmapper.ModelMapper;

import com.bbgcine.overview.entity.User;
import com.bbgcine.overview.web.dto.UserCreateDTO;
import com.bbgcine.overview.web.dto.UserResponseDTO;

public class UserMapper {
    public static User toUser(UserCreateDTO createDTO){

        return new ModelMapper().map(createDTO, User.class);
    }

    public static UserResponseDTO toUserResponseDTO(User user){
        return new ModelMapper().map(user, UserResponseDTO.class);
    }
}
