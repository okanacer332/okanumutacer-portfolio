// src/main/java/com/okanumutacer/portfolioapi/repository/PostRepository.java
package com.okanumutacer.portfolioapi.repository;

import com.okanumutacer.portfolioapi.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface PostRepository extends MongoRepository<Post, String> {
    // Spring Data, bu metodun isminden yola çıkarak
    // 'slug' alanına göre bir post bulması gerektiğini anlar.
    Optional<Post> findBySlug(String slug);
}