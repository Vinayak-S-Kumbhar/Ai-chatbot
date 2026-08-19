package com.example.Ai_chatbot_bakend.Dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ChatResponse {

    private String title;
    private String response;

}
