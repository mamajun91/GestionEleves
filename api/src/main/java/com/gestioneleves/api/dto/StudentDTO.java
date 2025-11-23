package com.gestioneleves.api.dto;

import java.util.List;



import java.time.LocalDate;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class StudentDTO extends PersonDTO {
    private LocalDate birthday;
    private String photoUrl;
    private List<Long> schoolReportsIds;
    private List<Long> evaluationsIds;
    private List<Long> legalGuardiansIds;

}
 