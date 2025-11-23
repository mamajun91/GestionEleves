package com.gestioneleves.api.controller;


import com.gestioneleves.api.dto.ClassGroupAddStudentsDTO;
import com.gestioneleves.api.dto.ClassGroupDTO;
import com.gestioneleves.api.dto.StudentInClassDTO;
import com.gestioneleves.api.service.ClassGroupService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/class-groups")
@RequiredArgsConstructor
public class ClassGroupController {

    private final ClassGroupService service;

    @GetMapping
    public List<ClassGroupDTO> getClassGroups() {
        return service.getClassGroups();
    }

    @GetMapping("/{id}")
    public ClassGroupDTO getClassGroup(@PathVariable Long id) {
        return service.getClassGroup(id);
    }

    @GetMapping("/by-head-teacher/{headTeacherId}")
    public ClassGroupDTO getClassGroupByHeadTeacher(@PathVariable Long headTeacherId) {
        return service.getClassGroupByHeadTeacher(headTeacherId);
    }

    @GetMapping("/by-name/{name}")
    public ClassGroupDTO getClassGroupByName(@PathVariable String name) {
        return service.getClassGroupByName(name);
    }

    @PostMapping
    public ClassGroupDTO create(@RequestBody @Valid ClassGroupDTO classGroupDTO) {
        return service.saveClassGroup(classGroupDTO);
    }

    @PutMapping("/{id}")
    public ClassGroupDTO updateClassGroup(@PathVariable Long id, @RequestBody @Valid ClassGroupDTO classGroupDTO) {
        classGroupDTO.setId(id);
        return service.saveClassGroup(classGroupDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteClassGroup(@PathVariable Long id) {
        service.deleteClassGroup(id);
    }

    // ========== Gestion des Students ==========

    @GetMapping("/{id}/students")
    public List<StudentInClassDTO> getStudents(@PathVariable Long id) {
        return service.getStudentsInClass(id);
    }

    @PostMapping("/{id}/students")
    public void addStudents(@PathVariable Long id, @RequestBody @Valid ClassGroupAddStudentsDTO request) {
        service.addStudentsToClassGroup(id, request);
    }

    @DeleteMapping("/{id}/students/{studentId}")
    public void removeStudent(@PathVariable Long id, @PathVariable Long studentId) {
        service.removeStudentFromClassGroup(id, studentId);
    }
}