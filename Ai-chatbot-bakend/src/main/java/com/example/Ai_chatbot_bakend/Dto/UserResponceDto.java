package com.example.Ai_chatbot_bakend.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponceDto {

    private String id;

    private String username;

    private String email;
}
