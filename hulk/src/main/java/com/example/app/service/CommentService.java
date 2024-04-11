package com.example.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app.models.Comment;
import com.example.app.models.CommentRequest;
import com.example.app.repositories.CommentRepository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class CommentService {
    @Autowired
    CommentRepository commentRepository;

    public Mono<Void> post(CommentRequest commentRequest) {
        var comment = new Comment();
        comment.setPostid(commentRequest.getPostid());
        comment.setUserid(commentRequest.getUserid());
        comment.setContent(commentRequest.getContent());
        comment.setDatetime(commentRequest.getDatetime());
        
        return commentRepository.save(comment).then();
    }

    public Flux<Comment> findAll() {
    return commentRepository.findAll();
    }

    // public Mono<Comment> save(Comment comment) {
    // return commentRepository.save(comment);
    // }

    //public Post update(int id, Post post) {
    //return postRepository.findById(id).map(Optional::of).defaultIfEmpty(Optional.empty())
     //   .flatMap(optionalPost -> {
     //       if (optionalPost.isPresent()) {
     //       post.setUserid(id);
     //       return postRepository.save(post);
     //       }

     //       return Mono.empty();
     //   });
    //}
}
