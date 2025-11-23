package com.gestioneleves.api.dto;

import java.time.LocalDate;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClassGroupAddStudentsDTO {
    @NotEmpty
    private List<Long> studentIds;

    @NotBlank
    @Size(min= 4, max=4)
    private String schoolYear;

    @NotNull
    private LocalDate registrationDate;
}
