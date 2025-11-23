package com.gestioneleves.api.dto;



import java.time.LocalDate;


import lombok.*;



@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegistrationDTO {
    
    private String schoolYear;
    private LocalDate registrationDate;
    private Long studentId;
    private Long classGroupId;
}
