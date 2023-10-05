package com.madeeasy.service;


import com.madeeasy.dto.UserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
//    private final UserRepository userRepository;

    private List<UserRequest> userRequests = new ArrayList<>();

    public String getName() {
        return "pabitra";
    }

    public String getPassword() {
        return "1234";
    }

    public boolean validateUserNameAndPassword(String name, String password) {
        return getName().equals(name) && getPassword().equals(password);
    }

    public boolean registerNewUser(String name, String password) {
        return userRequests.add(new UserRequest(name, password));
    }
}
