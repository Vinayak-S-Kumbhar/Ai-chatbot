package com.example.Ai_chatbot_bakend.Service;

import com.example.Ai_chatbot_bakend.Dto.ChatHistoryDTO;
import com.example.Ai_chatbot_bakend.entity.ChatHistory;

import java.util.List;

public interface ChatHistoryService {

    ChatHistory addHistory(String user, String conversationId, String query, String responce);

//    Map<String, List<ChatMessages>> getUserChatHistory(String userId);

    List<ChatHistoryDTO> getUserChatHistory(String userId);
}
