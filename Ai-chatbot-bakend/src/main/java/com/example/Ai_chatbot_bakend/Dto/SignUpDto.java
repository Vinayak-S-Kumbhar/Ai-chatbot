package com.example.Ai_chatbot_bakend.Dto;

import jakarta.persistence.Column;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SignUpDto {

    private String username;
    private String email;
    private String password;
}
