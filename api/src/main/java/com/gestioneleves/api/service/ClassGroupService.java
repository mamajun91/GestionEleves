package com.gestioneleves.api.service;

import com.gestioneleves.api.dto.ClassGroupDTO;
import com.gestioneleves.api.dto.StudentInClassDTO;
import com.gestioneleves.api.dto.ClassGroupAddStudentsDTO;
import com.gestioneleves.api.entity.ClassGroup;
import com.gestioneleves.api.entity.Registration;
import com.gestioneleves.api.entity.Student;
import com.gestioneleves.api.repository.ClassGroupRepository;
import com.gestioneleves.api.repository.RegistrationRepository;
import com.gestioneleves.api.repository.StudentRepository;
import com.gestioneleves.api.service.mapper.ClassGroupMapper;
import com.gestioneleves.api.service.mapper.RegistrationMapper;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ClassGroupService {

    private final ClassGroupRepository repository;
    private final RegistrationRepository registrationRepository;
    private final StudentRepository studentRepository;
    private final ClassGroupMapper mapper;
    private final RegistrationMapper registrationMapper;

    /**
     * Récupérer toutes les classes
     */
    public List<ClassGroupDTO> getClassGroups() {
        return repository.findAll()
                .stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Récupérer une classe par ID
     */
    public ClassGroupDTO getClassGroup(Long id) {
        ClassGroup classGroup = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                    "Aucune classe trouvée avec l'ID: " + id
                ));
        return mapper.toDto(classGroup);
    }

    /**
     * Créer ou mettre à jour une classe
     */
    public ClassGroupDTO saveClassGroup(ClassGroupDTO classGroupDTO) {
        ClassGroup entity = mapper.toEntity(classGroupDTO);
        ClassGroup saved = repository.save(entity);
        return mapper.toDto(saved);
    }

    /**
     * Supprimer une classe par ID
     */
    public void deleteClassGroup(Long id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException(
                "Impossible de supprimer: classe introuvable avec l'ID " + id
            );
        }
        repository.deleteById(id);
    }

    /**
     * Récupérer la classe d'un professeur principal
     */
    public ClassGroupDTO getClassGroupByHeadTeacher(Long headTeacherId) {
        ClassGroup classGroup = repository.findByHeadTeacher_Id(headTeacherId)
                .orElseThrow(() -> new EntityNotFoundException(
                    "Aucune classe trouvée pour le professeur principal avec l'ID: " + headTeacherId
                ));
        return mapper.toDto(classGroup);
    }

    /**
     * Récupérer une classe par nom
     */
    public ClassGroupDTO getClassGroupByName(String name) {
        ClassGroup classGroup = repository.findByName(name)
                .orElseThrow(() -> new EntityNotFoundException(
                    "Aucune classe trouvée avec le nom: " + name
                ));
        return mapper.toDto(classGroup);
    }

    /**
     * Ajouter plusieurs étudiants à une classe (inscription en masse)
     */
    public void addStudentsToClassGroup(Long classGroupId, ClassGroupAddStudentsDTO request) {
        ClassGroup classGroup = repository.findById(classGroupId)
            .orElseThrow(() -> new EntityNotFoundException(
                "Classe introuvable avec l'ID: " + classGroupId
            ));

        for (Long studentId : request.getStudentIds()) {
            // Vérifier si déjà inscrit
            boolean alreadyRegistered = registrationRepository
                .existsByStudentIdAndClassGroupId(studentId, classGroupId);
            
            if (alreadyRegistered) {
                continue; // Skip si déjà inscrit
            }

            Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new EntityNotFoundException(
                    "Étudiant introuvable avec l'ID: " + studentId
                ));

            //  Créer Registration sans builder
            Registration registration = new Registration();
            registration.setStudent(student);
            registration.setClassGroup(classGroup);
            registration.setSchoolYear(request.getSchoolYear());
            registration.setRegistrationDate(request.getRegistrationDate());

            registrationRepository.save(registration);
        }
    }

    /**
     * Retirer un étudiant d'une classe
     */
    public void removeStudentFromClassGroup(Long classGroupId, Long studentId) {
        Registration registration = registrationRepository
            .findByStudentIdAndClassGroupId(studentId, classGroupId)
            .orElseThrow(() -> new EntityNotFoundException(
                "Inscription introuvable pour l'étudiant " + studentId + 
                " dans la classe " + classGroupId
            ));
        
        registrationRepository.delete(registration);
    }

    /**
     * Lister tous les étudiants d'une classe
     *  Utilise le mapper existant pour StudentInClassDTO
     */
    public List<StudentInClassDTO> getStudentsInClass(Long classGroupId) {
        if (!repository.existsById(classGroupId)) {
            throw new EntityNotFoundException(
                "Classe introuvable avec l'ID: " + classGroupId
            );
        }

        List<Registration> registrations = registrationRepository
            .findByClassGroupId(classGroupId);

        //  Utiliser le mapper au lieu du builder
        return registrations.stream()
            .map(registrationMapper::toStudentInClassDTO)
            .collect(Collectors.toList());
    }
}