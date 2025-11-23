package com.gestioneleves.api.dto;

import java.util.List;



import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClassGroupDTO {
    private Long id;
    private String name;
    private Long headTeacherId;
    private List<Long> teachingsIds;
    
}
