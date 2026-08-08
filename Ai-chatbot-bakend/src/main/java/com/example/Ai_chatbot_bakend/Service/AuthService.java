package com.example.Ai_chatbot_bakend.Service;

import com.example.Ai_chatbot_bakend.Dto.LoginDto;
import com.example.Ai_chatbot_bakend.Dto.LoginResDto;
import com.example.Ai_chatbot_bakend.Dto.SignUpDto;
import org.jspecify.annotations.Nullable;

public interface AuthService {
    String signUp(SignUpDto signUpDto);

    LoginResDto login(LoginDto loginDto);

}
