package com.example.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.FollowRequest;
// import com.example.app.models.ProfileRequest;
// import com.example.app.repositories.FollowRepository;
import com.example.app.service.FollowService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/follow")
public class FollowController {
    @Autowired
    FollowService followService;

    // フォロー関係の登録
    @PostMapping("/post")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Void> postFollow(@RequestBody FollowRequest followRequest){
        return followService.post(followRequest);
    }
    
    // 自分がフォローしてる人を配列で取得
    @GetMapping("/get/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Flux<Integer> getFollow(@PathVariable("id") int userid){
        return followService.get(userid);
    }

    // 自分がフォローしてる人数を取得
    @GetMapping("/get/followingNumber/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Long> getFollowingNumber(@PathVariable("id") int userid){
        return followService.getFollowingNumber(userid);
    }

    // 自分をフォローしてる人数を取得
    @GetMapping("/get/followerNumber/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Long> getFollowerNumber(@PathVariable("id") int followinguserid){
        return followService.getFollowerNumber(followinguserid);
    }

    // フォロー解除
    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> deleteFollow(@RequestBody FollowRequest followRequest) {
        return followService.delete(followRequest);
    }
}
