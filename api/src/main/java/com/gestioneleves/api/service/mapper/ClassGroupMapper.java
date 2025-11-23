package com.gestioneleves.api.service.mapper;

import com.gestioneleves.api.dto.ClassGroupDTO;
import com.gestioneleves.api.entity.*;
import org.mapstruct.*;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = { TeachingMapper.class,
        StudentMapper.class }, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ClassGroupMapper {

    @Mapping(target = "headTeacherId", source = "headTeacherId")
    @Mapping(target = "teachingsIds", source = "teachings", qualifiedByName = "mapTeachingsToIds")
    ClassGroupDTO toDto(ClassGroup entity);

    @Mapping(target = "headTeacher", source = "headTeacherId", qualifiedByName = "mapIdsToHeadTeacher")
    @Mapping(target = "teachings", source = "teachingsIds", qualifiedByName = "mapIdsToTeachings")
    ClassGroup toEntity(ClassGroupDTO dto);

    // ... le reste ne change pas



    // ---------- Méthodes utilitaires ----------
    @Named("mapIdsToHeadTeacher")
    default AppUser map(Long id) {
        if (id == null)
            return null;
        AppUser appUser = new AppUser();
        appUser.setId(id); // Must exist
        return appUser;
    }

    @Named("mapTeachingsToIds")
    default List<Long> mapTeachingsToIds(List<Teaching> teachings) {
        return teachings == null ? null
                : teachings.stream()
                        .map(Teaching::getId)
                        .collect(Collectors.toList());
    }

    @Named("mapIdsToTeachings")
    default List<Teaching> mapIdsToTeachings(List<Long> ids) {
        return ids == null ? null
                : ids.stream()
                        .map(id -> {
                            Teaching t = new Teaching();
                            t.setId(id);
                            return t;
                        })
                        .collect(Collectors.toList());
    }

    
}
