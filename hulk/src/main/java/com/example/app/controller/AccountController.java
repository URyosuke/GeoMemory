package com.example.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.models.AccountRequest;
import com.example.app.service.AccountService;

import reactor.core.publisher.Mono;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/account")
public class AccountController {
    @Autowired
    AccountService accountService;

    //サインインの処理
    @PostMapping("/signin")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Integer> signin(@RequestBody AccountRequest accountRequest) {
        String mailaddress = accountRequest.getMailaddress();
        String password = accountRequest.getPassword();

        return accountService.signin(mailaddress, password);
    }

    //サインアップの処理
    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Integer> signup(@RequestBody AccountRequest accountRequest) {
        return accountService.regist(accountRequest);
    }

    //サインアップの処理
    // @PostMapping("/signup")
    // @ResponseStatus(HttpStatus.CREATED)
    // public Mono<Integer> signup(@RequestBody AccountRequest accountRequest) {
    //     Mono<Integer> userid = accountService.regist(accountRequest);
    //     userid.subscribe(integerValue -> {
    //         int intValue = integerValue != null ? integerValue : 0; // ヌルの場合は0
    //         profileService.regist(intValue);
    //     });

    //     return userid;
    // }

    

    //@GetMapping("/apps")
    //@ResponseStatus(HttpStatus.OK)
    //public Flux<Account> getAllTutorials(@RequestParam(required = false) String title) {
    //if (title == null)
    //    return appService.findAll();
    //else
    //    return appService.findByTitleContaining(title);
    //}

    //@GetMapping("/apps/{id}")
    //@ResponseStatus(HttpStatus.OK)
    //public Mono<Account> getTutorialById(@PathVariable("id") int id) {
    //return appService.findById(id);
    //}

    //@PutMapping("/apps/{id}")
    //@ResponseStatus(HttpStatus.OK)
    //public Mono<Account> updateTutorial(@PathVariable("id") int id, @RequestBody Account app) {
    //return appService.update(id, app);
    //}

    //@DeleteMapping("/apps/{id}")
    //@ResponseStatus(HttpStatus.NO_CONTENT)
    //public Mono<Void> deleteTutorial(@PathVariable("id") int id) {
    //return appService.deleteById(id);
    //}

    //@DeleteMapping("/apps")
    //@ResponseStatus(HttpStatus.NO_CONTENT)
    //public Mono<Void> deleteAllTutorials() {
    //return appService.deleteAll();
    //}

    //@GetMapping("/apps/published")
    //@ResponseStatus(HttpStatus.OK)
    //public Flux<Account> findByPublished() {
    //return appService.findByPublished(true);
    //}
}
