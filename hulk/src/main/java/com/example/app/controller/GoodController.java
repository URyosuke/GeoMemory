package com.example.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.GoodRequest;
import com.example.app.service.GoodService;
import reactor.core.publisher.Mono;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/good")
public class GoodController {
    @Autowired
    GoodService goodService;

    //Goodの登録
    @PostMapping("/post")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Void> registGood(@RequestBody GoodRequest goodRequest){
        return goodService.regist(goodRequest);
    }

    // goodの取得
    @PostMapping("/get")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Boolean> getProfile(@RequestBody GoodRequest goodRequest){
        return goodService.getGood(goodRequest);
    }

    // goodの全件取得
    // @GetMapping("/get/all")
    // @ResponseStatus(HttpStatus.OK)
    // public Flux<Good> getGoodAll(){
    //     return goodService.findAll();
    // }

    //goodの削除
    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> deleteFollow(@RequestBody GoodRequest goodRequest) {
        return goodService.delete(goodRequest);
    }
}
