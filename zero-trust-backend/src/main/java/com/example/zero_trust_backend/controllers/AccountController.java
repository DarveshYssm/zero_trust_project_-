package com.example.zero_trust_backend.controllers;

import com.example.zero_trust_backend.dto.UserDto;
import com.example.zero_trust_backend.mappers.UserMapper;
import com.example.zero_trust_backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {

    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping("/me")
    public UserDto getMe(Authentication auth) {
        var user = userService.getByEmail(auth.getName());
        return userMapper.toDto(user);
    }
}

