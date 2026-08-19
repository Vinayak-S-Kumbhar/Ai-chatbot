package com.example.Ai_chatbot_bakend.Service;

import com.example.Ai_chatbot_bakend.Dto.UserResponceDto;
import org.jspecify.annotations.Nullable;

public interface UserService {
    UserResponceDto getUserInfo(String userId);
}
