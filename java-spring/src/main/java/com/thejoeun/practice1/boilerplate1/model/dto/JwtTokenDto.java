package com.thejoeun.practice1.boilerplate1.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JwtTokenDto {
    private String grantType;  //token
    private String accessToken;
    private Long tokenExpiresIn;
}
