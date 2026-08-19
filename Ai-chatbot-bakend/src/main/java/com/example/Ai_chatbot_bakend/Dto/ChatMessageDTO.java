package com.example.Ai_chatbot_bakend.Dto;

import com.example.Ai_chatbot_bakend.config.Type;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageDTO {

    private String id;

    private String content;

    private Type type;

    private LocalDateTime dateTime;

    private int sequence;
}
