package com.example.app.models;

import org.springframework.data.annotation.Id;

// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.Table;
import lombok.Data;

@Data
// @Entity
// @Table(name = "profile")
public class Profile {
    @Id
    public int profileid;
    // @Column(name = "userId")
    private int userid;

    // @Column(name = "userName")
    private String username;

    // @Column(name = "prof_img")
    // private byte[] profimg;
    private String imgpath;

    // @Column(name = "followingNumber")
    //private int followingnumber;

    // @Column(name = "followerNumber")
    //private int followernumber;

    // @Column(name = "postNumber")
    //private int postnumber;

    public Profile(){

    }

    public Profile(int profileid,int userid, String username, String imgpath){
        this.profileid = profileid;
        this.userid = userid;
        this.username = username;
        this.imgpath = imgpath;
        //this.followingnumber = followingnumber;
        //this.followernumber = followernumber;
        //this.postnumber = postnumber;
    }

    // public void setProfimg(int i, int j, int k, int l, int m) {
    // }

}
