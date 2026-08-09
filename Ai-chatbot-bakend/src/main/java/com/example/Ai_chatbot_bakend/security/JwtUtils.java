package com.example.Ai_chatbot_bakend.security;

import com.example.Ai_chatbot_bakend.entity.User;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtils {

    private final String SECRET = "jksdhfiaydf5g56df4g56d4fg54dfgdfgdfg5df4ss685f5b48g7dhf54f";

    private final SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String genrateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("userid", user.getId())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 24))
                .signWith(key)
                .compact();
    }

    public SecretKey getKey() {
        return key;
    }

}
