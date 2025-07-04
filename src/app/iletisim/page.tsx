// src/app/iletisim/page.tsx

'use client'; // Bu sayfa interaktif olacağı için Client Component olmalı

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
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const FORMSPREE_FORM_URL = 'https://formspree.io/f/xanjzwjw';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Basit istemci tarafı doğrulama
    if (!name || !email || !subject || !message) {
      setError('Lütfen tüm alanları doldurun.');
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Lütfen geçerli bir e-posta adresi girin.');
      setLoading(false);
      return;
    }

    const formData = new FormData(event.currentTarget as HTMLFormElement);

    try {
      const response = await fetch(FORMSPREE_FORM_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Mesajınız başarıyla gönderildi!');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        if (data.errors) {
          setError(data.errors.map((errItem: { message: string }) => errItem.message).join(', '));
        } else {
          setError(data.message || 'Mail gönderilirken bir hata oluştu.');
        }
      }
    } catch (err: unknown) { // 'any' yerine 'unknown' kullanıldı
      if (err instanceof Error) { // Hatanın bir Error objesi olup olmadığı kontrol edildi
        setError(err.message);
      } else {
        setError('Mesaj gönderilirken beklenmeyen bir hata oluştu.');
      }
      console.error('Form gönderim hatası:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        <MailOutlineIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> İletişim
      </Typography>

      {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Adınız"
            variant="outlined"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
          />
          <TextField
            label="E-posta Adresiniz"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <TextField
            label="Konu"
            variant="outlined"
            fullWidth
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            name="subject"
          />
          <TextField
            label="Mesajınız"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            name="message"
          />
          <Box sx={{ position: 'relative' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth
              size="large"
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Mesajı Gönder'}
            </Button>
          </Box>
        </Stack>
      </form>
    </Container>
  );
}
