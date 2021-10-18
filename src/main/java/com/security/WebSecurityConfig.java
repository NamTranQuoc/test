package com.security;

import com.utils.enums.APIOpenEnum;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().configurationSource(new PermissiveCorsConfigurationSource());
        http.csrf().disable();
        http.authorizeRequests().antMatchers(APIOpenEnum.apiOpen.toArray(new String[0])).permitAll();
        http.authorizeRequests().anyRequest().authenticated();
        //nếu người dùng truyên cập mà k đủ quyền
        http.exceptionHandling().accessDeniedPage("/login");
        // Apply JWT
        http.apply(new JwtTokenFilterConfigurer());
    }

    private static class PermissiveCorsConfigurationSource implements CorsConfigurationSource {
        @Override
        public CorsConfiguration getCorsConfiguration(final HttpServletRequest request) {
            final CorsConfiguration configuration = new CorsConfiguration();
            configuration.setAllowCredentials(true);
            configuration.setAllowedOrigins(Collections.singletonList("http://localhost:3000/"));
            configuration.setAllowedMethods(Arrays.asList(
                    "GET",
                    "POST",
                    "PUT",
                    "DELETE"
            ));
            configuration.setAllowedHeaders(Arrays.asList(
                    "Content-Type",
                    "X-Requested-With",
                    "accept",
                    "Origin",
                    "Access-Control-Request-Method",
                    "Access-Control-Request-Headers",
                    "Authorization"));
            return configuration;
        }
    }
}
