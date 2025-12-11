package com.example.zero_trust_backend.controllers;

import com.example.zero_trust_backend.config.JwtUtils;
import com.example.zero_trust_backend.dto.AuthResponse;
import com.example.zero_trust_backend.dto.LoginRequest;
import com.example.zero_trust_backend.dto.RegisterRequest;
import com.example.zero_trust_backend.entities.User;
import com.example.zero_trust_backend.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtUtils jwtUtils;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest req) {
        authService.register(req);
        return "User registered";
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest req) {
        User user = authService.login(req);

        if (user == null) {
            throw new RuntimeException("Invalid credentials");
        }


        String token = jwtUtils.generateToken(
                user.getEmail(),
                user.getRoles().stream().map(r -> r.getName()).collect(java.util.stream.Collectors.toSet())
        );

        return new AuthResponse(token);
    }
}
