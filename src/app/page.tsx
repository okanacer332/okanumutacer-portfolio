// src/app/page.tsx - YENİ "CustomGrid" KULLANIMI İLE GÜNCELLENMİŞ VERSİYON

import { Box, Typography, Container, Divider, Paper, Avatar, Grid, Chip, Stack } from '@mui/material';
import CustomGrid from '@/components/CustomGrid'; // Kendi özel Grid bileşenimizi import ediyoruz
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import React from 'react';

// İkonları import edelim
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build';
import StorageIcon from '@mui/icons-material/Storage';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import ConstructionIcon from '@mui/icons-material/Construction';

// Bölüm başlıkları için standart bir bileşen
const SectionTitle = ({ title }: { title: string }) => (
  <>
    <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
      {title}
    </Typography>
    <Divider sx={{ mb: 4, width: '80px', height: '3px' }} />
  </>
);

// Deneyimler için veri dizisi
const experiences = [
    {
    date: 'Nisan 2021 - Nisan 2025',
    title: 'Yazılım Uzmanı',
    company: 'Mirsis Bilgi Teknolojileri via AKBANK',
    description: 'BT Hazine ekibinde, Jenkins CI/CD süreç yönetimi, Oracle SQL ve Karar Destek Sistemleri üzerine RESTful servis geliştirme gibi görevler üstlendim.'
  },
  {
    date: 'Temmuz 2020 - Nisan 2021',
    title: 'Bilgisayar Mühendisi',
    company: 'PURPLEBOX, INC.',
    description: 'Artichokee projesinde ReactJS, Node.js ve AWS (S3, Cognito, Lambda) teknolojileriyle tam donanımlı yazılım geliştirme yaptım.'
  },
  {
    date: 'Ağustos 2019 - Temmuz 2020',
    title: 'Bilgisayar Mühendisi',
    company: 'ENER OTOMASYON ELEKTRİK',
    description: 'SCADA sistemleri üzerine JavaScript, .NET Core ve C# kullanarak endüstriyel veri toplama çözümleri ve Modbus/MQTT entegrasyonları geliştirdim.'
  },
];

// Yetenekler için tip tanımlaması
interface SkillCategory {
  category: string;
  icon: React.ReactElement;
  items: string[];
}

// Yetenekler için veri dizisi
const skillsData: SkillCategory[] = [
  {
    category: 'Programlama Dilleri',
    icon: <CodeIcon />,
    items: ['Java', 'JavaScript', 'Node.js', 'C#', 'SQL']
  },
  {
    category: 'Frameworkler & Kütüphaneler',
    icon: <BuildIcon />,
    items: ['Spring Framework', 'ReactJS', 'Next.js', 'Material-UI (MUI)']
  },
  {
    category: 'Veritabanları',
    icon: <StorageIcon />,
    items: ['Oracle SQL', 'MongoDB', 'DynamoDB', 'MSSQL']
  },
  {
    category: 'DevOps & Bulut',
    icon: <CloudQueueIcon />,
    items: ['Jenkins (CI/CD)', 'AWS (S3, Cognito, Lambda)', 'PM2', 'Nginx']
  },
  {
    category: 'Protokoller & Standartlar',
    icon: <SettingsEthernetIcon />,
    items: ['RESTful API Geliştirme', 'Modbus', 'MQTT']
  },
  {
    category: 'Diğer Araçlar & Konular',
    icon: <ConstructionIcon />,
    items: ['Zod', 'Day.js', 'Rol Tabanlı Erişim (RBAC)', 'Endüstriyel Veri Toplama']
  }
];

export default function HomePage() {
  return (
    <Container maxWidth="lg">
      {/* HAKKIMDA BÖLÜMÜ */}
      <Box id="hakkimda" component="section" sx={{ py: 8, textAlign: 'center' }}>
        <Avatar
          alt="Okan Umut Acer"
          src="/profil-fotografi.jpg"
          sx={{ width: 150, height: 150, margin: '0 auto 16px', border: '3px solid', borderColor: 'primary.main' }}
        />
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Okan Umut Acer
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Bilgisayar Mühendisi | Java & React Geliştiricisi
        </Typography>
        <Typography variant="body1" maxWidth="md" sx={{ margin: '0 auto' }}>
          Ben bir fikir-ürün geliştiricisiyim ve temel felsefem, sektörden bağımsız olarak teknolojiyle somut değer yaratmaktır. Kariyerim boyunca bankacılığın düzenlenmiş dünyasından endüstriyel otomasyonun (SCADA) özel ihtiyaçlarına kadar farklı alanlarda edindiğim tecrübeyle, Java (Spring Boot) ile kurumsal düzeyde güvenilir ve ölçeklenebilir backend sistemleri kurarken, React (Next.js) ile bu sistemleri modern ve kullanıcı dostu arayüzlerle buluşturuyorum. Nihai amacım, karmaşık iş süreçlerini ve teknik gereksinimleri herkes için anlaşılır, yönetilebilir ve verimli çözümlere dönüştürmektir.
        </Typography>
      </Box>

      {/* DENEYİMLERİM BÖLÜMÜ */}
      <Box id="deneyim" component="section" sx={{ py: 8 }}>
        <SectionTitle title="Deneyimlerim" />
        <Timeline position="alternate">
          {experiences.map((exp, index) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
                {exp.date}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="primary" variant="outlined" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" component="h3">{exp.title}</Typography>
                  <Typography variant="subtitle1" sx={{ mb: 1, fontStyle: 'italic' }}>{exp.company}</Typography>
                  <Typography variant="body2">{exp.description}</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>

      {/* YETENEKLERİM BÖLÜMÜ */}
      <Box id="yetenekler" component="section" sx={{ py: 8 }}>
         <SectionTitle title="Yeteneklerim" />
         <Grid container spacing={3}>
            {skillsData.map((skillCategory) => (
              // İsteğiniz doğrultusunda CustomGrid bileşenini kullanıyoruz
              <CustomGrid size={{ xs: 12, sm: 6, md: 4 }} key={skillCategory.category}>
                <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                    {skillCategory.icon}
                    <Typography variant="h6" component="h3">{skillCategory.category}</Typography>
                  </Stack>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {skillCategory.items.map((skill) => (
                      <Chip label={skill} key={skill} variant="outlined" color="primary" />
                    ))}
                  </Box>
                </Paper>
              </CustomGrid>
            ))}
         </Grid>
      </Box>
    </Container>
  );
}