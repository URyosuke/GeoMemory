package com.example.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app.models.Good;
import com.example.app.models.GoodRequest;
import com.example.app.repositories.GoodRepository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class GoodService {
    @Autowired
    GoodRepository goodRepository;

    public Mono<Void> regist(GoodRequest goodRequest){
        var good = new Good();

        good.setPostid(goodRequest.getPostid());
        good.setUserid(goodRequest.getUserid());
        return goodRepository.save(good).then();
        // .map(savedProfile -> savedProfile.getProfileid())
        // .onErrorReturn(-1);
    }

    // goodの取得
    public Mono<Boolean> getGood(GoodRequest goodRequest){
        return goodRepository.existsByPostidAndUserid(goodRequest.getPostid(), goodRequest.getUserid());
    }

    public Flux<Good> findAll() {
    return goodRepository.findAll();
    }

    public Mono<Void> delete(GoodRequest goodRequest){
        return goodRepository.deleteByPostidAndUserid(goodRequest.getPostid(), goodRequest.getUserid())
        .then();
        // .map(savedFollow -> savedFollow.getFollowid())
        // .onErrorReturn(-1);
    }
}