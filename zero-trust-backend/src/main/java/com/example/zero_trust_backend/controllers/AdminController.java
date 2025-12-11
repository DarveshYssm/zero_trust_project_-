package com.example.zero_trust_backend.controllers;

import com.example.zero_trust_backend.dto.UserDto;
import com.example.zero_trust_backend.entities.Role;
import com.example.zero_trust_backend.entities.User;
import com.example.zero_trust_backend.mappers.UserMapper;
import com.example.zero_trust_backend.repositories.RoleRepository;
import com.example.zero_trust_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;

    @GetMapping("/users")
    public List<UserDto> getUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toDto)
                .toList();
    }

    @GetMapping("/users/{id}")
    public UserDto getUser(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow();
        return userMapper.toDto(user);
    }

    @PostMapping("/users/{id}/promote")
    public String promoteToAdmin(@PathVariable Long id) {

        User user = userRepository.findById(id).orElseThrow();
        Role adminRole = roleRepository.findByName("ADMIN")
                .orElseThrow(() -> new RuntimeException("ADMIN role missing"));

        user.getRoles().add(adminRole);
        userRepository.save(user);

        return "User promoted to ADMIN";
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));


        userRepository.delete(user);
    }
}
