package com.gestioneleves.api.service;

import com.gestioneleves.api.dto.StudentDTO;
import com.gestioneleves.api.entity.Evaluation;
import com.gestioneleves.api.entity.Registration;
import com.gestioneleves.api.entity.SchoolReport;
import com.gestioneleves.api.entity.Student;
import com.gestioneleves.api.repository.AppUserRepository;
import com.gestioneleves.api.repository.EvaluationRepository;
import com.gestioneleves.api.repository.RegistrationRepository;
import com.gestioneleves.api.repository.SchoolReportRepository;
import com.gestioneleves.api.repository.StudentRepository;
import com.gestioneleves.api.service.mapper.StudentMapper;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository repository;
    private final StudentMapper mapper;
    private final SchoolReportRepository schoolReportRepository;
    private final EvaluationRepository evaluationRepository;
    private final FileStorageService fileStorageService;
    private final String photoFolder = "students-photos/";
    private final String imgType = ".webp";



    public List<StudentDTO> getStudents() {
        return repository.findAll()
                .stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    public StudentDTO getStudent(Long id) {
        Student student = repository.findById(id)
        .orElseThrow(() -> new RuntimeException("l'élève n'existe pas !"));
        return mapper.toDto(student);
    }

    
    public StudentDTO saveOrUpdate(Long id, StudentDTO dto) {
        Student student = (id != null && repository.existsById(id))
                ? repository.findById(id)
                    .orElseThrow(() -> new NoSuchElementException("Étudiant introuvable avec l'ID : " + id))
                : new Student();

        
        student.setFirstname(dto.getFirstname());
        student.setLastname(dto.getLastname());
        student.setBirthday(dto.getBirthday());

        
        if (dto.getSchoolReportsIds() != null && !dto.getSchoolReportsIds().isEmpty()) {
            List<SchoolReport> reports = schoolReportRepository.findAllById(dto.getSchoolReportsIds());
            student.setSchoolReports(reports);
        }

        if (dto.getEvaluationsIds() != null && !dto.getEvaluationsIds().isEmpty()) {
            List<Evaluation> evaluations = evaluationRepository.findAllById(dto.getEvaluationsIds());
            student.setEvaluations(evaluations);
        }


        Student saved = repository.save(student);

        return mapper.toDto(saved);
    }



    @Transactional(readOnly = true)
    public List<StudentDTO> getByLegalGuardian(Long id){
        return repository.findByLegalGuardiansId(id)
        .stream()
        .map(mapper::toDto)
        .collect(Collectors.toList());
    }


    public void deleteStudent(Long id) {
        repository.deleteById(id);
    }

	public StudentDTO savePhoto(Long id, MultipartFile file) throws IOException {
		String photoFileName;
        StudentDTO studentDto = getStudent(id);
        if (studentDto.getPhotoUrl() == null) {
            photoFileName = photoFolder + UUID.randomUUID() + "_" + id + imgType;
            studentDto.setPhotoUrl(fileStorageService.storeFile(file, photoFileName));
            studentDto = saveOrUpdate(id, studentDto);
        } else {
            photoFileName = studentDto.getPhotoUrl().split((String) photoFolder)[-1];
            fileStorageService.storeFile(file, photoFileName);
        }
        return studentDto; 
	}
}

