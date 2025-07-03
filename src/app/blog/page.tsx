// src/app/blog/page.tsx

import { Box, Typography, Container, Divider, Card, CardContent, Button, Stack } from '@mui/material';
import Link from 'next/link'; // Link bileşenini import ediyoruz
import React from 'react';

// Post tipini backend'deki (Java) modele uygun hale getiriyoruz
interface Post {
  id: string;
  slug: string;
  title: string;
  summary: string;
  publishDate: string;
}

// Veriyi API'den çekmek için asenkron bir fonksiyon oluşturuyoruz.
// Next.js 13+ ile bu fonksiyon sunucu tarafında (server-side) çalışır.
async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch('http://localhost:8080/api/posts', {
      cache: 'no-store', // Blog içeriğinin her zaman güncel kalması için cache kullanmıyoruz.
    });

    if (!res.ok) {
      console.error('Failed to fetch posts:', res.statusText);
      return []; // Hata durumunda boş bir dizi döndür
    }

    return res.json();
  } catch (error) {
    console.error('Network error fetching posts:', error);
    return []; // Network hatası olursa da boş dizi döndür
  }
}

export default async function BlogPage() {
  // Sayfa oluşturulurken getPosts fonksiyonunu çağırıp veriyi alıyoruz.
  const posts = await getPosts();

  return (
    <Container id="blog-sayfasi" maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Blog
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Stack spacing={4}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Card key={post.id} variant="outlined" sx={{ transition: 'border-color 0.3s', '&:hover': { borderColor: 'primary.main' }}}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {post.title}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 1.5 }}>
                  Yayın Tarihi: {new Date(post.publishDate).toLocaleDateString('tr-TR')}
                </Typography>
                <Typography variant="body1" paragraph>
                  {post.summary}
                </Typography>
                {/* Butonu Next.js'in Link bileşenine çeviriyoruz ki sayfa yenilenmeden geçiş yapsın */}
                <Button component={Link} href={`/blog/${post.slug}`} size="small">
                  Yazıyı Oku
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>Gösterilecek blog yazısı bulunamadı.</Typography>
        )}
      </Stack>
    </Container>
  );
}