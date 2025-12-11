package com.example.zero_trust_backend.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/protected")
public class ProtectedController {

    @GetMapping("/data")
    public String protectedData() {
        return "This is protected Zero Trust data";
    }
}
