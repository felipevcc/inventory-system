package com.inventorysystem.Backend.dto.data.summary;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSummaryDTO {
    private Long totalUsers;
    private Long totalAdminUsers;
}
