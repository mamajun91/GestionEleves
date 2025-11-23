package com.gestioneleves.api.dto;

import java.time.LocalDate;

import com.gestioneleves.api.entity.Person;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentInClassDTO extends Person {

    private LocalDate registrationDate;
    private String schoolYear;
}
