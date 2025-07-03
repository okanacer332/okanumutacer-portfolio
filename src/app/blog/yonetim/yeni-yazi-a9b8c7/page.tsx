// src/app/blog/yonetim/yeni-yazi-a9b8c7/page.tsx

'use client'; // Bu sayfa interaktif olacağı için Client Component olmalı.

import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  CircularProgress,
  Box,
} from '@mui/material';

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Form verilerini bir araya getir
    const postData = {
      title,
      summary,
      content,
    };

    try {
      // Backend'e POST isteği gönderiyoruz.
      // Bu istek, sunucu tarafında oluşturacağımız bir 'route handler' üzerinden gidecek.
      const response = await fetch('/api/blog-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        // Hata varsa, backend'den gelen mesajı alıp göster
        const errorData = await response.json();
        throw new Error(errorData.message || 'Bir hata oluştu.');
      }

      const result = await response.json();
      setSuccess(`Yazı başarıyla oluşturuldu! Slug: ${result.slug}`);
      // Formu temizle
      setTitle('');
      setSummary('');
      setContent('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Yeni Blog Yazısı Ekle
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Yazı Başlığı"
            variant="outlined"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Özet"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={3}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <TextField
            label="İçerik"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Box sx={{ position: 'relative' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth
            >
              Yazıyı Kaydet
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>

          {/* Başarı veya Hata Mesajları */}
          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </form>
    </Container>
  );
}