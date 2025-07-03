// src/main/java/com/okanumutacer/portfolioapi/model/Post.java
package com.okanumutacer.portfolioapi.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data // Lombok: Getter, Setter, toString, etc. metodlarını otomatik oluşturur
@Document(collection = "posts") // MongoDB'deki koleksiyonun adı
public class Post {

    @Id
    private String id;

    private String title;
    private String slug; // URL'de görünecek, başlığın "URL-dostu" hali
    private String summary; // Blog listeleme sayfasında görünecek özet
    private String content; // Yazının tam içeriği
    private LocalDate publishDate;
}