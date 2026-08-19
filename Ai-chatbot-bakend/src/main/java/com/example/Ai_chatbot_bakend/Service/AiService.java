package com.example.Ai_chatbot_bakend.Service;

import com.example.Ai_chatbot_bakend.Dto.ChatResponse;
import reactor.core.publisher.Flux;

public interface AiService {
    String streamChat(String query, String chatId, String userId);
}
