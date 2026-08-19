package com.example.Ai_chatbot_bakend.Service.Impl;

import com.example.Ai_chatbot_bakend.Controler.ChatHistoryControler;
import com.example.Ai_chatbot_bakend.Dto.ChatResponse;
import com.example.Ai_chatbot_bakend.Repository.UserRepository;
import com.example.Ai_chatbot_bakend.Service.AiService;
import com.example.Ai_chatbot_bakend.Service.ChatHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AiServiceImpl implements AiService {

    private final ChatClient chatClient;
    private final ChatHistoryService chatHistoryService;


    @Override
    public String streamChat(String query, String chatId,String userId) {

        var response = chatClient
                .prompt()
                .user(query)
                .advisors(advisorSpec ->
                        advisorSpec.param(ChatMemory.CONVERSATION_ID, chatId))
                .call()
                .content();

        chatHistoryService.addHistory(userId,chatId,query,response);

        return response;
    }

}