package com.madeeasy.controller;


import com.madeeasy.dto.UserRequest;
import com.madeeasy.dto.UserResponse;
import com.madeeasy.service.JwtUtils;
import com.madeeasy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/welcome")
    public ResponseEntity<String> welcome() {
        return ResponseEntity.ok("welcome to madeeasy.com from demo project");
    }

    @PostMapping("/api/authentication")
    public ResponseEntity<?> getAuthenticated(@RequestBody UserRequest userRequest) {
        String token = null;
        boolean flag = userService.validateUserNameAndPassword(userRequest.getName(), userRequest.getPassword());
        if (flag) {
            System.out.println(flag);
            token = jwtUtils.generateToken(userRequest.getName());
            System.out.println(token);
        }
        return ResponseEntity.ok(new UserResponse(token));
    }

    @PostMapping("/api/register")
    public ResponseEntity<?> register(@RequestBody UserRequest userRequest) {
        boolean flag = userService.registerNewUser(userRequest.getName(),userRequest.getPassword());
        if (flag) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }
}
