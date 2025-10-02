package com.jobhive.repository;

import com.jobhive.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for User entity operations
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find user by email address
     * @param email the email address
     * @return Optional containing the user if found
     */
    Optional<User> findByEmail(String email);

    /**
     * Check if user exists by email
     * @param email the email address
     * @return true if user exists, false otherwise
     */
    boolean existsByEmail(String email);

    /**
     * Find user by email with job applications (for optimization)
     * @param email the email address
     * @return Optional containing the user with job applications if found
     */
    @Query("SELECT u FROM User u LEFT JOIN FETCH u.jobApplications WHERE u.email = :email")
    Optional<User> findByEmailWithJobApplications(@Param("email") String email);

    /**
     * Count total number of registered users
     * @return total user count
     */
    long count();

    /**
     * Find users by profile completion status
     * @param profileCompleted the profile completion status
     * @return list of users with the specified profile completion status
     */
    @Query("SELECT u FROM User u WHERE u.profileCompleted = :profileCompleted")
    java.util.List<User> findByProfileCompleted(@Param("profileCompleted") Boolean profileCompleted);
}