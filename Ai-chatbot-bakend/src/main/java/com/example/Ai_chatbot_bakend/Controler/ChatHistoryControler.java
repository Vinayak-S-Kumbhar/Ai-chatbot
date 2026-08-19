package com.example.Ai_chatbot_bakend.Controler;

import com.example.Ai_chatbot_bakend.Dto.ChatHistoryDTO;
import com.example.Ai_chatbot_bakend.Dto.ChatResponse;
import com.example.Ai_chatbot_bakend.Service.ChatHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
//@CrossOrigin(value = "http://localhost:5173")
public class ChatHistoryControler {

    private final ChatHistoryService chatHistoryService;

    @GetMapping("/history/{userId}")
    public List<ChatHistoryDTO> getUserChatHistory(@PathVariable String userId){
        return chatHistoryService.getUserChatHistory(userId);
    }
}
