package com.inventorysystem.Backend.repository;

import com.inventorysystem.Backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT user FROM User user WHERE email = ?1 AND password = ?2")
    public User getLoginUser(String userEmail, String userPassword);

}
