package com.gestioneleves.api.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

       
        http
                .cors(cors -> cors
                        .configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf
                .disable())
                .authorizeHttpRequests(requests -> requests
                        /* Authentication paths*/
                        .requestMatchers("/api/login").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/profil").hasAnyRole("ADMIN", "TEACHER", "LEGAL_GUARDIAN")
                        .requestMatchers(HttpMethod.PUT, "/api/profil").hasAnyRole("ADMIN", "TEACHER", "LEGAL_GUARDIAN")
                        .requestMatchers(HttpMethod.POST, "/api/register").hasRole("ADMIN")

                        /* User paths */
                        .requestMatchers(HttpMethod.GET,"/api/users/**").hasAnyRole("ADMIN", "TEACHER", "LEGAL_GUARDIAN")
                        .requestMatchers(HttpMethod.DELETE,"/api/users/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT,"/api/users/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST,"/api/users/**").hasRole("ADMIN")

                        /* Student paths */
                        .requestMatchers(HttpMethod.GET, "/api/students/**").hasAnyRole("ADMIN", "TEACHER", "LEGAL_GUARDIAN")
                        .requestMatchers(HttpMethod.PUT, "/api/students/*").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/students").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/students/*/photo").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/students/*").hasRole("ADMIN")

                        /* Class group paths */
                        //.requestMatchers(HttpMethod.GET, "/api/class-groups/by-head-teacher/*").hasAnyRole("ADMIN", "TEACHER")
                        .requestMatchers(HttpMethod.GET, "/api/class-groups/**").hasAnyRole("ADMIN", "TEACHER", "LEGAL_GUARDIAN")
                        .requestMatchers(HttpMethod.PUT, "/api/class-groups/*").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/class-groups").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/class-groups/*").hasRole("ADMIN")

                        /* Registration paths */
                        //.requestMatchers(HttpMethod.GET, "/api/registrations/by-student/*").hasAnyRole("ADMIN", "TEACHER", "LEGAL_GUARDIAN")
                        //.requestMatchers(HttpMethod.GET, "/api/registrations/by-class/*").hasAnyRole("ADMIN", "TEACHER")
                        //.requestMatchers(HttpMethod.GET, "/api/registrations/by-class/*/year/*").hasAnyRole("ADMIN", "TEACHER")
                        .requestMatchers(HttpMethod.GET, "/api/registrations/**").hasAnyRole("ADMIN", "TEACHER", "LEGAL_GUARDIAN")
                        .requestMatchers(HttpMethod.PUT, "/api/registrations/student/*/class/{classGroupId}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/registrations").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/registrations/student/*/class/*").hasRole("ADMIN")

                        /* Teaching paths */
                        //.requestMatchers(HttpMethod.GET, "/api/teachings/by-teacher/*").hasAnyRole("ADMIN", "TEACHER")
                        //.requestMatchers(HttpMethod.GET, "/api/teachings/by-class/*").hasAnyRole("ADMIN", "TEACHER")
                        //.requestMatchers(HttpMethod.GET, "/api/teachings/by-subject/*").hasAnyRole("ADMIN", "TEACHER")
                        //.requestMatchers(HttpMethod.GET, "/api/teachings/by-class/*/subject/*").hasAnyRole("ADMIN", "TEACHER")
                        .requestMatchers(HttpMethod.GET, "/api/teachings/**").hasAnyRole("ADMIN", "TEACHER", "LEGAL_GUARDIAN")
                        .requestMatchers(HttpMethod.PUT, "/api/teachings/*").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/teachings").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/teachings/*").hasRole("ADMIN")

                        /* Evaluation paths */
                        //.requestMatchers(HttpMethod.GET, "/api/evaluations/by-student/*").hasAnyRole("ADMIN", "TEACHER", "LEGAL_GUARDIAN")
                        //.requestMatchers(HttpMethod.GET, "/api/evaluations/by-teaching/*").hasAnyRole("ADMIN", "TEACHER")
                        .requestMatchers(HttpMethod.GET, "/api/evaluations/**").hasAnyRole("ADMIN", "TEACHER", "LEGAL_GUARDIAN")
                        .requestMatchers(HttpMethod.PUT, "/api/evaluations/*").hasAnyRole("ADMIN", "TEACHER")
                        .requestMatchers(HttpMethod.POST, "/api/evaluations").hasAnyRole("ADMIN", "TEACHER")
                        .requestMatchers(HttpMethod.DELETE, "/api/evaluations/*").hasAnyRole("ADMIN", "TEACHER")

                        /* School report paths */
                        //.requestMatchers(HttpMethod.GET, "/api/school-reports/student/*").hasAnyRole("ADMIN", "TEACHER", "LEGAL_GUARDIAN")
                        //.requestMatchers(HttpMethod.GET, "/api/school-reports/period/*").hasAnyRole("ADMIN", "TEACHER")
                        .requestMatchers(HttpMethod.GET, "/api/school-reports/**").hasAnyRole("ADMIN", "TEACHER", "LEGAL_GUARDIAN")
                        .requestMatchers(HttpMethod.PUT, "/api/school-reports/*").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/school-reports").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/school-reports/*").hasRole("ADMIN")

                        /* School report line paths */
                        .requestMatchers(HttpMethod.GET, "/api/schol-report-lines/**").hasAnyRole("ADMIN", "TEACHER", "LEGAL_GUARDIAN")
                        .requestMatchers(HttpMethod.PUT, "/api/schol-report-lines/school-report/*/teaching/*").hasAnyRole("ADMIN", "TEACHER")
                        .requestMatchers(HttpMethod.POST, "/api/schol-report-lines").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/schol-report-lines/school-report/*/teaching/*").hasRole("ADMIN")
                        
                        .requestMatchers("/api/**").hasRole("ADMIN")

                        .anyRequest().authenticated()
                        )
                .sessionManagement(management -> management
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();

    //Autoriser React (port 5173)
    configuration.setAllowedOrigins(List.of("http://localhost:5173"));
    
    // Ajouter OPTIONS pour preflight
    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    
    //  Autoriser tous les headers
    configuration.setAllowedHeaders(List.of("*"));
    
    //  Permettre les credentials (JWT dans Authorization header)
    configuration.setAllowCredentials(true);
    
    //  Exposer le header Authorization pour React
    configuration.setExposedHeaders(List.of("Authorization"));
    
    //  Cache du preflight (1h)
    configuration.setMaxAge(3600L);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);

    return source;
  }
}