import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Stack,
  Tabs,
  Tab,
  useTheme,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupIcon from '@mui/icons-material/Group';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

// Mock data - Replace with API call
const mockEvents = [
  {
    id: 1,
    title: 'Career Development Workshop',
    type: 'Workshop',
    date: '2024-03-15',
    time: '10:00 AM - 12:00 PM',
    location: 'Room 101, Main Building',
    description: 'Learn essential skills for career development and professional growth.',
    capacity: 50,
    registered: 30,
    isOnline: false,
  },
  {
    id: 2,
    title: 'Tech Industry Panel Discussion',
    type: 'Webinar',
    date: '2024-03-20',
    time: '2:00 PM - 4:00 PM',
    location: 'Online',
    description: 'Join industry experts for an insightful discussion on tech trends.',
    capacity: 200,
    registered: 150,
    isOnline: true,
  },
  // Add more mock events as needed
];

const Events = () => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const filteredEvents = mockEvents.filter((event) => {
    if (selectedTab === 0) return true;
    if (selectedTab === 1) return event.type === 'Workshop';
    if (selectedTab === 2) return event.type === 'Webinar';
    return false;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Events & Workshops
      </Typography>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="All Events" />
          <Tab label="Workshops" />
          <Tab label="Webinars" />
        </Tabs>
      </Box>

      {/* Event Listings */}
      <Grid container spacing={3}>
        {filteredEvents.map((event) => (
          <Grid item xs={12} md={6} key={event.id}>
            <Card>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <EventIcon color="primary" />
                  <Typography variant="h5" component="h2">
                    {event.title}
                  </Typography>
                </Stack>

                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarMonthIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {event.date}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTimeIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {event.time}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {event.isOnline ? (
                      <VideoLibraryIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    ) : (
                      <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    )}
                    <Typography variant="body2" color="text.secondary">
                      {event.location}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <GroupIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {event.registered}/{event.capacity} participants
                    </Typography>
                  </Box>

                  <Typography variant="body2" paragraph>
                    {event.description}
                  </Typography>

                  <Stack direction="row" spacing={1}>
                    <Chip
                      label={event.type}
                      color="primary"
                      size="small"
                    />
                    {event.isOnline && (
                      <Chip
                        label="Online"
                        color="secondary"
                        size="small"
                      />
                    )}
                  </Stack>
                </Stack>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={event.registered >= event.capacity}
                >
                  {event.registered >= event.capacity ? 'Full' : 'Register'}
                </Button>
                <Button variant="outlined" color="primary">
                  Add to Calendar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredEvents.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No events found
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Events; 