package com.inventorysystem.Backend.controller;

import com.inventorysystem.Backend.dto.data.DataSummaryDTO;
import com.inventorysystem.Backend.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/data")
@CrossOrigin
public class DataController {

    @Autowired
    DataService dataService;

    @GetMapping("/summary")
    ResponseEntity<DataSummaryDTO> getDataSummary() {
        return ResponseEntity.status(HttpStatus.OK).body(dataService.getDataSummary());
    }
}
