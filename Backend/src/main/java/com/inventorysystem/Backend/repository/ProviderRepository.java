package com.inventorysystem.Backend.repository;

import com.inventorysystem.Backend.model.Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProviderRepository extends JpaRepository<Provider, Long> {

    @Procedure(procedureName = "Proc_get_all_providers")
    List<Provider> getAllProviders();

    @Procedure(procedureName = "Proc_get_provider_by_id")
    Provider getProviderById(@Param("Ip_provider_id") Long providerId);

    @Procedure(procedureName = "Proc_insert_provider", outputParameterName = "Op_provider_id")
    Long createProvider(
            @Param("Ip_name") String name,
            @Param("Ip_phone_number") String phoneNumber,
            @Param("Ip_email") String email
    );

    @Procedure(procedureName = "Proc_update_provider")
    void updateProvider(
            @Param("Ip_provider_id") Long providerId,
            @Param("Ip_name") String name,
            @Param("Ip_phone_number") String phoneNumber,
            @Param("Ip_email") String email
    );

    @Procedure(procedureName = "Proc_delete_provider")
    void deleteProvider(@Param("Ip_provider_id") Long providerId);
}
