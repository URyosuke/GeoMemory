package com.example.app.repositories;

import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;

import com.example.app.models.Comment;

@Repository
public interface CommentRepository extends R2dbcRepository<Comment, Integer> {
    
}
