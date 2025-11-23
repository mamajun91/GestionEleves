package com.gestioneleves.api.service.mapper;

import com.gestioneleves.api.dto.RegistrationDTO;
import com.gestioneleves.api.dto.StudentInClassDTO;
import com.gestioneleves.api.entity.*;
import com.gestioneleves.api.repository.ClassGroupRepository;
import com.gestioneleves.api.repository.StudentRepository;

import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface RegistrationMapper {

    // ==========================
    // ENTITY → DTO (RegistrationDTO)
    // ==========================
    @Mapping(target = "studentId", source = "id.studentId")
    @Mapping(target = "classGroupId", source = "id.classGroupId")
    RegistrationDTO toDto(Registration entity);

    List<RegistrationDTO> toDtoList(List<Registration> entities);


    // ==========================
    // ENTITY → StudentInClassDTO
    // ==========================
    @Mapping(target = ".", source = "student")
    StudentInClassDTO toStudentInClassDTO(Registration entity);

    List<StudentInClassDTO> toStudentInClassDTOList(List<Registration> entities);


    // ==========================
    // DTO → ENTITY
    // ==========================
    @Mapping(target = "id", source = ".", qualifiedByName = "buildPK")
    @Mapping(target = "student", source = "studentId", qualifiedByName = "mapIdToStudent")
    @Mapping(target = "classGroup", source = "classGroupId", qualifiedByName = "mapIdToClassGroup")
    Registration toEntity(
        RegistrationDTO dto,
        @Context StudentRepository studentRepo,
        @Context ClassGroupRepository classGroupRepo
    );


    // ============================
    // HELPERS
    // ============================

    @Named("buildPK")
    default RegistrationPK buildPK(RegistrationDTO dto) {
        if (dto == null || dto.getStudentId() == null || dto.getClassGroupId() == null) {
            return null;
        }
        return new RegistrationPK(dto.getStudentId(), dto.getClassGroupId());
    }

    @Named("mapIdToStudent")
    default Student mapIdToStudent(Long id, @Context StudentRepository repo) {
        if (id == null) return null;
        return repo.getReferenceById(id);
    }

    @Named("mapIdToClassGroup")
    default ClassGroup mapIdToClassGroup(Long id, @Context ClassGroupRepository repo) {
        if (id == null) return null;
        return repo.getReferenceById(id);
    }
}


