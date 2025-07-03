// src/main/java/com/okanumutacer/portfolioapi/controller/AdminPostController.java
package com.okanumutacer.portfolioapi.controller;

import com.okanumutacer.portfolioapi.model.Post;
import com.okanumutacer.portfolioapi.repository.PostRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/admin/posts") // Dikkat: /api/admin/ altında
@CrossOrigin(origins = "http://localhost:3000")
public class AdminPostController {

    private final PostRepository postRepository;
    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    public AdminPostController(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    // Basit bir slug oluşturma metodu
    private String toSlug(String input) {
        String nowhitespace = WHITESPACE.matcher(input).replaceAll("-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        String slug = NONLATIN.matcher(normalized).replaceAll("");
        return slug.toLowerCase(Locale.ENGLISH);
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        // Yeni bir post oluşturulurken tarih ve slug'ı ayarla
        post.setPublishDate(LocalDate.now());
        post.setSlug(toSlug(post.getTitle()));
        Post savedPost = postRepository.save(post);
        return new ResponseEntity<>(savedPost, HttpStatus.CREATED);
    }
}