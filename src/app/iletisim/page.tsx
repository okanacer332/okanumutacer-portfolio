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

  // Formspree'den aldığın Endpoint URL'si
  // Lütfen kendi Formspree URL'ini buraya yapıştır.
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

    // Form verilerini FormData objesine dönüştürüyoruz
    // Formspree doğrudan form gönderimini beklediği için bu şekilde yapıyoruz
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    try {
      // Doğrudan Formspree URL'sine POST isteği gönderiyoruz
      const response = await fetch(FORMSPREE_FORM_URL, {
        method: 'POST',
        body: formData, // FormData objesini doğrudan body olarak gönderiyoruz
        headers: {
          'Accept': 'application/json', // Formspree'den JSON yanıtı beklediğimizi belirtiyoruz
        },
      });

      const data = await response.json();

      if (response.ok) { // Formspree başarılı yanıtı 200 OK olarak döner
        setSuccess('Mesajınız başarıyla gönderildi!');
        // Formu temizle
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        // Formspree hata yanıtı döndüğünde
        if (data.errors) {
          setError(data.errors.map((err: any) => err.message).join(', '));
        } else {
          setError(data.message || 'Mail gönderilirken bir hata oluştu.');
        }
      }
    } catch (err: any) {
      setError('Mesaj gönderilirken bir ağ hatası oluştu.');
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
            name="name" // Formspree için 'name' özelliği eklendi
          />
          <TextField
            label="E-posta Adresiniz"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email" // Formspree için 'name' özelliği eklendi
          />
          <TextField
            label="Konu"
            variant="outlined"
            fullWidth
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            name="subject" // Formspree için 'name' özelliği eklendi
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
            name="message" // Formspree için 'name' özelliği eklendi
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
