package com.jobassist.controller;

import com.jobassist.dto.AuthResponse;
import com.jobassist.dto.LoginRequest;
import com.jobassist.dto.RegisterRequest;
import com.jobassist.model.User;
import com.jobassist.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for user authentication and profile management
 */
@RestController
@RequestMapping("/user")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Register a new user
     * POST /api/v1/user/register
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            AuthResponse authResponse = userService.registerUser(registerRequest);
            return ResponseEntity.ok(authResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("Registration failed", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(new ErrorResponse("Internal server error", "Please try again later"));
        }
    }

    /**
     * Login user
     * POST /api/v1/user/login
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            AuthResponse authResponse = userService.authenticateUser(loginRequest);
            return ResponseEntity.ok(authResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("Login failed", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(new ErrorResponse("Internal server error", "Please try again later"));
        }
    }

    /**
     * Get current user profile
     * GET /api/v1/user/profile
     */
    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            
            User user = userService.getUserProfile(email);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("Profile fetch failed", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(new ErrorResponse("Internal server error", "Please try again later"));
        }
    }

    /**
     * Update user profile
     * PUT /api/v1/user/profile
     */
    @PutMapping("/profile")
    public ResponseEntity<?> updateUserProfile(@RequestBody User userUpdates) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            
            User updatedUser = userService.updateUserProfile(email, userUpdates);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("Profile update failed", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(new ErrorResponse("Internal server error", "Please try again later"));
        }
    }

    /**
     * Check if email exists (for validation)
     * GET /api/v1/user/check-email?email=test@example.com
     */
    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmail(@RequestParam String email) {
        try {
            boolean exists = userService.emailExists(email);
            return ResponseEntity.ok(new EmailCheckResponse(exists));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(new ErrorResponse("Email check failed", "Please try again later"));
        }
    }

    /**
     * Health check endpoint
     * GET /api/v1/user/health
     */
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("User service is running! 🚀");
    }

    // Helper classes for responses
    public static class ErrorResponse {
        private String error;
        private String message;
        private long timestamp;

        public ErrorResponse(String error, String message) {
            this.error = error;
            this.message = message;
            this.timestamp = System.currentTimeMillis();
        }

        // Getters
        public String getError() { return error; }
        public String getMessage() { return message; }
        public long getTimestamp() { return timestamp; }
    }

    public static class EmailCheckResponse {
        private boolean exists;

        public EmailCheckResponse(boolean exists) {
            this.exists = exists;
        }

        public boolean isExists() { return exists; }
    }
}