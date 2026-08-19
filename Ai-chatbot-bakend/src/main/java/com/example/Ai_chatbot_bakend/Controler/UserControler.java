package com.example.Ai_chatbot_bakend.Controler;

import com.example.Ai_chatbot_bakend.Dto.UserResponceDto;
import com.example.Ai_chatbot_bakend.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(value = "http://localhost:5173/")
public class UserControler {

    private final UserService userService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<UserResponceDto> getUserInfo(@PathVariable String userId){
        return ResponseEntity.ok(userService.getUserInfo(userId));
    }

}
