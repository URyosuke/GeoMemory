package com.example.app.models;

import lombok.Data;

@Data
public class FollowRequest {
    private int userid;
    private int followinguserid;
}
