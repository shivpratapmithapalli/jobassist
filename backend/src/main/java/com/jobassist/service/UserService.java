package com.jobassist.service;

import com.jobassist.dto.AuthResponse;
import com.jobassist.dto.LoginRequest;
import com.jobassist.dto.RegisterRequest;
import com.jobassist.model.User;
import com.jobassist.repository.UserRepository;
import com.jobassist.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

/**
 * User service for authentication and user management operations
 */
@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    @Lazy
    private AuthenticationManager authenticationManager;

    /**
     * Load user by username for Spring Security
     * @param username the username (email)
     * @return UserDetails implementation
     * @throws UsernameNotFoundException if user not found
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities(new ArrayList<>()) // No roles for now, just basic auth
                .build();
    }

    /**
     * Register a new user
     * @param registerRequest the registration request
     * @return authentication response with JWT token
     * @throws RuntimeException if email already exists
     */
    @Transactional
    public AuthResponse registerUser(RegisterRequest registerRequest) {
        // Validate JWT signing key BEFORE any DB changes so failures don't persist data
        jwtUtils.assertSigningKeyIsValid();

        // Check if email already exists
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email is already registered");
        }

        // Create new user
        User user = new User();
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setPhone(registerRequest.getPhone());
        user.setLocation(registerRequest.getLocation());
        user.setEmailVerified(true); // For now, auto-verify
        user.setProfileCompleted(false);

        // Save user
        User savedUser = userRepository.save(user);

        // Generate JWT token
        UserDetails userDetails = loadUserByUsername(savedUser.getEmail());
        String token = jwtUtils.generateToken(userDetails);

        return new AuthResponse(token, savedUser);
    }

    /**
     * Authenticate user login
     * @param loginRequest the login request
     * @return authentication response with JWT token
     * @throws RuntimeException if authentication fails
     */
    public AuthResponse authenticateUser(LoginRequest loginRequest) {
        try {
            // Authenticate with Spring Security
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
                )
            );

            // Get user details
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User user = userRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Generate JWT token
            String token = jwtUtils.generateToken(userDetails);

            return new AuthResponse(token, user);
        } catch (Exception e) {
            throw new RuntimeException("Invalid email or password");
        }
    }

    /**
     * Get user profile by email
     * @param email the user's email
     * @return the user
     * @throws RuntimeException if user not found
     */
    public User getUserProfile(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    /**
     * Update user profile
     * @param email the user's email
     * @param updates the user updates
     * @return updated user
     * @throws RuntimeException if user not found
     */
    public User updateUserProfile(String email, User updates) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update allowed fields
        if (updates.getName() != null) {
            user.setName(updates.getName());
        }
        if (updates.getPhone() != null) {
            user.setPhone(updates.getPhone());
        }
        if (updates.getLocation() != null) {
            user.setLocation(updates.getLocation());
        }
        if (updates.getCurrentRole() != null) {
            user.setCurrentRole(updates.getCurrentRole());
        }
        if (updates.getExperienceLevel() != null) {
            user.setExperienceLevel(updates.getExperienceLevel());
        }
        if (updates.getSalaryExpectation() != null) {
            user.setSalaryExpectation(updates.getSalaryExpectation());
        }

        // Check if profile is now completed
        boolean isCompleted = user.getName() != null && !user.getName().trim().isEmpty() &&
                            user.getPhone() != null && !user.getPhone().trim().isEmpty() &&
                            user.getLocation() != null && !user.getLocation().trim().isEmpty() &&
                            user.getCurrentRole() != null && !user.getCurrentRole().trim().isEmpty();
        
        user.setProfileCompleted(isCompleted);

        return userRepository.save(user);
    }

    /**
     * Check if email exists
     * @param email the email to check
     * @return true if exists, false otherwise
     */
    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    /**
     * Get user by ID
     * @param id the user ID
     * @return the user
     * @throws RuntimeException if user not found
     */
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}