package com.example.Ai_chatbot_bakend.Service.Impl;

import com.example.Ai_chatbot_bakend.Service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
@RequiredArgsConstructor
public class AiServiceImpl implements AiService {

    private final ChatClient chatClient;

    @Override
    public String streamChat(String query, String chatId) {
        return chatClient
                .prompt(query)
                .advisors(advisorSpec -> advisorSpec.param(ChatMemory.CONVERSATION_ID,chatId))
                .call().content();
    }


}
