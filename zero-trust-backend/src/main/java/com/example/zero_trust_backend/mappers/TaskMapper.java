package com.example.zero_trust_backend.mappers;

import com.example.zero_trust_backend.dto.TaskDto;
import com.example.zero_trust_backend.entities.Task;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    TaskDto toDto(Task task);
}
