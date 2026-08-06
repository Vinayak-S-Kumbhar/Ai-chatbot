package com.example.Ai_chatbot_bakend.Controler;

import com.example.Ai_chatbot_bakend.Service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequiredArgsConstructor
@CrossOrigin(value = "http://localhost:5173/")
public class AiControler {
    private final AiService aiService;

    @PostMapping(path = "/chat", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<String> streamChat(@RequestParam("q") String query, @RequestHeader String chatId){
        return ResponseEntity.ok(aiService.streamChat(query,chatId));
    }

}
