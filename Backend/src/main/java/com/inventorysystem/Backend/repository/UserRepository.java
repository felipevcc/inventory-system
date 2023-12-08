package com.inventorysystem.Backend.repository;

import com.inventorysystem.Backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /*@Query("SELECT user FROM User user WHERE email = ?1 AND password = ?2")
    public User getLoginUser(String userEmail, String userPassword);*/

    @Procedure(procedureName = "Proc_get_all_users")
    List<User> getAllUsers();

    @Procedure(procedureName = "Proc_get_user_by_id")
    User getUserById(@Param("Ip_user_id") Long userId);

    @Procedure(procedureName = "Proc_insert_user", outputParameterName = "Op_user_id")
    Long createUser(
            @Param("Ip_name") String name,
            @Param("Ip_username") String username,
            @Param("Ip_password_hash") String passwordHash,
            @Param("Ip_phone_number") String phoneNumber,
            @Param("Ip_email") String email,
            @Param("Ip_admin") Boolean admin
    );

    @Procedure(procedureName = "Proc_update_user")
    void updateUser(
            @Param("Ip_user_id") Long userId,
            @Param("Ip_name") String name,
            @Param("Ip_username") String username,
            @Param("Ip_password_hash") String passwordHash,
            @Param("Ip_phone_number") String phoneNumber,
            @Param("Ip_email") String email,
            @Param("Ip_admin") String admin
    );

    @Procedure(procedureName = "Proc_delete_user")
    void deleteUser(@Param("Ip_user_id") Long userId);

    @Query("SELECT COUNT(*) FROM User user")
    Long countUsers();
}
