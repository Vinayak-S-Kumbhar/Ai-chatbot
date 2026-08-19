package com.example.Ai_chatbot_bakend.Repository;

import com.example.Ai_chatbot_bakend.entity.ChatMessages;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessagesRepository extends JpaRepository<ChatMessages, String> {
}