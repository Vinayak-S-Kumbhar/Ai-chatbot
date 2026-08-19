package com.example.Ai_chatbot_bakend.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatHistoryDTO {

    private String id;

    private String conversationId;

    private String title;

    private List<ChatMessageDTO> messages;
}
