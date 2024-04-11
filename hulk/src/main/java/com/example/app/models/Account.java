package com.example.app.models;

import org.springframework.data.annotation.Id;

// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Table;
import lombok.Data;

@Data
// @Entity
// @Table(name = "account")
public class Account {
    @Id
    // @Column(name="userid")
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int userid;

    // @Column(name="mailaddress")
    private String mailaddress;

    // @Column(name="password")
    private String password;

    public Account() {

    }

    public Account(int userId, String mailaddress, String password) {
        this.userid = userId;
        this.mailaddress = mailaddress;
        this.password = password;
    }
    
    // @Override
    // public String toString() {
    // return "Account [userid=" + userid + ", mailaddress=" + mailaddress + ", password=" + password + "]";
    // }

}
