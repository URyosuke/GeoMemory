package com.example.app.repositories;

import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;

import com.example.app.models.Follow;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface FollowRepository extends R2dbcRepository<Follow, Integer>{
    Flux<Follow> findByUserid(int userid);
    Flux<Follow> findByFollowinguserid(int userid);

    Mono<Follow> deleteByUseridAndFollowinguserid(int userid, int followinguserid);
}
