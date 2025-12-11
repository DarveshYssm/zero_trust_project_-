package com.example.zero_trust_backend.controllers;

import com.example.zero_trust_backend.dto.TaskDto;
import com.example.zero_trust_backend.mappers.TaskMapper;
import com.example.zero_trust_backend.services.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;
    private final TaskMapper mapper;

    @PostMapping
    public TaskDto create(@RequestBody TaskDto dto, Authentication auth) {
        return mapper.toDto(taskService.create(dto, auth.getName()));
    }

    @GetMapping
    public List<TaskDto> list(Authentication auth) {
        return taskService.list(auth.getName()).stream().map(mapper::toDto).toList();
    }

    @PutMapping("/{id}")
    public TaskDto update(@PathVariable Long id, @RequestBody TaskDto dto, Authentication auth) {
        return mapper.toDto(taskService.update(id, dto, auth.getName()));
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id, Authentication auth) {
        taskService.delete(id, auth.getName());
        return "Deleted";
    }
}

