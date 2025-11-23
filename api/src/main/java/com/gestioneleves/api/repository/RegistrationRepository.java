package com.gestioneleves.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gestioneleves.api.entity.Registration;
import com.gestioneleves.api.entity.RegistrationPK;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, RegistrationPK> {
    
    // registration linked to a classGroup for a schoolYear
    public List<Registration> findByClassGroupIdAndSchoolYear(Long classGroupId, String schoolYear);
    public List<Registration> findByClassGroupIdOrderBySchoolYear(Long classGroupId);
    
    // registrations of a student in the establishment
    public List<Registration> findByStudentId(Long studentId);
    public List<Registration> findByStudentIdAndSchoolYear(Long studentId, String schoolYear);

    Optional<Registration> findTopByIdStudentIdOrderBySchoolYearDesc(Long studentId);
    
    /* Pour le CRUD */
    // Read
    public List<Registration> findAllByOrderBySchoolYearAsc();

    // public List<Registration> saveAll(List<Registration> registrations);


    List<Registration> findByClassGroupId(Long classGroupId);
    
    
    
    Optional<Registration> findByStudentIdAndClassGroupId(
        Long studentId, Long classGroupId
    );
    
    boolean existsByStudentIdAndClassGroupId(
        Long studentId, Long classGroupId
    );
}

