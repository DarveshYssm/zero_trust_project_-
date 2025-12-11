package com.example.zero_trust_backend.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.Set;

@Data
public class UserDto {
    private Long id;
    private String email;
    private LocalDateTime lastActiveAt;
    private Set<String> roles;
}
