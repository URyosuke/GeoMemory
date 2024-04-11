package com.example.app.models;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class CommentRequest {
    private int userid;
    private int postid;
    private String content;
    private LocalDateTime datetime; 
}
