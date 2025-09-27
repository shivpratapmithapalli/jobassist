package com.jobassist.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * User entity representing registered users in the JobAssist platform
 */
@Entity
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    @Column(nullable = false, length = 100)
    private String name;

    @Email(message = "Please provide a valid email address")
    @NotBlank(message = "Email is required")
    @Column(unique = true, nullable = false, length = 150)
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    @Column(nullable = false)
    private String password;

    @Column(length = 15)
    private String phone;

    @Column(length = 200)
    private String location;

    @Column(name = "`current_role`", length = 100)
    private String currentRole;

    @Enumerated(EnumType.STRING)
    @Column(name = "experience_level")
    private ExperienceLevel experienceLevel = ExperienceLevel.ENTRY;

    @Column(name = "salary_expectation", length = 50)
    private String salaryExpectation;

    @Column(name = "email_verified")
    private Boolean emailVerified = false;

    @Column(name = "profile_completed")
    private Boolean profileCompleted = false;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Job> jobApplications = new ArrayList<>();

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public User() {}

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCurrentRole() {
        return currentRole;
    }

    public void setCurrentRole(String currentRole) {
        this.currentRole = currentRole;
    }

    public ExperienceLevel getExperienceLevel() {
        return experienceLevel;
    }

    public void setExperienceLevel(ExperienceLevel experienceLevel) {
        this.experienceLevel = experienceLevel;
    }

    public String getSalaryExpectation() {
        return salaryExpectation;
    }

    public void setSalaryExpectation(String salaryExpectation) {
        this.salaryExpectation = salaryExpectation;
    }

    public Boolean getEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(Boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public Boolean getProfileCompleted() {
        return profileCompleted;
    }

    public void setProfileCompleted(Boolean profileCompleted) {
        this.profileCompleted = profileCompleted;
    }

    public List<Job> getJobApplications() {
        return jobApplications;
    }

    public void setJobApplications(List<Job> jobApplications) {
        this.jobApplications = jobApplications;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    // Helper methods
    public void addJobApplication(Job job) {
        jobApplications.add(job);
        job.setUser(this);
    }

    public void removeJobApplication(Job job) {
        jobApplications.remove(job);
        job.setUser(null);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", location='" + location + '\'' +
                ", currentRole='" + currentRole + '\'' +
                ", experienceLevel=" + experienceLevel +
                ", emailVerified=" + emailVerified +
                ", profileCompleted=" + profileCompleted +
                ", createdAt=" + createdAt +
                '}';
    }

    /**
     * Experience level enum for users
     */
    public enum ExperienceLevel {
        ENTRY("Entry Level"),
        MID("Mid Level"),
        SENIOR("Senior Level"),
        LEAD("Lead/Principal"),
        EXECUTIVE("Executive");

        private final String displayName;

        ExperienceLevel(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }
}