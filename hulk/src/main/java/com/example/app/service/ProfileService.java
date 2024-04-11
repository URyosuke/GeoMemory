package com.example.app.service;

import java.io.IOException;

// import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
// import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.multipart.MultipartFile;

import com.example.app.models.Profile;
import com.example.app.models.ProfileRequest;
import com.example.app.repositories.ProfileRepository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

//import reactor.core.publisher.Mono;

@Service
public class ProfileService {
    @Autowired
    ProfileRepository profileRepository;

    public Mono<Void> registProfile(ProfileRequest profileRequest){
        var profile = new Profile();

        profile.setUsername(profileRequest.getUsername());
        profile.setImgpath("uploads/"+Integer.toString(profileRequest.getUserid())+".png");
        profile.setUserid(profileRequest.getUserid());
        return profileRepository.save(profile).then();
        // .map(savedProfile -> savedProfile.getProfileid())
        // .onErrorReturn(-1);
    }

    // public Mono<Integer> registProfileImg(
    //                     // ProfileRequest profileRequest,
    //                     // int userid,
    //                     // String username,
    //                     MultipartFile file
    //                     )
    //                     // throws IOException
    //                     {
    //     var profile = new Profile();
    //     System.out.println(file.getOriginalFilename());

    //     // profile.setUsername(profileRequest.getUsername());
    //     profile.setUsername("ddd");
    //     try {
    //         profile.setProfimg(file.getBytes());
    //     } catch (IOException e) {
    //         e.printStackTrace();
    //         profile.setProfimg(null);
    //     }
    //     // profile.setUserid(profileRequest.getUserid());
    //     profile.setUserid(6);
    //     return profileRepository.save(profile)
    //     // .then();
    //     .map(savedProfile -> savedProfile.getProfileid())
    //     .onErrorReturn(-1);
    // }


    // プロフィールの取得
    public Mono<Profile> getProfile(int userid){
        return profileRepository.findByUserid(userid);
    }

    public Mono<Void> updateProfile(ProfileRequest profileRequest){
        // var profile = new Profile();
        String username = profileRequest.getUsername();
        //byte[] profImg = profileRequest.getProf_img();
        int userid = profileRequest.getUserid();

        // profile.setProfileid(2);
        // profile.setFollowernumber(0);
        // profile.setFollowingnumber(0);
        // profile.setPostnumber(0);
        // profile.setProfimg(null);
        // profile.setUsername(username);
        // profile.setUserid(userid);
        // return profileRepository.save(profile)
        // .map(savedProfile -> savedProfile.getUserid())
        // .onErrorReturn(-1);

        // return profileRepository.findByUserid(userid).map(Optional::of).defaultIfEmpty(Optional.empty())
        // .flatMap(optionalProfile -> {
        //     if (optionalProfile.isPresent()) {
        //         profile.setProfileid(2);
        //         return ProfileRepository.save(profile);
        //     }

        //     return Mono.empty();
        // });

        return profileRepository.findByUserid(userid)
            .map(c -> new Profile(c.getProfileid(),userid,username,c.getImgpath()))
            .flatMap(profileRepository::save).then();
            // .map(savedProfile -> savedProfile.getProfileid())
            // .onErrorReturn(-1);
            // .flatMap(profile ->
            //     ServerResponse.status(HttpStatus.CREATED));
                    // .body(profile.map(c -> new CustomerDto(c.getId(), c.getUserName())), CustomerDto.class));
    }

    public Flux<Profile> findAll() {
    return profileRepository.findAll();
    }
}