package com.example.Ai_chatbot_bakend.Service.Impl;

import com.example.Ai_chatbot_bakend.Dto.UserResponceDto;
import com.example.Ai_chatbot_bakend.Repository.UserRepository;
import com.example.Ai_chatbot_bakend.Service.UserService;
import com.example.Ai_chatbot_bakend.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserResponceDto getUserInfo(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new RuntimeException("User not found with this id : " + userId));

        return new UserResponceDto(user.getId(),user.getUsername(),user.getEmail());
    }
}
