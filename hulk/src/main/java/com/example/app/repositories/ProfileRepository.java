package com.example.app.repositories;

import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;

import com.example.app.models.Profile;

import reactor.core.publisher.Mono;

@Repository
public interface ProfileRepository extends R2dbcRepository<Profile, Integer>{
    Mono<Profile> findByUserid(int userid);
}
