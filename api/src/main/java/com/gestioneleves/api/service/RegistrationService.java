package com.gestioneleves.api.service;

import com.gestioneleves.api.dto.ClassGroupDTO;
import com.gestioneleves.api.dto.RegistrationDTO;
import com.gestioneleves.api.entity.Registration;
import com.gestioneleves.api.entity.RegistrationPK;
import com.gestioneleves.api.repository.ClassGroupRepository;
import com.gestioneleves.api.repository.RegistrationRepository;
import com.gestioneleves.api.repository.StudentRepository;
import com.gestioneleves.api.service.mapper.ClassGroupMapper;
import com.gestioneleves.api.service.mapper.RegistrationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Transactional
public class RegistrationService {
   private final RegistrationRepository repository;
private final RegistrationMapper mapper;
private final StudentRepository studentRepository;
private final ClassGroupRepository classGroupRepository;
private final ClassGroupMapper classGroupMapper;

    public List<RegistrationDTO> getRegistrations() {
        return repository.findAllByOrderBySchoolYearAsc()
                .stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    public RegistrationDTO getRegistration(RegistrationPK id) {
        Registration registration = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inscription introuvable."));
        return mapper.toDto(registration);
    }

   
    public RegistrationDTO saveRegistration(RegistrationDTO dto) {
        Registration entity = mapper.toEntity(dto, studentRepository, classGroupRepository);
        Registration saved = repository.save(entity);
        return mapper.toDto(saved);
    }

 
    public void deleteRegistration(Long studentId, Long classGroupId) {
        RegistrationPK id = new RegistrationPK(studentId, classGroupId);
        repository.deleteById(id);
    }

    public List<RegistrationDTO> getRegistrationsByStudent(Long studentId) {
        return repository.findByStudentId(studentId)
                .stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    public List<RegistrationDTO> getRegistrationsByStudentAndYear(Long studentId, String schoolYear) {
        return repository.findByStudentIdAndSchoolYear(studentId, schoolYear)
                .stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    public List<RegistrationDTO> getRegistrationsByClass(Long classGroupId) {
        return repository.findByClassGroupIdOrderBySchoolYear(classGroupId)
                .stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    public List<RegistrationDTO> getRegistrationsByClassAndYear(Long classGroupId, String schoolYear) {
        return repository.findByClassGroupIdAndSchoolYear(classGroupId, schoolYear)
                .stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    public RegistrationDTO getRegistrationByStudentAndClass(Long studentId, Long classGroupId) {
    RegistrationPK pk = new RegistrationPK(studentId, classGroupId);
    Registration registration = repository.findById(pk)
            .orElseThrow(() -> new RuntimeException(
                    "Inscription introuvable pour l'élève " + studentId + " et la classe " + classGroupId));

    return mapper.toDto(registration);
}

public RegistrationDTO getActiveRegistrationByStudent(Long studentId) {
    Registration registration = repository
            .findTopByIdStudentIdOrderBySchoolYearDesc(studentId)
            .orElseThrow(() -> new RuntimeException(
                    "Aucune inscription trouvée pour l'élève " + studentId));

    return mapper.toDto(registration);
}

public Long getClassGroupByStudent(Long studentId) {
    Registration registration = repository
            .findTopByIdStudentIdOrderBySchoolYearDesc(studentId)
            .orElseThrow(() -> new RuntimeException(
                    "Classe introuvable pour l'élève " + studentId));

    return registration.getId().getClassGroupId();
}

public ClassGroupDTO getClassGroupDTOByStudent(Long studentId) {
    Registration registration = repository
            .findTopByIdStudentIdOrderBySchoolYearDesc(studentId)
            .orElseThrow(() -> new RuntimeException(
                    "Classe introuvable pour l'élève " + studentId));

    return classGroupMapper.toDto(registration.getClassGroup());
}


}