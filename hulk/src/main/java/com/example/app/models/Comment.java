package com.example.app.models;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;

// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Table;
import lombok.Data;

@Data
// @Entity
// @Table(name = "comment")
public class Comment {
    @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentid;

    private int postid;

    private int userid;

    private String content;

    private LocalDateTime datetime;

    public Comment(){

    }

    public Comment(int commentid, int postid, int userid, String content, LocalDateTime datetime){
        this.commentid = commentid;
        this.postid = postid;
        this.userid = userid;
        this.content = content;
        this.datetime = datetime;
    }
}
