package com.example.Ai_chatbot_bakend.Service.Impl;

import com.example.Ai_chatbot_bakend.Dto.LoginDto;
import com.example.Ai_chatbot_bakend.Dto.LoginResDto;
import com.example.Ai_chatbot_bakend.Dto.SignUpDto;
import com.example.Ai_chatbot_bakend.Repository.UserRepository;
import com.example.Ai_chatbot_bakend.Service.AuthService;
import com.example.Ai_chatbot_bakend.entity.User;
import com.example.Ai_chatbot_bakend.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Override
    public String signUp(SignUpDto signUpDto) {
        User user = userRepository.findByEmail(signUpDto.getEmail()).orElse(null);

        if(user != null) {
            throw new RuntimeException("User Exist with this Email! Please login");
        }
        String userId = UUID.randomUUID().toString();
        User newUser = new User(userId,signUpDto.getUsername(),signUpDto.getEmail(),passwordEncoder.encode(signUpDto.getPassword()));

        User savedUser = userRepository.save(newUser);
        return "Signup Successfully";
    }

    @Override
    public LoginResDto login(LoginDto loginDto) {

        User user = userRepository.findByEmail(loginDto.getEmail()).orElseThrow(() ->
                new RuntimeException("user not found! Please Signup first"));

        if(!passwordEncoder.matches(loginDto.getPassword(),user.getPassword())){
            throw new RuntimeException("Wrong password!");
        }
        String jwtSecretKey = jwtUtils.genrateToken(user);
        return new LoginResDto(user.getId(), jwtSecretKey);
    }
}
