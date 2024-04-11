package com.example.app.controller;

// import java.io.File;
// import java.io.IOException;
// import java.nio.file.Files;
// import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.multipart.MultipartFile;

import com.example.app.models.Post;
import com.example.app.models.PostRequest;
import com.example.app.models.StorageRequest;
import com.example.app.service.PostService;
import com.example.app.service.StorageService;

// import io.r2dbc.postgresql.codec.Path;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/post")
public class PostController {
    @Autowired
    PostService postService;

    //投稿登録処理(画像本体保存なし)
    @PostMapping("/post")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Integer> post(@RequestBody PostRequest postRequest) {
        return postService.post(postRequest);
    }
    
    // 投稿数を取得
    @GetMapping("/getNumber/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<Long> getPostNumber(@PathVariable("id") int userid) {
        return postService.getPostNumber(userid);
    }

    //投稿全権取得処理
    @GetMapping("/get/all")
    @ResponseStatus(HttpStatus.OK)
    public Flux<Post> getAllPosts() {
        return postService.findAll();
    // if (title == null)
    //    return appService.findAll();
    // else
    //    return appService.findByTitleContaining(title);
    // }
    }


    // @PostMapping("/post/img")
    // @RequestMapping(value="post/img", method=RequestMethod.POST, consumes = "multipart/form-data")
    // @ResponseStatus(HttpStatus.CREATED)
    // public Mono<Integer> registPostImg(
    //                 // @RequestPart("content") PostRequest postRequest,
    //                 // @RequestPart("file") MultipartFile file
    //                 @RequestPart("file") FilePart file
    //                 // @RequestParam(name = "id") int userid,
    //                 // @RequestParam(name = "name") String username,
    //                 // @RequestParam(name = "file") MultipartFile file
    //                 // @RequestBody PostRequest postRequest
    //                 )
    //                 // throws IOException
    //                 {

    //     // System.out.println(file.getOriginalFilename());
                    
    //     return postService.registPostImg(
    //                     // profileRequest,
    //                     // userid,
    //                     // username,
    //                     // file
    //                     // postRequest,
    //                     file
    //                     );
    // }


    @Autowired
    StorageService storageService;

    // 画像本体保存
    @PostMapping("/upload")
    @RequestMapping(value="upload", method=RequestMethod.POST, consumes = "multipart/form-data")
    public Mono<ResponseEntity> uploadFile(
                        @RequestPart("content") StorageRequest storageRequest,
                        @RequestPart("file") Mono<FilePart> filePartMono
                        ) {
        // return postService.post(postRequest);
        // try {
        //     Thread.sleep(10000);
        // } catch (InterruptedException e) {
        //     // TODO Auto-generated catch block
        //     e.printStackTrace();
        // }
        // String userid = Integer.toString(storageRequest.getUserid());
        // String path="post/supporterz_hackathon2023_vol.png";
        return storageService.savePostImg(filePartMono,storageRequest).map(
            (filename) -> ResponseEntity.ok().body("Uploaded the file successfully: " + filename));
        // return storageService.save(filePartMono,path).map(
            // (filename) -> ResponseEntity.ok().body("Uploaded the file successfully: " + filename));
    }

    // @RequestMapping(value="upload", method=RequestMethod.POST, consumes = "multipart/form-data")
    // public Mono<Void> upload(
    //                     @RequestPart("content") PostRequest postRequest,
    //                     // @RequestPart("file") Mono<FilePart> filePartMono
    //                     @RequestPart("file") FilePart filePartMono
    //                     ) {
    //     return postService.upload(postRequest,filePartMono);
    //     // return storageService.save(filePartMono).map(
    //     //     (filename) -> ResponseEntity.ok().body("Uploaded the file successfully: " + filename));
    // }
}
