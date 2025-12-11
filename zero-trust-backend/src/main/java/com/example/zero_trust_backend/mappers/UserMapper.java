package com.example.zero_trust_backend.mappers;

import com.example.zero_trust_backend.dto.UserDto;
import com.example.zero_trust_backend.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "roles", expression = "java(mapRoles(user))")
    UserDto toDto(User user);

    default Set<String> mapRoles(User user) {
        return user.getRoles().stream()
                .map(r -> r.getName())
                .collect(Collectors.toSet());
    }
}
