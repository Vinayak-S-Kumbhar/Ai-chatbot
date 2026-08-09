package com.example.Ai_chatbot_bakend.Controler;

import com.example.Ai_chatbot_bakend.Dto.LoginDto;
import com.example.Ai_chatbot_bakend.Dto.LoginResDto;
import com.example.Ai_chatbot_bakend.Dto.SignUpDto;
import com.example.Ai_chatbot_bakend.Service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/Auth")
public class AuthControler {

    private final AuthService authService;

    @PostMapping("/signUp")
    public ResponseEntity<String> signUp(@RequestBody SignUpDto signUpDto){
        return ResponseEntity.ok(authService.signUp(signUpDto));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResDto> login(@RequestBody LoginDto loginDto){
        return ResponseEntity.ok(authService.login(loginDto));
    }
}
