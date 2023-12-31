package com.madeeasy.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Component
public class JwtUtils {
    private final static String SECRET_KEY =
            "ewpuYW1lOiJwYWJpdHJhIiwKcGFzc3dvcmVkOiIxMjM0IiwKdmlsbDoiYnJpbmRhYmFuY2hhayIsCnBvc3Q6InNhZ2FyYmFyaCIKfQ==";


    public String generateToken(String subject) {
        return Jwts.builder()
                .setId(UUID.randomUUID().toString()) // id
                .setSubject(subject) // subject
                .setIssuer("madeeasy") // provider
                .setIssuedAt(new Date(System.currentTimeMillis())) // issue time
                .setExpiration(new Date(System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(10))) // exp in minute
                .signWith(SignatureAlgorithm.HS256, getSignKey())
                .compact(); // return String
    }


    public Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(getSignKey())
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public Date getExpirationDate(String token) {
        return getClaims(token).getExpiration();
    }

    public String getUserName(String token) {
        return getClaims(token).getSubject();
    }

    public boolean isTokenExpired(String token) {
        Date expirationDate = getExpirationDate(token);
        return expirationDate.before(new Date(System.currentTimeMillis()));
    }

    public boolean validateToken(String token, String name) {
        String userName = getUserName(token);
        return userName.equals(name) && !isTokenExpired(token);
    }
}
















