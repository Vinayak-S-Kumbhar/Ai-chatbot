package com.example.Ai_chatbot_bakend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatHistory {

    @Id
    private String id;

    private String title;

    private String conversationId;

    private LocalDateTime createdAt;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "chatHistory", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ChatMessages> chatMessages = new ArrayList<>();
}
