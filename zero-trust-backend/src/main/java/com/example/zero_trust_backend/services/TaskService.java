package com.example.zero_trust_backend.services;

import com.example.zero_trust_backend.dto.TaskDto;
import com.example.zero_trust_backend.entities.Task;
import com.example.zero_trust_backend.entities.User;
import com.example.zero_trust_backend.repositories.TaskRepository;
import com.example.zero_trust_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public Task create(TaskDto dto, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();

        Task task = Task.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .createdAt(LocalDateTime.now())
                .user(user)
                .build();

        return taskRepository.save(task);
    }

    public List<Task> list(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return taskRepository.findByUser(user);
    }

    public Task update(Long id, TaskDto dto, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        Task task = taskRepository.findById(id).orElseThrow();

        if (!task.getUser().getId().equals(user.getId()))
            throw new RuntimeException("Forbidden");

        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());

        return taskRepository.save(task);
    }

    public void delete(Long id, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        Task task = taskRepository.findById(id).orElseThrow();

        if (!task.getUser().getId().equals(user.getId()))
            throw new RuntimeException("Forbidden");

        taskRepository.delete(task);
    }
}
