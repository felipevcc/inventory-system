package com.inventorysystem.Backend.mapper;

import com.inventorysystem.Backend.dto.UserDTO;
import com.inventorysystem.Backend.model.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserMapper {
    @Autowired
    ModelMapper modelMapper;

    public UserDTO userToDTO(User user) {
        return modelMapper.map(user, UserDTO.class);
    }
}
