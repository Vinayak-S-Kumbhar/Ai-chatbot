package com.example.Ai_chatbot_bakend.Service;

import org.springframework.ai.chat.model.ChatResponse;
import reactor.core.publisher.Flux;

public interface AiService {
    String streamChat(String query, String chatId);


}
