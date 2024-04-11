package com.example.app.models;

import org.springframework.data.annotation.Id;

// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.Table;
import lombok.Data;

@Data
// @Entity
// @Table(name = "good")
public class Good {
    @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int goodid;

    private int userid;

    private int postid;

    public Good(){

    }
    
    public Good(int goodid, int userid, int postid){
        this.goodid = goodid;
        this.userid = userid;
        this.postid = postid;
    }
}
