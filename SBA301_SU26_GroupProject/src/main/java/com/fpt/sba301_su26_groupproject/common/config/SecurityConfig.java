package com.fpt.sba301_su26_groupproject.common.config;

import com.fpt.sba301_su26_groupproject.common.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
//                // CSRF protection is enabled by default in Spring Security 6
//                .csrf(csrf -> csrf.disable())
//
//                .authorizeHttpRequests(auth -> auth
//                        // Public endpoints
//                        .requestMatchers(HttpMethod.POST, "/forgot-password", "/reset-password").permitAll()
//                        .requestMatchers(SecurityConstants.PUBLIC_MATCHERS).permitAll()
//                        // Require AUTHOR role for author novel management APIs
//                        .requestMatchers("/api/author/**").hasRole("AUTHOR")
//                        .anyRequest().authenticated())
//                .securityContext(context -> context
//                        .securityContextRepository(securityContextRepository()))
//                .exceptionHandling(exception -> exception
//                        .authenticationEntryPoint((request, response, authException) -> {
//                            System.out.println("Authentication failed: " + authException.getMessage());
//                            if (request.getRequestURI().startsWith("/api/")) {
//                                response.sendError(jakarta.servlet.http.HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
//                            } else {
//                                response.sendRedirect("/login");
//                            }
//                        })
//                        .accessDeniedHandler((request, response, accessDeniedException) -> {
//                            if (request.getRequestURI().startsWith("/api/")) {
//                                response.sendError(jakarta.servlet.http.HttpServletResponse.SC_FORBIDDEN, "Forbidden");
//                            } else {
//                                // Redirect ADMIN away from customer pages → admin dashboard
//                                Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//                                if (auth != null && auth.getAuthorities().stream()
//                                        .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
//                                    response.sendRedirect("/admin");
//                                } else {
//                                    response.sendRedirect("/home");
//                                }
//                            }
//                        }))
//                .logout(logout -> logout
//                        .logoutRequestMatcher(request -> "/logout".equals(request.getServletPath()))
//                        .logoutSuccessUrl("/login?logout=true")
//                        .invalidateHttpSession(true)
//                        .deleteCookies("JSESSIONID"));
//        return http.build();

                .csrf(csrf -> csrf.disable())
                // CHUYỂN SANG STATELESS (Không lưu session trên server nữa)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, "/forgot-password", "/reset-password").permitAll()
                        .requestMatchers(SecurityConstants.PUBLIC_MATCHERS).permitAll()
                        .requestMatchers("/api/author/**").hasRole("AUTHOR")
                        .requestMatchers("/h2-console/**").permitAll()
                        .anyRequest().authenticated()
                )
                // THÊM JWT FILTER VÀO TRƯỚC UsernamePasswordAuthenticationFilter
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.sendError(jakarta.servlet.http.HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
                        })
                )
                .headers(headers -> headers.frameOptions(frame -> frame.disable()));

        return http.build();
    }

    @Bean
    public SecurityContextRepository securityContextRepository() {
        return new HttpSessionSecurityContextRepository();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
