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
// @Table(name = "follow")
public class Follow {
    @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int followid;

    private int userid;

    private int followinguserid;

    public Follow(){

    }

    public Follow(int followid, int userid, int followinguserid){
        this.followid = followid;
        this.userid = userid;
        this.followinguserid = followinguserid;
    }
}
