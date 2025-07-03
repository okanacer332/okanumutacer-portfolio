// src/app/blog/[slug]/page.tsx

import { Container, Typography, Divider, Box } from '@mui/material';
import { notFound } from 'next/navigation';
import React from 'react';

// Detay sayfasında 'content' alanı da olacağı için interface'i güncelliyoruz
interface Post {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string; // Yazının tam içeriği
  publishDate: string;
}

// Next.js'in bu sayfaya hangi 'slug' parametresiyle geldiğini almamız için props tipi
interface PageProps {
  params: {
    slug: string;
  }
}

// Belirli bir slug'a göre tek bir post getiren fonksiyon
async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`http://localhost:8080/api/posts/${slug}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null; // Post bulunamadıysa null döndür
      }
      // Diğer hatalar için loglama yapabiliriz
      console.error('Failed to fetch post:', res.statusText);
      return null;
    }
    return res.json();
  } catch (error) {
    console.error('Network error fetching post:', error);
    return null;
  }
}

export default async function PostPage({ params }: PageProps) {
  const post = await getPost(params.slug);

  // Eğer getPost null dönerse (yani post bulunamazsa) 404 sayfası göster
  if (!post) {
    notFound();
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
        {post.title}
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 2 }}>
        Yayın Tarihi: {new Date(post.publishDate).toLocaleDateString('tr-TR')}
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Box
        component="article"
        sx={{
          lineHeight: 1.7,
          // Blog içeriğindeki paragraflar arasına boşluk koymak için
          '& p': { 
            mb: 2 
          },
          // İleride eklenebilecek kod blokları için stil
          '& pre, & code': {
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            backgroundColor: 'action.hover',
            p: 2,
            borderRadius: 1,
          }
        }}
      >
        {/*
          Şimdilik içeriği basit bir <p> içinde gösteriyoruz.
          Eğer içeriğiniz HTML ise, güvenlik risklerine karşı (XSS) dikkat ederek
          `dangerouslySetInnerHTML` kullanmanız gerekir.
          Eğer içeriğiniz Markdown ise, 'react-markdown' gibi bir kütüphane ile
          bunu güzel bir şekilde formatlayabilirsiniz.
        */}
        <Typography variant="body1" component="p">
            {post.content}
        </Typography>
      </Box>
    </Container>
  );
}