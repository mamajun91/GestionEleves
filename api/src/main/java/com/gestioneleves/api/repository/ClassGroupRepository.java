package com.gestioneleves.api.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gestioneleves.api.entity.ClassGroup;


@Repository
public interface ClassGroupRepository extends JpaRepository<ClassGroup, Long> {
    
    // the classGroups teached by a teacher
    // public List<ClassGroup> findByTeacherId(Long Id);
    
    // the classGroup of a headTeacher
    Optional<ClassGroup> findByHeadTeacher_Id(Long id);
    Optional<ClassGroup> findByName(String name);
    // the classGroup where a Student is registered for a given schoolYear
    // public Optional<ClassGroup> findByStudentIdAndSchoolYear(Long id, String schoolYear);
    
    
}
