package com.gestioneleves.api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.experimental.SuperBuilder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


// import jakarta.persistence.NamedQueries;
// import jakarta.persistence.NamedQuery;

// @NamedQuery(name = "Student.findByLegalGuardiansId", query = "Select s from Student s join s.legalGuardians g where g.id = ?1 "),
// @NamedQueries({
//     @NamedQuery(name = "Student.findByClassGroupIdAndSchoolYear",
//         query = "Select s from Student s join s.Regitration r join r.ClassGroup c where c.id = ?1 and r.schoolYear = ?2 "),
//     @NamedQuery(name = "Student.findByClassGroupIdAndSchoolYear",
//         query = "Select s from Student s join s.Regitration r join r.ClassGroup c join c.Teaching t where t.id = ?1 ")
// })
@Data
@NoArgsConstructor 
@AllArgsConstructor 
@SuperBuilder
@EqualsAndHashCode(callSuper = true, exclude = {"schoolReports", "evaluations", "legalGuardians", "registrations"})
@ToString(callSuper = true, exclude = {"schoolReports", "evaluations", "legalGuardians", "registrations"})
@Entity
public class Student extends Person {

    @Column(nullable = false)
    private LocalDate birthday;

    @Column(unique = true)
    private String photoUrl;

    @OneToMany(mappedBy = "student", 
        cascade = CascadeType.REMOVE, orphanRemoval = true)
    @Builder.Default
    private List<Evaluation> evaluations = new ArrayList<>();

    @OneToMany(mappedBy = "student", 
        cascade = CascadeType.REMOVE, orphanRemoval = true)
    @Builder.Default
    private List<SchoolReport> schoolReports = new ArrayList<>();

    @OneToMany(mappedBy = "student", 
        cascade = CascadeType.REMOVE, orphanRemoval = true)
    @Builder.Default
    private List<Registration> registrations = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "student_guardian_link",
            joinColumns = @JoinColumn(name = "child_id", nullable = false),
            inverseJoinColumns = @JoinColumn(name = "guardian_id", nullable = false)
    )
    @Builder.Default
    @com.fasterxml.jackson.annotation.JsonIgnore
    private List<AppUser> legalGuardians = new ArrayList<>();
}