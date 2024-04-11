package com.example.app.models;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class StorageRequest {
    private int userid;

    private LocalDateTime datetime;
}
