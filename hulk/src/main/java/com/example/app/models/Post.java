package com.example.app.models;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;

// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Table;
import lombok.Data;
import reactor.core.publisher.Mono;

@Data
// @Entity
// @Table(name = "post")
public class Post {
    @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int postid;

    private String content;

    // @Column(name = "post_img")
    // private byte[] postimg;
    private String imgpath;

    private LocalDateTime datetime;

    private BigDecimal latitude;

    private BigDecimal longitude;

    private int userid;

    public Post() {

    }

    public Post(int postid, String content, String imgpath, LocalDateTime datetime, BigDecimal latitude, BigDecimal longitude, int userid) {
        this.postid = postid;
        this.content = content;
        this.imgpath = imgpath;
        this.datetime = datetime;
        this.latitude = latitude;
        this.longitude = longitude;
        this.userid = userid;
    }
    
    //@Override
    //public String toString() {
    //return "Account [userid=" + userid + ", mailaddress=" + mailaddress + ", password=" + password + "]";
    //}

}
