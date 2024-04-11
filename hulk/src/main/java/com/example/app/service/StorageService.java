package com.example.app.service;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.stream.Stream;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;

import com.example.app.models.StorageRequest;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class StorageService {
    private final Path root = Paths.get("uploads");

    public void init() {
        try {
            Files.createDirectories(root);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }
    }

    // public Mono<String> save(Mono<FilePart> filePartMono, String path) {
    //     // System.out.println("root="+root);
    //     System.out.println("abs="+root.toAbsolutePath());
    //     // System.out.println("par="+root.getParent());
    //     // System.out.println("par="+root.resolve(""));
    //     // if(!root.toAbsolutePath().toString().contains("supporterz_hackathon2023_vol.10")){
    //     //     return Mono.just(filename);
    //     // }

    //     return filePartMono.doOnNext(fp -> System.out.println("Receiving File:" + fp.filename())).flatMap(filePart -> {
    //         String filename = filePart.filename();
    //         // root.resolve(filename);
    //         return filePart.transferTo(root.resolve(path))
    //                 // .then(filePart.filename());
    //                 .then(Mono.just(filename));
    //     });
    // }


    public Mono<String> savePostImg(Mono<FilePart> filePartMono, StorageRequest sr) {
        // System.out.println("root="+root);
        System.out.println("abs="+root.toAbsolutePath());
        // System.out.println("par="+root.getParent());
        // System.out.println("par="+root.resolve(""));
        if(!root.toAbsolutePath().toString().contains("supporterz_hackathon2023_vol.10")){
            return Mono.just("error");
        }

        return filePartMono.doOnNext(fp -> System.out.println("Receiving File:" + fp.filename())).flatMap(filePart -> {
            String filename = filePart.filename();
            LocalDateTime datetime = sr.getDatetime();
            String path = "post/"+Integer.toString(sr.getUserid());

            System.out.println(root.resolve(path));
            // File tmpPath = new File(path);

            if(Files.exists(root.resolve(path))){
            // if(tmpPath.exists()){
                System.out.println("exist");
            }
            else{
                System.out.println("none");
                // if(tmpPath.mkdirs()){
                //     System.out.println("success");
                // }
                // else{
                //     System.out.println("error");
                // }
                try {
                    Files.createDirectories(root.resolve(path));
                } catch (IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }
            
            String fullpath = path+"/"+Integer.toString(datetime.getYear())+Integer.toString(datetime.getMonthValue())
                                +Integer.toString(datetime.getDayOfMonth())+Integer.toString(datetime.getHour())
                                +Integer.toString(datetime.getMinute())+Integer.toString(datetime.getSecond())+".png";
            // root.resolve(filename);
            return filePart.transferTo(root.resolve(fullpath))
                    // .then(filePart.filename());
                    .then(Mono.just(filename));
        });
    }

    public Mono<String> saveProfImg(Mono<FilePart> filePartMono, Integer userid) {
        // System.out.println("root="+root);
        System.out.println("abs="+root.toAbsolutePath());
        // System.out.println("par="+root.getParent());
        // System.out.println("par="+root.resolve(""));
        if(!root.toAbsolutePath().toString().contains("supporterz_hackathon2023_vol.10")){
            return Mono.just("error");
        }

        return filePartMono.doOnNext(fp -> System.out.println("Receiving File:" + fp.filename())).flatMap(filePart -> {
            String filename = filePart.filename();
            String path = "profile";

            System.out.println(root.resolve(path));
            // File tmpPath = new File(path);

            if(Files.exists(root.resolve(path))){
            // if(tmpPath.exists()){
                System.out.println("exist");
            }
            else{
                System.out.println("none");
                // if(tmpPath.mkdirs()){
                //     System.out.println("success");
                // }
                // else{
                //     System.out.println("error");
                // }
                try {
                    Files.createDirectories(root.resolve(path));
                } catch (IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }
            
            String fullpath = path+Integer.toString(userid)+".png";
            // root.resolve(filename);
            return filePart.transferTo(root.resolve(fullpath))
                    // .then(filePart.filename());
                    .then(Mono.just(filename));
        });
    }


    // public String save(FilePart filePart, String path) {
    //     // System.out.println("root="+root);
    //     // System.out.println("abs="+root.toAbsolutePath().toString());
    //     // System.out.println("boo="+root.toAbsolutePath().toString().contains("supporterz_hackathon2023_vol.10"));
    //     // System.out.println("par="+root.getParent());
    //     // System.out.println("par="+root.resolve(""));
    //     if(!root.toAbsolutePath().toString().contains("supporterz_hackathon2023_vol.10")){
    //         return "error";
    //     }

    //     // return filePartMono.doOnNext(fp -> System.out.println("Receiving File:" + fp.filename())).flatMap(filePart -> {
    //     // String filename = filePart.filename();
    //     // String path = "/profile/"+userid
    //     // root.resolve(filename);
    //     filePart.transferTo(root.resolve(path));
    //             // .then(filename);
    //             // .then(Mono.just(filename));
    //     // });
    //     return root.resolve(path).toString();
    // }

    public Flux<DataBuffer> load(String filename) {
        try {
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
            return DataBufferUtils.read(resource, new DefaultDataBufferFactory(), 4096);
            } else {
            throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.root, 1)
                .filter(path -> !path.equals(this.root))
                .map(this.root::relativize);
        } catch (IOException e) {
            throw new RuntimeException("Could not load the files!");
        }
    }

    public boolean delete(String filename) {
        try {
            Path file = root.resolve(filename);
            return Files.deleteIfExists(file);
        } catch (IOException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }
}
