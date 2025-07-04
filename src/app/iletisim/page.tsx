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

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Mail gönderilirken bir hata oluştu.');
      }

      setSuccess('Mesajınız başarıyla gönderildi!');
      // Formu temizle
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setError(err.message);
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
          />
          <TextField
            label="E-posta Adresiniz"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Konu"
            variant="outlined"
            fullWidth
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
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