// src/main/java/com/okanumutacer/portfolioapi/config/SecurityConfig.java
package com.okanumutacer.portfolioapi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // API'ler için genellikle devre dışı bırakılır
                .authorizeHttpRequests(authorize -> authorize
                        // Blog yazılarını okuma (GET) herkese açık olsun
                        .requestMatchers(HttpMethod.GET, "/api/posts/**").permitAll()
                        // Admin işlemleri (POST, PUT, DELETE) sadece 'ADMIN' rolüyle yapılabilsin
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        // Diğer tüm istekler kimlik doğrulama gerektirsin
                        .anyRequest().authenticated()
                )
                .httpBasic(Customizer.withDefaults()); // Tarayıcı tabanlı login penceresi için

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails admin = User.builder()
                .username("admin")
                .password(passwordEncoder().encode("Mersin.acer33"))
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(admin);
    }
}