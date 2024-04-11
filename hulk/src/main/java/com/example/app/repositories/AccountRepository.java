package com.example.app.repositories;

import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;

import com.example.app.models.Account;

import reactor.core.publisher.Mono;

//import reactor.core.publisher.Flux;

@Repository
public interface AccountRepository extends R2dbcRepository<Account, Integer>{
  //Flux<Account> findByTitleContaining(String title);
  
  //Flux<Account> findByPublished(boolean isPublished);

  //boolean existsById(Integer userid);

  //signinの検索時に使用　findBy{a}And{b}で検索
  Mono<Account> findByMailaddressAndPassword(String mailaddress, String password);
}