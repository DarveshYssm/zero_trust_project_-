package com.example.zero_trust_backend.repositories;

import com.example.zero_trust_backend.entities.Task;
import com.example.zero_trust_backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUser(User user);
}
