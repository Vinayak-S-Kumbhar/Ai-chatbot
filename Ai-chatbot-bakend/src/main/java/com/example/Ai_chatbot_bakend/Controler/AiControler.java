package com.example.Ai_chatbot_bakend.Controler;

import com.example.Ai_chatbot_bakend.Service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/public")
@CrossOrigin(value = "http://localhost:5173/")
public class AiControler {
    private final AiService aiService;

    @PostMapping("/chat")
    public ResponseEntity<String> streamChat(@RequestParam("q") String query, @RequestHeader String chatId){
        return ResponseEntity.ok(aiService.streamChat(query,chatId));
    }

}
