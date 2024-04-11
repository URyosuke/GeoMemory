package com.example.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.Comment;
import com.example.app.models.CommentRequest;
import com.example.app.service.CommentService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/comment")
public class CommentController {
    @Autowired
    CommentService commentService;

    //コメント登録処理
    @PostMapping("/post")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Void> post(@RequestBody CommentRequest commentRequest) {
        return commentService.post(commentRequest);
    }

    //コメント全権取得処理
    @GetMapping("/get/all")
    @ResponseStatus(HttpStatus.OK)
    public Flux<Comment> getAllComments() {
        return commentService.findAll();
    // if (title == null)
    //    return appService.findAll();
    // else
    //    return appService.findByTitleContaining(title);
    // }
    }
}
