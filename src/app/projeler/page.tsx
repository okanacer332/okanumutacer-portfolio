// src/app/projeler/page.tsx - SİZİN İSTEDİĞİNİZ KULLANIMLA ÇALIŞAN VERSİYON

import { Box, Typography, Container, Divider, Card, CardContent, CardActions, Button } from '@mui/material';
import Grid from '@mui/material/Grid'; // Ana konteyner için MUI Grid'i tutuyoruz
import CustomGrid from '@/components/CustomGrid'; // Kendi özel Grid bileşenimizi import ediyoruz
import React from 'react';

interface Project {
  title: string;
  description: string;
  stack: string;
}

const projects: Project[] = [
    {
    title: 'Fidanlık Yönetim Sistemi (FidanYS)',
    description: 'Fidanlık ve toptan fidan satış operasyonlarını uçtan uca yöneten web tabanlı bir uygulama.',
    stack: 'Java, Spring, React, Next.js, MongoDB',
  },
  {
    title: 'Artichokee Projesi',
    description: 'Catering sektörüne yönelik, AWS üzerinde çalışan tam donanımlı bir platform.',
    stack: 'ReactJS, Node.js, AWS (S3, Cognito, Lambda), DynamoDB',
  },
  {
    title: 'SCADA Sistemleri ve Masaüstü Uygulamaları',
    description: 'Endüstriyel veri toplama, lisanslama ve otomatik kurulum için geliştirilen SCADA çözümleri.',
    stack: 'JavaScript, .NET Core, C#, Modbus, MQTT, MongoDB, MSSQL',
  },
];

export default function ProjectsPage() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Projelerim
      </Typography>
      <Divider sx={{ mb: 4 }} />
      
      <Grid container spacing={4}>
        {projects.map((project) => (
          // ARTIK İSTEDİĞİNİZ GİBİ KULLANABİLİRSİNİZ
          <CustomGrid size={{ xs: 12, md: 6 }} key={project.title}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {project.title}
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {project.description}
                </Typography>
                <Typography variant="body2">
                  <strong>Teknolojiler:</strong> {project.stack}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Detayları Gör</Button>
              </CardActions>
            </Card>
          </CustomGrid>
        ))}
      </Grid>
    </Container>
  );
}