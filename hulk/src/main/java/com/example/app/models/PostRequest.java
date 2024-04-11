package com.example.app.models;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class PostRequest {
    private String content;

    // private MultipartFile postimg;

    private LocalDateTime datetime;

    private BigDecimal latitude;

    private BigDecimal longitude;

    private int userid;
}
