package com.example.Ai_chatbot_bakend.Service.Impl;

import com.example.Ai_chatbot_bakend.Dto.ChatHistoryDTO;
import com.example.Ai_chatbot_bakend.Dto.ChatMessageDTO;
import com.example.Ai_chatbot_bakend.Repository.ChatHistoryRepository;
import com.example.Ai_chatbot_bakend.Repository.UserRepository;
import com.example.Ai_chatbot_bakend.Service.ChatHistoryService;
import com.example.Ai_chatbot_bakend.config.Type;

import com.example.Ai_chatbot_bakend.entity.ChatHistory;
import com.example.Ai_chatbot_bakend.entity.ChatMessages;
import com.example.Ai_chatbot_bakend.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;


@Service
//@RequiredArgsConstructor

public class ChatHistoryServiceImpl implements ChatHistoryService {

    private final ChatHistoryRepository chatHistoryRepository;
    private final UserRepository userRepository;
    private final ChatClient chatClient;

    public ChatHistoryServiceImpl(ChatHistoryRepository chatHistoryRepository, UserRepository userRepository, ChatClient.Builder chatClient) {
        this.chatClient = chatClient.build();
        this.chatHistoryRepository = chatHistoryRepository;
        this.userRepository = userRepository;

    }

    @Override
    @Transactional
    @CacheEvict(
            cacheNames = "chatHistory",
            key = "#userId",
            beforeInvocation = false
    )
    public ChatHistory addHistory(String userId, String conversationId, String query, String response) {
        if (userId == null || userId.isBlank()
                || conversationId == null || conversationId.isBlank()) {
            return null;
        }
        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return null;
        }

        ChatHistory chatHistory = chatHistoryRepository.findByUserAndConversationId(user, conversationId).orElse(null);

        // New conversation
        if (chatHistory == null) {

            var title = chatClient
                    .prompt()
                    .user(userSpec -> userSpec.text("""
            Generate a concise title for the conversation based ONLY on the
            messages provided below.

            TITLE RULES:
            - Use ONLY the provided messages.
            - Do NOT use chat memory, database messages, previous conversation history,
              or any other context outside the provided messages.
            - Identify the main topic or primary user intent.
            - The title must contain 2-5 words.
            - Make it specific, natural, and meaningful.
            - Prefer terminology used by the user.
            - Ignore greetings, small talk, and irrelevant details.
            - If multiple topics exist, choose the dominant topic.
            - Match the language used in the provided messages.
            - Do not include quotes, emojis, prefixes, or punctuation.
            - Return ONLY the title. Do not explain your choice.
            
            MESSAGES:
            {messages}
            """).param("messages", response))
                    .call()
                    .content();

            chatHistory = ChatHistory.builder()
                    .id(UUID.randomUUID().toString())
                    .conversationId(conversationId)
                    .user(user)
                    .title(title)
                    .createdAt(LocalDateTime.now())
                    .build();

            ChatMessages userMessage = ChatMessages.builder()
                    .id(UUID.randomUUID().toString())
                    .type(Type.USER)
                    .content(query)
                    .dateTime(LocalDateTime.now())
                    .sequence(0)
                    .chatHistory(chatHistory)
                    .build();

            ChatMessages assistantMessage = ChatMessages.builder()
                    .id(UUID.randomUUID().toString())
                    .type(Type.ASSISTANT)
                    .content(response)
                    .dateTime(LocalDateTime.now())
                    .sequence(1)
                    .chatHistory(chatHistory)
                    .build();

            chatHistory.getChatMessages().add(userMessage);
            chatHistory.getChatMessages().add(assistantMessage);

        }
        // Existing conversation
        else {

            int nextSequence = chatHistory.getChatMessages().size();

            ChatMessages userMessage = ChatMessages.builder()
                    .id(UUID.randomUUID().toString())
                    .type(Type.USER)
                    .content(query)
                    .dateTime(LocalDateTime.now())
                    .sequence(nextSequence)
                    .chatHistory(chatHistory)
                    .build();

            ChatMessages assistantMessage = ChatMessages.builder()
                    .id(UUID.randomUUID().toString())
                    .type(Type.ASSISTANT)
                    .content(response)
                    .dateTime(LocalDateTime.now())
                    .sequence(nextSequence + 1)
                    .chatHistory(chatHistory)
                    .build();

            chatHistory.getChatMessages().add(userMessage);
            chatHistory.getChatMessages().add(assistantMessage);
        }

        return chatHistoryRepository.save(chatHistory);
    }

    @Override
    @Cacheable(cacheNames = "chatHistory", key = "#userId")
    public List<ChatHistoryDTO> getUserChatHistory(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new RuntimeException("User not found with this id : " + userId));

        List<ChatHistory> chatHistoryList = user.getChatHistoryList();

        return chatHistoryList.stream().sorted(Comparator.comparing(ChatHistory::getCreatedAt).reversed()).map(chatHistory -> {
            List<ChatMessageDTO> chatMessage = chatHistory.getChatMessages().stream().sorted(Comparator.comparing(ChatMessages::getSequence)).map(this::toDTO).toList();

            return ChatHistoryDTO.builder()
                    .id(chatHistory.getId())
                    .messages(chatMessage)
                    .conversationId(chatHistory.getConversationId())
                    .title(chatHistory.getTitle())
                    .build();
        }).toList();
    }

    private ChatMessageDTO toDTO(
            ChatMessages chatMessages
    ) {

        return ChatMessageDTO.builder()
                .id(chatMessages.getId())
                .content(chatMessages.getContent())
                .type(chatMessages.getType())
                .dateTime(chatMessages.getDateTime())
                .sequence(chatMessages.getSequence())
                .build();
    }
}
