package com.gestioneleves.api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.experimental.SuperBuilder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true, exclude = {"children", "teachings"})
@ToString(callSuper = true, exclude = {"children", "teachings"})
@NamedQueries({
    // @NamedQuery(name = "AppUser.findByUsername", query = "Select a from AppUser a where a.username = ?1"),
    // @NamedQuery(name = "AppUser.findByLegalGuardiansId", query = "Select s from Student s join s.legalGuardians g where g.id = ?1 "),
})
@NamedQuery(name = "AppUser.findByClassGroup", query = "Select a from AppUser a join Teaching t where t.classGroup = ?1")
public class AppUser extends Person implements UserDetails {
    @Column(nullable = false, length = 255)
    @Builder.Default
    private String password = "defaultValue";

    @Column(nullable = false, length = 50, unique = true)
    private String email;

    @Column(nullable = false, length = 50, unique = true)
    private String username;

    @Column(nullable = false, length = 50, unique = true)
    private String phoneNumber;

    @Column(nullable = false, length = 50)
    private String postalAddress;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;

    @OneToMany(mappedBy = "teacher", 
        cascade = CascadeType.REMOVE, orphanRemoval = true)
    @Builder.Default
    private List<Teaching> teachings = new ArrayList<>();

    @OneToOne (mappedBy = "headTeacher")
    private ClassGroup classGroup;

    @ManyToMany(mappedBy = "legalGuardians")
    @Builder.Default
    private List<Student> children = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + this.role.toString()));
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getPassword() {
        return password;
    }

}