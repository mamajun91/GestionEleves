package com.gestioneleves.api.service;

import com.gestioneleves.api.dto.RegistrationDTO;
import com.gestioneleves.api.dto.SchoolReportDTO;
import com.gestioneleves.api.dto.SchoolReportLineDTO;
import com.gestioneleves.api.entity.SchoolReport;
import com.gestioneleves.api.entity.SchoolReportLinePK;
import com.gestioneleves.api.repository.SchoolReportRepository;
import com.gestioneleves.api.repository.StudentRepository;
import com.gestioneleves.api.service.mapper.SchoolReportMapper;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class SchoolReportService {

    private final SchoolReportRepository repository;
    private final SchoolReportMapper mapper;
    private final SchoolReportLineService srlService;
    private final RegistrationService registrationService;
    private final ClassGroupService classGroupService;
    private final StudentRepository studentRepository;

    public List<SchoolReportDTO> getSchoolReports() {
        return repository.findAll()
                .stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    public SchoolReportDTO getSchoolReport(Long id) {
        SchoolReport schoolReport = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bulletin inexistant"));
        return mapper.toDto(schoolReport);
    }

    public SchoolReportDTO saveSchoolReport(Long id, SchoolReportDTO dto) {
        Boolean shouldCalculate = ((dto.getOverallAverage() == null ? 0.0 : dto.getOverallAverage()) == -1);
        if (id != null) { 
            dto.setId(id);
            if (shouldCalculate) { 
                dto = calculateAverages(id);
            }
        }
        SchoolReport bulletin = mapper.toEntity(dto, studentRepository);
        SchoolReport saved = repository.save(bulletin);
        if (id == null) {
            createLines(saved);
        }
        return mapper.toDto(saved);
    }

    public void deleteSchoolReport(Long id) {
        repository.deleteById(id);
    }

    public List<SchoolReportDTO> findByStudent(Long id) {
        return repository.findByStudentId(id)
                .stream()
                .map(mapper::toDto)
                .collect(Collectors
                        .toList());
    }

    public List<SchoolReportDTO> findByPeriod(LocalDate date) {
        return repository.findByPeriodStart(date)
                .stream()
                .map(mapper::toDto)
                .collect(Collectors
                        .toList());
    }

    /**
     * Calculate and save the overall average linked to a school report.
     * Calls calculateTeachingAvarage from school report line if necessary
     * @param id identity of the school report
     * @return dto of saved report with calculated overall average
     */
    public SchoolReportDTO calculateAverages(Long id) {
        SchoolReport schoolReport = repository.getReferenceById(id);
        List<SchoolReportLinePK> lines = mapper.toDto(schoolReport).getSchoolReportLinesIds();
        if (lines == null || lines.isEmpty()) {
            throw new RuntimeException("Pas de lignes attachées au bulletin !");
        }
        Double overallAverage = lines == null ? null
                : (lines.stream()
                        .mapToDouble(pk -> {
                            return srlService.getSchoolReportLine(pk).getTeachingAverage() == null
                                    ? srlService.calculateTeachingAverage(pk).getTeachingAverage()
                                    : srlService.getSchoolReportLine(pk).getTeachingAverage(); 
                                }))
                        .sum();
        schoolReport.setOverallAverage(lines.size() == 0 ? 0 : overallAverage / lines.size());
        return mapper.toDto(repository.save(schoolReport));
    }

    /**
     * To create Lines of a newly saved school report
     * @param schoolReport modified dto with list of SchoolReportLinePK
     */
    public List<SchoolReportLinePK> createLines(SchoolReport schoolReport) {
        Long schoolReportId = schoolReport.getId();
        String schoolYear = getSchoolYear(schoolReport);
        Long studentId = schoolReport.getStudent().getId();
        List<RegistrationDTO> registrations = 
        registrationService.getRegistrationsByStudentAndYear(
            studentId, schoolYear);
        if (registrations.size() == 1) {
            Long classGroupId = registrations.getFirst().getClassGroupId();
            List<Long> teachingsIds = 
                classGroupService.getClassGroup(classGroupId).getTeachingsIds();
            return (teachingsIds.stream()
                    .map(teachingId -> {
                        SchoolReportLinePK pk = new SchoolReportLinePK(schoolReportId, teachingId);
                        SchoolReportLineDTO srlDto = new SchoolReportLineDTO(
                            pk, null, null);
                        srlService.saveSchoolReportLine(srlDto);
                        return pk;
                    })
                    .toList());
        }
        return null;
    }

    /**
     * To obtain the shool year a school report was created for
     * 
     * @param schoolReport from which the period date are extracted
     * @return the corresponding school year : a "yyyy" string
     */
    public String getSchoolYear(SchoolReport schoolReport) {
        LocalDate periodStart = schoolReport.getPeriodStart();
        LocalDate schoolYearChange = LocalDate.of(periodStart.getYear(), 07, 31);
        if (periodStart.isAfter(schoolYearChange)) {
            return ((Integer) periodStart.plusYears(1).getYear()).toString();
        } else {
            return ((Integer) periodStart.getYear()).toString();
        }
    }
}