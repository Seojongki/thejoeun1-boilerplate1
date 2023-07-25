package com.thejoeun.practice1.boilerplate1.config;

import com.thejoeun.practice1.boilerplate1.config.jwt.JwtAccessDeniedHandler;
import com.thejoeun.practice1.boilerplate1.config.jwt.JwtSecurityConfig;
import com.thejoeun.practice1.boilerplate1.config.jwt.JwtTokenProvider;
import com.thejoeun.practice1.boilerplate1.config.jwt.JwtAuthenticationEntryPoint;

import com.thejoeun.practice1.boilerplate1.config.oauth.OAuth2AuthorizationRequestBasedOnCookieRepository;
import com.thejoeun.practice1.boilerplate1.config.oauth.OAuth2CustomAuthenticationSuccessHandler;
import com.thejoeun.practice1.boilerplate1.config.oauth.OAuth2CustomUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

import static org.springframework.boot.autoconfigure.security.servlet.PathRequest.toH2Console;


@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@Component
public class WebSecurityConfig {

    private final JwtTokenProvider jwtTokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final OAuth2CustomUserService oAuth2CustomUserService;


    @Bean
    public WebSecurityCustomizer configure() {
        return (web) -> web.ignoring()
                .requestMatchers(toH2Console())
//                .requestMatchers("/img/**", "/css/**", "/js/**")
//                .antMatchers("/img/**", "/css/**", "/js/**")
                ;
    }



    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http
            , HandlerMappingIntrospector introspector
    ) throws Exception {
        MvcRequestMatcher.Builder mvcMatcherBuilder = new MvcRequestMatcher.Builder(introspector);
        http
                .httpBasic().disable()
                .csrf().disable()
                .formLogin().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)
                .and()
                //            .authorizeHttpRequests(request -> request
//                    .requestMatchers(mvcMatcherBuilder.pattern("/auth3/**")).permitAll()
//                    .requestMatchers(mvcMatcherBuilder.pattern("/auth4/**")).permitAll()
//                    .anyRequest().authenticated()
//            )
                .authorizeHttpRequests()
                .requestMatchers(mvcMatcherBuilder.pattern("/auth/**")).permitAll()
//            .requestMatchers(AntPathRequestMatcher.antMatcher("/auth2/**")).permitAll()
                .anyRequest().authenticated()
                .and()
                .oauth2Login()
//                //인증에 성공하면 실행할 handler (redirect 시킬 목적)
                .successHandler(customAuth2SuccessHandler())
                //OAuth 2.0 Provider로부터 사용자 정보를 가져오는 엔드포인트를 지정하는 메서드
                .userInfoEndpoint()
                //OAuth 2.0 인증이 처리되는데 사용될 사용자 서비스를 지정하는 메서드
                .userService(oAuth2CustomUserService)

        ;
        http.apply(new JwtSecurityConfig(jwtTokenProvider));

        return http.build();
    }

    @Bean
    public OAuth2CustomAuthenticationSuccessHandler customAuth2SuccessHandler() {
//        return new CustomAuthenticationSuccessHandler(jwtTokenProvider, memberService);
        return new OAuth2CustomAuthenticationSuccessHandler(oAuth2CustomUserService);
    }


//    @Bean
//    public OAuth2AuthorizationRequestBasedOnCookieRepository oAuth2AuthorizationRequestBasedOnCookieRepository() {
//        return new OAuth2AuthorizationRequestBasedOnCookieRepository();
//    }


    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

}
