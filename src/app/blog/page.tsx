// src/app/blog/page.tsx

import { Box, Typography, Container, Divider, Card, CardContent, Button, Stack } from '@mui/material';
import React from 'react';
import { dummyPosts } from '@/data/posts'; // Daha önce oluşturduğumuz sahte veriler

export default function BlogPage() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Blog
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Stack spacing={4}>
        {dummyPosts.map((post) => (
          <Card key={post.id} variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {post.title}
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 1.5 }}>
                Yayın Tarihi: {post.publishDate}
              </Typography>
              <Typography variant="body1" paragraph>
                {post.summary}
              </Typography>
              <Button size="small">Yazıyı Oku</Button>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}