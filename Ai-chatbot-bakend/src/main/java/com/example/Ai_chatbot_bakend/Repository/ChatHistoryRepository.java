package com.example.Ai_chatbot_bakend.Repository;

import com.example.Ai_chatbot_bakend.entity.ChatHistory;
import com.example.Ai_chatbot_bakend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatHistoryRepository extends JpaRepository<ChatHistory, String> {
    Optional<ChatHistory> findByUserAndConversationId(User user, String ConversationId);
}