import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';
import EventIcon from '@mui/icons-material/Event';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People';

const Home = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <WorkIcon sx={{ fontSize: 40 }} />,
      title: 'Job Opportunities',
      description: 'Access the latest job postings and placement drives from top companies.',
      link: '/jobs',
    },
    {
      icon: <EventIcon sx={{ fontSize: 40 }} />,
      title: 'Events & Workshops',
      description: 'Participate in career guidance sessions, webinars, and skill development workshops.',
      link: '/events',
    },
    {
      icon: <DescriptionIcon sx={{ fontSize: 40 }} />,
      title: 'Resume Builder',
      description: 'Create professional resumes with our easy-to-use resume builder tool.',
      link: '/resume-builder',
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      title: 'Interview Experiences',
      description: 'Learn from the experiences of students who have successfully cleared interviews.',
      link: '/interview-experiences',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                Welcome to PACT
              </Typography>
              <Typography variant="h5" gutterBottom>
                Your Gateway to Career Success
              </Typography>
              <Typography variant="body1" paragraph>
                PACT (Placement and Career Tutelage) is your comprehensive platform for career
                development, job opportunities, and professional growth.
              </Typography>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                color="secondary"
                size="large"
                sx={{ mt: 2 }}
              >
                Get Started
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Add hero image here */}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" gutterBottom align="center">
          Our Services
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature) => (
            <Grid item xs={12} sm={6} md={3} key={feature.title}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Button
                    component={RouterLink}
                    to={feature.link}
                    variant="outlined"
                    color="primary"
                  >
                    Learn More
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 6, mt: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={4} textAlign="center">
              <Typography variant="h3" color="primary" gutterBottom>
                1000+
              </Typography>
              <Typography variant="h6">Students Placed</Typography>
            </Grid>
            <Grid item xs={12} sm={4} textAlign="center">
              <Typography variant="h3" color="primary" gutterBottom>
                50+
              </Typography>
              <Typography variant="h6">Partner Companies</Typography>
            </Grid>
            <Grid item xs={12} sm={4} textAlign="center">
              <Typography variant="h3" color="primary" gutterBottom>
                95%
              </Typography>
              <Typography variant="h6">Placement Rate</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 