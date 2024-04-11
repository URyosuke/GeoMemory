package com.example.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app.models.Account;
import com.example.app.models.AccountRequest;
import com.example.app.repositories.AccountRepository;

//import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class AccountService {
    @Autowired
    AccountRepository accountRepository;

    public Mono<Integer> signin(String mail, String pass) {
        return accountRepository.findByMailaddressAndPassword(mail, pass)
                .map(Account::getUserid)
                .switchIfEmpty(Mono.just(-1)); // 該当する行が見つからない場合には-1を返す
               //.map(searchedAccount -> searchedAccount.getUserid());
    }

    public Mono<Integer> regist(AccountRequest accountRequest){
        var account = new Account();
        account.setMailaddress(accountRequest.getMailaddress());
        account.setPassword(accountRequest.getPassword());

        return accountRepository.save(account)
        .map(savedAccount -> savedAccount.getUserid())
        .onErrorReturn(-1);
    }

    // public Mono<Account> save(Account account) {
    // return accountRepository.save(account);
    // }

    //public Flux<Account> findAll() {
    //return accountRepository.findAll();
    //}

    //public Flux<Account> findByTitleContaining(String title) {
    //return appRepository.findByTitleContaining(title);
    //}

    //public Mono<Account> findById(int id) {
    //return accountRepository.findById(id);
    //}

    //public Mono<Boolean> isUseridUnique(Integer[] userid) {
    //    return appRepository.existsById(userid);
    //}

    //public Account update(int id, Account account) {
    //return accountRepository.findById(id).map(Optional::of).defaultIfEmpty(Optional.empty())
    //    .flatMap(optionalAccount -> {
    //        if (optionalAccount.isPresent()) {
    //        account.setUserid(id);
    //        return accountRepository.save(account);
    //        }

    //        return Mono.empty();
    //    });
    //}

    //public Void deleteById(int id) {
    //return accountRepository.deleteById(id);
    //}

    //public Void deleteAll() {
    //return accountRepository.deleteAll();
    //}

    //public Flux<Account> findByPublished(boolean isPublished) {
    // return appRepository.findByPublished(isPublished);
    //}

}
