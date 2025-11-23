package com.gestioneleves.api.service.mapper;

import com.gestioneleves.api.dto.StudentDTO;
import com.gestioneleves.api.entity.*;
import com.gestioneleves.api.repository.AppUserRepository;

import org.mapstruct.*;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Mapper(
    componentModel = "spring",
    uses = {SchoolReportMapper.class, EvaluationMapper.class, AppUserMapper.class, RegistrationMapper.class},
    unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface StudentMapper {

    @Mapping(target = "schoolReportsIds", source = "schoolReports", qualifiedByName = "mapSchoolReportsToIds")
    @Mapping(target = "evaluationsIds", source = "evaluations", qualifiedByName = "mapEvaluationsToIds")
    @Mapping(target = "legalGuardiansIds", source = "legalGuardians", qualifiedByName = "mapGuardiansToIds")
    StudentDTO toDto(Student entity);

    @Mapping(target = "schoolReports", source = "schoolReportsIds", qualifiedByName = "mapIdsToSchoolReports")
    @Mapping(target = "evaluations", source = "evaluationsIds", qualifiedByName = "mapIdsToEvaluations")
    @Mapping(target = "legalGuardians", source = "legalGuardiansIds", qualifiedByName = "mapIdsToGuardians")
    Student toEntity(StudentDTO dto, @Context AppUserRepository appUserRepository);


    @Named("mapSchoolReportsToIds")
    default List<Long> mapSchoolReportsToIds(List<SchoolReport> reports) {
        return reports == null ? null :
            reports.stream()
                   .map(SchoolReport::getId)
                   .collect(Collectors.toList());
    }

    @Named("mapIdsToSchoolReports")
    default List<SchoolReport> mapIdsToSchoolReports(List<Long> ids) {
        return ids == null ? null :
            ids.stream()
               .map(id -> {
                   SchoolReport sr = new SchoolReport();
                   sr.setId(id);
                   return sr;
               })
               .collect(Collectors.toList());
    }

    @Named("mapEvaluationsToIds")
    default List<Long> mapEvaluationsToIds(List<Evaluation> evaluations) {
        return evaluations == null ? null :
            evaluations.stream()
                       .map(Evaluation::getId)
                       .collect(Collectors.toList());
    }

    @Named("mapIdsToEvaluations")
    default List<Evaluation> mapIdsToEvaluations(List<Long> ids) {
        return ids == null ? null :
            ids.stream()
               .map(id -> {
                   Evaluation e = new Evaluation();
                   e.setId(id);
                   return e;
               })
               .collect(Collectors.toList());
    }

    @Named("mapGuardiansToIds")
    default List<Long> mapGuardiansToIds(List<AppUser> guardians) {
        return guardians == null ? null :
            guardians.stream()
                     .map(AppUser::getId)
                     .collect(Collectors.toList());
    }

    @Named("mapIdsToGuardians")
    default List<AppUser> mapIdsToGuardians(List<Long> ids, @Context AppUserRepository appUserRepository) {
        return ids == null ? null :
            ids.stream()
                .filter(Objects::nonNull)
                .map(appUserRepository::getReferenceById)
                .collect(Collectors.toList());
    }
}
