package com.example.app.repositories;

import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;

import com.example.app.models.Good;

import reactor.core.publisher.Mono;

@Repository
public interface GoodRepository extends R2dbcRepository<Good, Integer>{

    Mono<Boolean> existsByPostidAndUserid(int postid, int userid);

    Mono<Void> deleteByPostidAndUserid(int postid, int userid);

}
