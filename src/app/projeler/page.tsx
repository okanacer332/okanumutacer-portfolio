// src/app/projeler/page.tsx

'use client';

import { Box, Typography, Container, Divider, Card, CardContent, CardActions, Button, Chip, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Grid from '@mui/material/Grid';
import CustomGrid from '@/components/CustomGrid';
import React from 'react';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CodeIcon from '@mui/icons-material/Code';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// ... (Interface ve allProjects verisi aynı kalacak)
interface Project {
  title: string;
  description: string;
  stack: {
    frontend?: string;
    backend?: string;
    database?: string;
    devops?: string;
    protocols?: string;
    other?: string;
  };
  contributions: string[];
  isLive: boolean;
  liveUrl?: string;
  githubUrl?: string;
}

const allProjects: Project[] = [
  {
    title: 'Fidanlık Yönetim Sistemi (FidanYS)',
    description: 'Fidanlık ve toptan fidan satış operasyonlarını uçtan uca yönetmek üzere geliştirdiğim web tabanlı bir uygulamadır. Kapsamlı envanter, satış, muhasebe ve raporlama süreçlerini tek bir platformda birleştirerek operasyonel verimliliği artırmayı hedefler.',
    isLive: true,
    liveUrl: 'http://ata.fidanys.xyz',
    githubUrl: 'https://github.com/okanacer332/FidanlikYonetimSistemi',
    stack: {
      frontend: 'ReactJS, Next.js, Material-UI (MUI), Zod, Day.js',
      backend: 'Java, Spring Boot, Spring Security (JWT tabanlı), Lombok',
      database: 'MongoDB',
      devops: 'PM2, Nginx',
      protocols: 'RESTful API, Modbus, MQTT',
    },
    contributions: [
      'Kullanıcı/yetkilendirme, fidan/envanter, tedarikçi/müşteri, sipariş/mal kabul ve muhasebe/finansal işlem modüllerini uçtan uca geliştirdim.',
      'Sipariş sevkiyatlarında otomatik stok düşümü/iadesi ve otomatik fatura oluşturma gibi süreçleri implemente ettim.',
      'Kapsamlı stok yönetimi, cari hesap takibi ve ürün karlılığı gibi raporlama ekranları tasarladım ve PDF/CSV dışa aktarım özelliği ekledim.',
      'JWT tabanlı kimlik doğrulama ve rol tabanlı erişim kontrolü (RBAC) ile güvenli ve ölçeklenebilir bir yapı kurdum.'
    ]
  },
  {
    title: 'Akıllı Şehir Trafik Yönetim Sistemi',
    description: 'Büyük şehirlerde trafik yoğunluğunu azaltmak ve akışı optimize etmek amacıyla geliştirilmiş, gerçek zamanlı veri analizi yapan bir sistem. Kamera verileri, sensörler ve GPS bilgilerini kullanarak trafik akışını izler, tahminde bulunur ve trafik ışıklarını dinamik olarak ayarlar.',
    isLive: false,
    stack: {
      backend: 'Java, Spring Boot, Spring Security (JWT), Node.js',
      database: 'MongoDB, MSSQL',
      devops: 'AWS (Lambda, S3, EC2), Jenkins CI/CD',
      protocols: 'RESTful API, Modbus/MQTT',
    },
    contributions: [
        'Gerçek zamanlı trafik verisi toplama ve işleme modüllerini geliştirdim.',
        'Makine öğrenimi algoritmaları entegre ederek trafik yoğunluğu tahmini sağladım.',
        'Web tabanlı bir izleme paneli (ReactJS) ve mobil uygulama için RESTful API altyapısı kurdum.',
        'AWS üzerinde yüksek erişilebilir ve ölçeklenebilir bir altyapı tasarladım.'
    ]
  },
  {
    title: 'Sağlık Takip ve Randevu Yönetim Sistemi',
    description: 'Hastaların sağlık verilerini takip edebildiği, randevu alıp yönetebildiği ve doktorlarla güvenli iletişim kurabildiği web ve mobil uyumlu bir platform.',
    isLive: false,
    stack: {
      frontend: 'ReactJS, Next.js, Material-UI (MUI), Zod',
      backend: 'Node.js, Express.js',
      database: 'Oracle SQL, MongoDB',
      devops: 'AWS Cognito, AWS S3',
    },
    contributions: [
        'Güvenli hasta kayıt yönetimi ve randevu planlama modülleri geliştirdim.',
        'Hasta ve doktor rolleri için rol tabanlı erişim kontrolü (RBAC) implemente ettim.',
        'RESTful API\'ler aracılığıyla mobil uygulama entegrasyonu sağladım.',
        'Veri gizliliği ve güvenliği standartlarına uygun çözümler ürettim.'
    ]
  },
  {
    title: 'E-Ticaret Stok ve Sipariş Otomasyon Sistemi',
    description: 'Küçük ve orta ölçekli e-ticaret işletmeleri için stok yönetimi, sipariş takibi, faturalandırma ve raporlama süreçlerini otomatize eden kapsamlı bir sistem.',
    isLive: false,
    stack: {
      frontend: 'ReactJS',
      backend: 'C#, .NET Core',
      database: 'MSSQL',
      devops: 'Jenkins CI/CD',
      other: 'RESTful API (Ödeme ve Kargo Entegrasyonu), Day.js',
    },
    contributions: [
        'Kapsamlı envanter yönetimi, otomatik stok düşümü ve sipariş işleme modülleri geliştirdim.',
        'Otomatik fatura oluşturma ve muhasebe entegrasyonu sağladım.',
        'Ürün karlılığı ve satış performansları gibi raporlama ekranları tasarladım.',
        'Sistemin performansını artırmak için test süreçlerini uyguladım.'
    ]
  },
   {
    title: 'Endüstriyel Veri Toplama ve İzleme Platformu',
    description: 'Fabrika ortamlarındaki sensörlerden ve makinelerden gelen verileri toplayıp işleyen, gerçek zamanlı izleme ve alarm mekanizmaları sunan bir platform.',
    isLive: false,
    stack: {
      backend: 'Java, Spring Boot',
      database: 'DynamoDB, MongoDB',
      devops: 'AWS Lambda, AWS S3, PM2',
      protocols: 'Modbus, MQTT',
    },
    contributions: [
        'Farklı endüstriyel protokoller üzerinden veri toplama ve normalleştirme modülleri geliştirdim.',
        'ReactJS ile gerçek zamanlı veri görselleştirme panelleri oluşturdum.',
        'Anormal veri değerlerinde otomatik alarm ve bildirim sistemleri kurdum.',
        'Veri güvenliği ve bütünlüğünü sağlamak için test süreçlerini uyguladım.'
    ]
  }
];


const featuredProject = allProjects.find(p => p.isLive);
const otherProjects = allProjects.filter(p => !p.isLive);

const TechStack = ({ stack }: { stack: Project['stack'] }) => (
    <Box>
        {Object.entries(stack).map(([key, value]) => value && (
            <Typography key={key} variant="body2" sx={{ mb: 1 }}>
                <strong style={{ textTransform: 'capitalize' }}>{key}:</strong> {value}
            </Typography>
        ))}
    </Box>
);

export default function ProjectsPage() {
  return (
    // Projeler sayfasının kendisine bir ana ID veriyoruz
    <Container id="projeler-sayfasi" maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Projelerim
      </Typography>
      <Divider sx={{ mb: 4 }} />

      {featuredProject && (
        // Öne çıkan proje bölümüne bir ID veriyoruz
        <Box id="one-cikan-proje" sx={{ mb: 8 }}>
           <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <RocketLaunchIcon color="primary" /> Öne Çıkan Proje
            </Typography>
            <Paper
              elevation={4}
              sx={{
                p: { xs: 2.5, sm: 3, md: 4 },
                border: '1px solid',
                borderColor: 'primary.main',
                boxShadow: (theme) => `0 0 25px ${theme.palette.primary.main}33`,
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: (theme) => `0 0 35px ${theme.palette.primary.main}55`,
                }
              }}
            >
                <Grid container spacing={4}>
                    <Grid item xs={12} md={7}>
                        <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                            {featuredProject.title}
                        </Typography>
                        <Chip label="Canlıda (Giriş: admin/admin)" color="success" variant="filled" sx={{ mb: 2, backgroundColor: 'primary.main', color: 'background.default', fontWeight: 'bold' }} />
                        <Typography color="text.secondary" paragraph>
                            {featuredProject.description}
                        </Typography>
                         <CardActions sx={{ p: 0, mb: 3 }}>
                            {featuredProject.liveUrl && (
                                <Button href={featuredProject.liveUrl} target="_blank" variant="contained" color="primary">
                                    Projeyi Gör
                                </Button>
                            )}
                            {featuredProject.githubUrl && (
                                <Button href={featuredProject.githubUrl} target="_blank" variant="outlined" color="primary">
                                    Kodu İncele
                                </Button>
                            )}
                        </CardActions>
                        <Typography variant="h6" component="h4" sx={{ mb: 1 }}>Teknolojiler</Typography>
                        <TechStack stack={featuredProject.stack} />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Typography variant="h6" component="h4" sx={{ mb: 1 }}>Proje Kapsamı ve Katkılarım</Typography>
                        <List dense>
                            {featuredProject.contributions.map((item, index) => (
                                <ListItem key={index} sx={{ p: 0, alignItems: 'flex-start' }}>
                                    <ListItemIcon sx={{ minWidth: '32px', mt: '4px' }}><CheckCircleOutlineIcon color="primary" fontSize="small"/></ListItemIcon>
                                    <ListItemText primary={item} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
      )}

      {/* Diğer projeler bölümüne bir ID veriyoruz */}
      <Box id="diger-calismalar">
        <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <CodeIcon /> Diğer Çalışmalarım
          </Typography>
        <Grid container spacing={4}>
          {otherProjects.map((project) => (
            <CustomGrid size={{ xs: 12, md: 6 }} key={project.title}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    {project.description}
                  </Typography>
                  <TechStack stack={project.stack} />
                </CardContent>
              </Card>
            </CustomGrid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}