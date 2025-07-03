// src/app/page.tsx

'use client';

import { Box, Typography, Container, Divider, Paper, Grid, Chip, Stack } from '@mui/material';
import CustomGrid from '@/components/CustomGrid';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import React from 'react';
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build';
import StorageIcon from '@mui/icons-material/Storage';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import ConstructionIcon from '@mui/icons-material/Construction';

const SectionTitle = ({ title, number }: { title: string; number: string }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
    <Typography variant="h3" component="h2" sx={{ whiteSpace: 'nowrap' }}>
       <Typography component="span" variant="h3" color="primary.main">{number}.</Typography> {title}
    </Typography>
    <Divider sx={{ flexGrow: 1, ml: 3, borderColor: 'rgba(255, 255, 255, 0.12)' }} />
  </Box>
);

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

interface SkillCategory {
  category: string;
  icon: React.ReactElement;
  items: string[];
}

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
      <Box 
        id="hakkimda" 
        component="section" 
        sx={{ 
          minHeight: '90vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        <Typography variant="h1" component="h1" sx={{ fontWeight: 'bold' }}>
          Fikirleri Koda, Kodları <br/>
          <Typography component="span" variant="h1" color="primary.main">Değere Dönüştürürüm.</Typography>
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mt: 2, mb: 4 }}>
          Java (Spring) ve JavaScript (React, Next.js) ekosistemlerinde,
          <br/>uçtan uca modern ve ölçeklenebilir çözümler geliştiriyorum.
        </Typography>
        <Typography variant="body1" maxWidth="lg">
          Kariyerim boyunca bankacılığın düzenlenmiş dünyasından endüstriyel otomasyonun (SCADA) özel ihtiyaçlarına kadar farklı alanlarda edindiğim tecrübeyle, Java (Spring Boot) ile kurumsal düzeyde güvenilir ve ölçeklenebilir backend sistemleri kurarken, React (Next.js) ile bu sistemleri modern ve kullanıcı dostu arayüzlerle buluşturuyorum. Nihai amacım, karmaşık iş süreçlerini ve teknik gereksinimleri herkes için anlaşılır, yönetilebilir ve verimli çözümlere dönüştürmektir.
        </Typography>
      </Box>

      <Box id="deneyim" component="section" sx={{ py: 10 }}>
        <SectionTitle title="Deneyimlerim" number="01" />
        <Timeline position="left" sx={{ [`& .MuiTimelineItem-root::before`]: { flex: 0, padding: 0 } }}>
          {experiences.map((exp, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color="primary" variant="outlined" />
                {index < experiences.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Paper elevation={3} sx={{ p: 3, borderLeft: '4px solid', borderColor: 'primary.main' }}>
                  <Typography variant="h6" component="h3">{exp.title} - <Typography component="span" variant="h6" color="primary.main">{exp.company}</Typography></Typography>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontStyle: 'italic', color: 'text.secondary' }}>{exp.date}</Typography>
                  <Typography variant="body2">{exp.description}</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>

      <Box id="yetenekler" component="section" sx={{ py: 10 }}>
         <SectionTitle title="Yeteneklerim" number="02" />
         <Grid container spacing={3}>
            {skillsData.map((skillCategory) => (
              <CustomGrid size={{ xs: 12, sm: 6, md: 4 }} key={skillCategory.category}>
                <Paper elevation={2} sx={{ p: 2.5, height: '100%' }}>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Typography color="primary">{skillCategory.icon}</Typography>
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