package com.example.zero_trust_backend.services;

import com.example.zero_trust_backend.dto.LoginRequest;
import com.example.zero_trust_backend.dto.RegisterRequest;
import com.example.zero_trust_backend.entities.Role;
import com.example.zero_trust_backend.entities.User;
import com.example.zero_trust_backend.repositories.RoleRepository;
import com.example.zero_trust_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;

    public User register(RegisterRequest req) {

        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists");
        }

        Role role = roleRepository.findByName("USER").orElseGet(() ->
                roleRepository.save(new Role(null, "USER"))
        );

        User user = new User();
        user.setEmail(req.getEmail());
        user.setPassword(encoder.encode(req.getPassword()));
        user.setRoles(Set.of(role));
        user.setLastActiveAt(LocalDateTime.now());

        return userRepository.save(user);
    }

    public User login(LoginRequest req) {
        Optional<User> userOpt = userRepository.findByEmail(req.getEmail());

        if (userOpt.isPresent() && encoder.matches(req.getPassword(), userOpt.get().getPassword())) {
            User user = userOpt.get();
            user.setLastActiveAt(LocalDateTime.now());
            userRepository.save(user);
            return user;
        }
        return null;
    }
}
