package com.jobhive.repository;

import com.jobhive.model.Job;
import com.jobhive.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Job entity operations
 */
@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    /**
     * Find all jobs for a specific user
     * @param user the user
     * @return list of jobs for the user
     */
    List<Job> findByUser(User user);

    /**
     * Find all jobs for a specific user with pagination
     * @param user the user
     * @param pageable pagination information
     * @return paginated list of jobs for the user
     */
    Page<Job> findByUser(User user, Pageable pageable);

    /**
     * Find jobs by user and application status
     * @param user the user
     * @param status the application status
     * @return list of jobs with the specified status
     */
    List<Job> findByUserAndApplicationStatus(User user, Job.ApplicationStatus status);

    /**
     * Find job by ID and user (for security)
     * @param id the job ID
     * @param user the user
     * @return Optional containing the job if found and belongs to user
     */
    Optional<Job> findByIdAndUser(Long id, User user);

    /**
     * Count jobs by user
     * @param user the user
     * @return total number of jobs for the user
     */
    long countByUser(User user);

    /**
     * Count jobs by user and status
     * @param user the user
     * @param status the application status
     * @return number of jobs with the specified status for the user
     */
    long countByUserAndApplicationStatus(User user, Job.ApplicationStatus status);

    /**
     * Find jobs by user and company name (case insensitive)
     * @param user the user
     * @param companyName the company name
     * @param pageable pagination information
     * @return paginated list of jobs from the specified company
     */
    @Query("SELECT j FROM Job j WHERE j.user = :user AND LOWER(j.companyName) LIKE LOWER(CONCAT('%', :companyName, '%'))")
    Page<Job> findByUserAndCompanyNameContainingIgnoreCase(@Param("user") User user, 
                                                          @Param("companyName") String companyName, 
                                                          Pageable pageable);

    /**
     * Find jobs by user and job title (case insensitive)
     * @param user the user
     * @param jobTitle the job title
     * @param pageable pagination information
     * @return paginated list of jobs with the specified title
     */
    @Query("SELECT j FROM Job j WHERE j.user = :user AND LOWER(j.jobTitle) LIKE LOWER(CONCAT('%', :jobTitle, '%'))")
    Page<Job> findByUserAndJobTitleContainingIgnoreCase(@Param("user") User user, 
                                                       @Param("jobTitle") String jobTitle, 
                                                       Pageable pageable);

    /**
     * Find jobs by user created within date range
     * @param user the user
     * @param startDate start date
     * @param endDate end date
     * @return list of jobs created within the date range
     */
    @Query("SELECT j FROM Job j WHERE j.user = :user AND j.createdAt BETWEEN :startDate AND :endDate")
    List<Job> findByUserAndCreatedAtBetween(@Param("user") User user, 
                                           @Param("startDate") LocalDateTime startDate, 
                                           @Param("endDate") LocalDateTime endDate);

    /**
     * Find jobs with upcoming deadlines
     * @param user the user
     * @param currentDate current date
     * @param futureDate future date to check until
     * @return list of jobs with deadlines between current and future date
     */
    @Query("SELECT j FROM Job j WHERE j.user = :user AND j.deadline BETWEEN :currentDate AND :futureDate")
    List<Job> findByUserAndDeadlineBetween(@Param("user") User user, 
                                          @Param("currentDate") LocalDateTime currentDate, 
                                          @Param("futureDate") LocalDateTime futureDate);
}