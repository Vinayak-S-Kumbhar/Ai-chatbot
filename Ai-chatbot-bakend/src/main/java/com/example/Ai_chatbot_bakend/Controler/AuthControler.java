package com.example.Ai_chatbot_bakend.Controler;

import com.example.Ai_chatbot_bakend.Dto.LoginDto;
import com.example.Ai_chatbot_bakend.Dto.LoginResDto;
import com.example.Ai_chatbot_bakend.Dto.SignUpDto;
import com.example.Ai_chatbot_bakend.Service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/Auth")
@CrossOrigin(value = "http://localhost:5173")
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
