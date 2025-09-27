package com.jobassist.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * Job entity representing job applications saved by users
 */
@Entity
@Table(name = "jobs")
@EntityListeners(AuditingEntityListener.class)
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Job title is required")
    @Size(max = 200, message = "Job title cannot exceed 200 characters")
    @Column(name = "job_title", nullable = false, length = 200)
    private String jobTitle;

    @NotBlank(message = "Company name is required")
    @Size(max = 150, message = "Company name cannot exceed 150 characters")
    @Column(name = "company_name", nullable = false, length = 150)
    private String companyName;

    @Column(name = "job_url", length = 500)
    private String jobUrl;

    @Column(name = "location", length = 200)
    private String location;

    @Column(name = "salary_range", length = 100)
    private String salaryRange;

    @Enumerated(EnumType.STRING)
    @Column(name = "job_type")
    private JobType jobType;

    @Enumerated(EnumType.STRING)
    @Column(name = "application_status")
    private ApplicationStatus applicationStatus = ApplicationStatus.SAVED;

    @Column(name = "job_description", columnDefinition = "TEXT")
    private String jobDescription;

    @Column(name = "requirements", columnDefinition = "TEXT")
    private String requirements;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @Column(name = "applied_date")
    private LocalDateTime appliedDate;

    @Column(name = "deadline")
    private LocalDateTime deadline;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public Job() {}

    public Job(String jobTitle, String companyName, User user) {
        this.jobTitle = jobTitle;
        this.companyName = companyName;
        this.user = user;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getJobUrl() {
        return jobUrl;
    }

    public void setJobUrl(String jobUrl) {
        this.jobUrl = jobUrl;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getSalaryRange() {
        return salaryRange;
    }

    public void setSalaryRange(String salaryRange) {
        this.salaryRange = salaryRange;
    }

    public JobType getJobType() {
        return jobType;
    }

    public void setJobType(JobType jobType) {
        this.jobType = jobType;
    }

    public ApplicationStatus getApplicationStatus() {
        return applicationStatus;
    }

    public void setApplicationStatus(ApplicationStatus applicationStatus) {
        this.applicationStatus = applicationStatus;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }

    public String getRequirements() {
        return requirements;
    }

    public void setRequirements(String requirements) {
        this.requirements = requirements;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDateTime getAppliedDate() {
        return appliedDate;
    }

    public void setAppliedDate(LocalDateTime appliedDate) {
        this.appliedDate = appliedDate;
    }

    public LocalDateTime getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDateTime deadline) {
        this.deadline = deadline;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    @Override
    public String toString() {
        return "Job{" +
                "id=" + id +
                ", jobTitle='" + jobTitle + '\'' +
                ", companyName='" + companyName + '\'' +
                ", location='" + location + '\'' +
                ", jobType=" + jobType +
                ", applicationStatus=" + applicationStatus +
                ", appliedDate=" + appliedDate +
                ", createdAt=" + createdAt +
                '}';
    }

    /**
     * Job type enum
     */
    public enum JobType {
        FULL_TIME("Full Time"),
        PART_TIME("Part Time"),
        CONTRACT("Contract"),
        INTERNSHIP("Internship"),
        FREELANCE("Freelance"),
        TEMPORARY("Temporary");

        private final String displayName;

        JobType(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }

    /**
     * Application status enum
     */
    public enum ApplicationStatus {
        SAVED("Saved"),
        APPLIED("Applied"),
        IN_PROGRESS("In Progress"),
        INTERVIEW_SCHEDULED("Interview Scheduled"),
        INTERVIEWED("Interviewed"),
        OFFER_RECEIVED("Offer Received"),
        REJECTED("Rejected"),
        WITHDRAWN("Withdrawn"),
        ACCEPTED("Accepted");

        private final String displayName;

        ApplicationStatus(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }
}