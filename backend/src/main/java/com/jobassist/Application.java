package com.jobassist;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * Main Spring Boot application class for JobAssist
 * AI-powered job application management platform
 * 
 * @author JobAssist Team
 * @version 1.0.0
 */
@SpringBootApplication
@EnableJpaAuditing
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
        System.out.println("🚀 JobAssist Backend is running successfully!");
        System.out.println("📝 Ready to handle job applications and resume analysis");
    }
}