package com.gestioneleves.api.service;

import java.util.List;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gestioneleves.api.dto.AppUserDTO;
import com.gestioneleves.api.dto.LoginAppUserDTO;
import com.gestioneleves.api.dto.RegisterAppUserDTO;
import com.gestioneleves.api.entity.AppUser;
import com.gestioneleves.api.repository.AppUserRepository;
import com.gestioneleves.api.service.mapper.AppUserMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthenticationService {
    private final AppUserMapper mapper;
    private final AppUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AppUser signup(RegisterAppUserDTO input) {
        AppUser user = new AppUser();
        user.setUsername(input.getUsername());
        user.setLastname(input.getLastname());
        user.setFirstname(input.getFirstname());
        user.setPhoneNumber(input.getPhoneNumber());
        user.setPostalAddress(input.getPostalAddress());
        user.setRole(input.getRole());
        user.setEmail(input.getEmail());
        user.setPassword(passwordEncoder.encode(input.getPassword()));

        return userRepository.save(user);
    }

    public AppUser authenticate(LoginAppUserDTO input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getUsername(),
                        input.getPassword()
                )
        );

        return userRepository.findByUsername(input.getUsername())
                .orElseThrow();
   
    }

    public AppUserDTO getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AppUser currentUser = (AppUser) authentication.getPrincipal();
        return mapper.toDto(currentUser);
    }

    public AppUserDTO changePassword(List<LoginAppUserDTO> appUserDtoWithDualPassword) {
        AppUser userForPaswordChange = authenticate(appUserDtoWithDualPassword.getFirst());
        
        userForPaswordChange.setPassword(passwordEncoder.encode(appUserDtoWithDualPassword.get(1).getPassword()));
        
        return mapper.toDto(userRepository.save(userForPaswordChange));
    }
}
