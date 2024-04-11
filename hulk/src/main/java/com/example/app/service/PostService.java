package com.example.app.service;

// import java.io.File;
// import java.io.IOException;
// import java.nio.charset.StandardCharsets;
// import java.nio.file.Files;
// import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
// import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.core.io.buffer.DataBuffer;
// import org.springframework.core.io.buffer.DataBufferUtils;
// import org.springframework.http.ResponseEntity;
// import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RequestPart;
// import org.springframework.web.multipart.MultipartFile;

import com.example.app.models.Post;
import com.example.app.models.PostRequest;
import com.example.app.repositories.PostRepository;

import lombok.val;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class PostService {
    @Autowired
    PostRepository postRepository;

    @Autowired
    StorageService storageService;

    public Mono<Post> save(Post post) {
    return postRepository.save(post);
    }

    public Mono<Integer> post(PostRequest postRequest) {
        System.out.println("post");
        var post = new Post();

        LocalDateTime datetime = postRequest.getDatetime();
        
        post.setContent(postRequest.getContent());
        // post.setPostimg(postRequest.getPostimg());
        // post.setPostimg(null);
        post.setDatetime(postRequest.getDatetime());
        post.setLatitude(postRequest.getLatitude());
        post.setLongitude(postRequest.getLongitude());
        post.setUserid(postRequest.getUserid());

        post.setImgpath("uploads/post/"+Integer.toString(postRequest.getUserid())+"/"
                        +Integer.toString(datetime.getYear())+Integer.toString(datetime.getMonthValue())
                        +Integer.toString(datetime.getDayOfMonth())+Integer.toString(datetime.getHour())
                        +Integer.toString(datetime.getMinute())+Integer.toString(datetime.getSecond()));

        // postRepository.save(post);
        // System.out.println("fin");
        return postRepository.save(post)
        // .then();
        .map(savedPost -> savedPost.getPostid())
        .onErrorReturn(-1);
    }

    public Flux<Post> findAll() {
    return postRepository.findAll();
    }

    //public Post update(int id, Post post) {
    //return postRepository.findById(id).map(Optional::of).defaultIfEmpty(Optional.empty())
     //   .flatMap(optionalPost -> {
     //       if (optionalPost.isPresent()) {
     //       post.setUserid(id);
     //       return postRepository.save(post);
     //       }

     //       return Mono.empty();
     //   });
    //}

    public Mono<Long> getPostNumber(int userid){
        return postRepository.findByUserid(userid).count();
        // .collectList()
        // .flatMap(s -> s.size());
    }



    // public Mono<Integer> registPostImg(
    //                     // ProfileRequest profileRequest,
    //                     // int userid,
    //                     // String username,
    //                     // PostRequest postRequest,
    //                     // MultipartFile file
    //                     @RequestPart FilePart filePart
    //                     )
    //                     // throws IOException
    //                     {
    //     var post = new Post();

    //     // post.setContent(postRequest.getContent());
    //     post.setContent(null);

    //     // post.setDatetime(postRequest.getDatetime());
    //     post.setDatetime(null);
    //     // post.setLatitude(postRequest.getLatitude());
    //     post.setLatitude(null);
    //     // post.setLongitude(postRequest.getLongitude());
    //     post.setLongitude(null);
    //     // post.setUserid(postRequest.getUserid());
    //     post.setUserid(1);

    //     // profile.setUsername(profileRequest.getUsername());
    //     // profile.setUsername("ddd");
    //     // try {
    //     //     profile.setProfimg(file.getBytes());
    //     // } catch (IOException e) {
    //     //     e.printStackTrace();
    //     //     profile.setProfimg(null);
    //     // }
    //     // byte[] bytes = convertFilePartToByteArray(file);
    //     // post.setPostimg(bytes);

    //     // return 
    //     //     Mono
    //     //         // .zip(
    //     //         //     // objects -> {
    //     //         //     //         var post = (Post) objects[0];
    //     //         //     //         var file = (DataBuffer) objects[1];
    //     //         //     //         post.setAttachment(file.toByteBuffer());
    //     //         //     //         return post;
    //     //         //     //     },
    //     //         //         // this.postRepository.findById(id),
    //     //         //         filePart.flatMap(file -> DataBufferUtils.join(file.content()))
    //     //         // )
    //     //         filePart.flatMap(file -> DataBufferUtils.join(file.content()))
    //     //         .flatMap(this.postRepository::save)
    //     //         .map(saved -> ResponseEntity.noContent().build());
        
    //     // try {
    //     //     post.setPostimg(file.getBytes());
    //     // } catch (IOException e) {
    //     //     e.printStackTrace();
    //     //     post.setPostimg(null);
    //     // }
    //     // profile.setUserid(profileRequest.getUserid());
    //     // profile.setUserid(6);

    //     return postRepository.save(post)
    //     // .then();
    //     .map(savedPost -> savedPost.getPostid())
    //     .onErrorReturn(-1);

    //     // return profileRepository.save(profile)
    //     // // .then();
    //     // .map(savedProfile -> savedProfile.getProfileid())
    //     // .onErrorReturn(-1);
    // }
    // private byte[] convertFilePartToByteArray(FilePart filePart) {
    // // return filePart.flatMap(file ->  file.getbyte())
    // //         .content()
    // //         .map(dataBuffer -> {
    // //             byte[] bytes = new byte[dataBuffer.readableByteCount()];
    // //             dataBuffer.read(bytes);
    // //             DataBufferUtils.release(dataBuffer);

    // //             return bytes;
    // //         });
    //     val byteStream = ByteArrayOutputStream();
    //     filePart.content()
    //     .flatMap ( dataBuffer -> Flux.just(dataBuffer.asByteBuffer().array()) )
    //     .collectList()
    //     .awaitFirst()
    //     .forEach ( bytes -> byteStream.write(bytes) );

    //     val bytes = byteStream.toByteArray()
    // }
    // public String getLines(FilePart filePart) {

    //     return 
    //     // fileParts.map(filePart ->
    //             filePart.content().map(dataBuffer -> {
    //                 byte[] bytes = new byte[dataBuffer.readableByteCount()];
    //                 dataBuffer.read(bytes);
    //                 DataBufferUtils.release(dataBuffer);
    
    //                 return new String(bytes, StandardCharsets.UTF_8);
    //             })
    //             // .map(this::processAndGetLinesAsList)
    //             .flatMapIterable(Function.identity());
    // }

    // 画像保存名の命名規則
    // プロフ画像-->1ユーザーにつき1枚-->uploads/profile/{userid}
    // ポスト画像-->1ユーザーにつき複数-->uploads/post/{userid}/{postid}
    // 同じ名前で保存されると上書きされる
    // public Mono<Void> upload(
    //                     @RequestPart PostRequest postRequest,
    //                     @RequestPart Mono<FilePart> filePartMono
    //                     // @RequestPart FilePart filePartMono
    //                     ){
    //     var post = new Post();

    //     LocalDateTime datetime = postRequest.getDatetime();

    //     post.setContent(postRequest.getContent());
    //     post.setDatetime(datetime);
    //     post.setLatitude(postRequest.getLatitude());
    //     post.setLongitude(postRequest.getLongitude());
    //     post.setUserid(postRequest.getUserid());

    //     // String path = "post"+Integer.toString(postRequest.getUserid())
    //     //                 +Integer.toString(datetime.getYear())+Integer.toString(datetime.getMonthValue())
    //     //                 +Integer.toString(datetime.getDayOfMonth())+Integer.toString(datetime.getHour())
    //     //                 +Integer.toString(datetime.getMinute())+Integer.toString(datetime.getSecond());
    //     String path = "post";
    //     storageService.save(filePartMono, path)
    //     // .then(post.setImgpath("uploads/post/"))
    //     .map((filename) -> ResponseEntity.ok().body("Uploaded the file successfully: " + filename));
    //     post.setImgpath(path);

    //     // 一度画像なしでpost登録してpostIDを生成、生成したIDを使って指定したpostに画像パスを追加して更新したい
    //     return postRepository.save(post)
    //     .then();
    //     // .flatMap(savedPost ->{
    //     //     String filePath = storageService.save(filePartMono, path+Integer.toString(savedPost.getPostid()));
    //     //     var update = new Post();
    //     //     update.setPostid(savedPost.getPostid());
    //     //     update.setContent(savedPost.getContent());
    //     //     update.setDatetime(savedPost.getDatetime());
    //     //     update.setLatitude(savedPost.getLatitude());
    //     //     update.setUserid(savedPost.getUserid());
    //     //     update.setImgpath(filePath);
    //     // })
    //     // // .map(savedPost -> {
    //     // //     return storageService.save(filePartMono, path+Integer.toString(savedPost.getPostid()));
    //     // // })
    //     // .flatMap(postRepository::save).then();
    //     // // .onErrorReturn("error");
    // }
    
}
