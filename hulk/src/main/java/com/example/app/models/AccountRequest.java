package com.example.app.models;

import lombok.Data;

@Data
public class AccountRequest {
    private String mailaddress;
    private String password;
}