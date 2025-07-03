// src/main/java/com/okanumutacer/portfolioapi/controller/PostController.java
package com.okanumutacer.portfolioapi.controller;

import com.okanumutacer.portfolioapi.model.Post;
import com.okanumutacer.portfolioapi.repository.PostRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:3000") // Next.js uygulamasından gelen isteklere izin ver
public class PostController {

    private final PostRepository postRepository;

    public PostController(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @GetMapping
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Post> getPostBySlug(@PathVariable String slug) {
        return postRepository.findBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}