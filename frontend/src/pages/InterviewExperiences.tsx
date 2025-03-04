import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Stack,
  Rating,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

// Mock data - Replace with API call
const mockExperiences = [
  {
    id: 1,
    studentName: 'John Doe',
    company: 'Tech Solutions Inc.',
    position: 'Software Engineer',
    date: '2024-02-15',
    experience: 'The interview process was well-structured and professional...',
    difficulty: 4,
    tips: [
      'Prepare well for system design questions',
      'Practice coding problems on LeetCode',
      'Review your projects thoroughly',
    ],
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    studentName: 'Jane Smith',
    company: 'Data Insights Co.',
    position: 'Data Analyst',
    date: '2024-02-20',
    experience: 'The technical interview focused on data analysis and SQL...',
    difficulty: 3,
    tips: [
      'Brush up on SQL queries',
      'Review statistical concepts',
      'Prepare data visualization examples',
    ],
    likes: 18,
    comments: 5,
  },
];

const companies = ['All', 'Tech Solutions Inc.', 'Data Insights Co.', 'AI Innovations'];
const positions = ['All', 'Software Engineer', 'Data Analyst', 'Product Manager'];

const InterviewExperiences = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [selectedPosition, setSelectedPosition] = useState('All');
  const [openDialog, setOpenDialog] = useState(false);
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    date: '',
    experience: '',
    difficulty: 0,
    tips: '',
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewExperience({
      company: '',
      position: '',
      date: '',
      experience: '',
      difficulty: 0,
      tips: '',
    });
  };

  const handleSubmit = () => {
    // Get user info from localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    
    // Create new experience object
    const experience = {
      id: mockExperiences.length + 1,
      studentName: userInfo.name || 'Anonymous',
      company: newExperience.company,
      position: newExperience.position,
      date: newExperience.date,
      experience: newExperience.experience,
      difficulty: newExperience.difficulty,
      tips: newExperience.tips.split(',').map(tip => tip.trim()),
      likes: 0,
      comments: 0,
    };

    // Add to mock data (replace with API call in production)
    mockExperiences.push(experience);
    
    handleCloseDialog();
  };

  const filteredExperiences = mockExperiences.filter((exp) => {
    const matchesSearch = exp.experience.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.tips.some((tip) => tip.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCompany = selectedCompany === 'All' || exp.company === selectedCompany;
    const matchesPosition = selectedPosition === 'All' || exp.position === selectedPosition;
    return matchesSearch && matchesCompany && matchesPosition;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1">
          Interview Experiences
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Share Experience
        </Button>
      </Box>

      {/* Search and Filter Section */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search experiences"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Company</InputLabel>
              <Select
                value={selectedCompany}
                label="Company"
                onChange={(e) => setSelectedCompany(e.target.value)}
              >
                {companies.map((company) => (
                  <MenuItem key={company} value={company}>
                    {company}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Position</InputLabel>
              <Select
                value={selectedPosition}
                label="Position"
                onChange={(e) => setSelectedPosition(e.target.value)}
              >
                {positions.map((position) => (
                  <MenuItem key={position} value={position}>
                    {position}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Experience Listings */}
      <Grid container spacing={3}>
        {filteredExperiences.map((exp) => (
          <Grid item xs={12} key={exp.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2 }}>{exp.studentName[0]}</Avatar>
                  <Box>
                    <Typography variant="subtitle1">{exp.studentName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {exp.date}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <BusinessIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="h6">{exp.company}</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WorkIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="subtitle1">{exp.position}</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                    Interview Difficulty:
                  </Typography>
                  <Rating value={exp.difficulty} readOnly size="small" />
                </Box>

                <Typography variant="body1" paragraph>
                  {exp.experience}
                </Typography>

                <Typography variant="subtitle2" gutterBottom>
                  Tips:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
                  {exp.tips.map((tip) => (
                    <Chip key={tip} label={tip} size="small" />
                  ))}
                </Stack>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      startIcon={<ThumbUpIcon />}
                      color="primary"
                      size="small"
                    >
                      {exp.likes} Likes
                    </Button>
                    <Button
                      startIcon={<CommentIcon />}
                      color="primary"
                      size="small"
                    >
                      {exp.comments} Comments
                    </Button>
                  </Box>
                  <Button
                    startIcon={<ShareIcon />}
                    color="primary"
                    size="small"
                  >
                    Share
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredExperiences.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No interview experiences found
          </Typography>
        </Box>
      )}

      {/* Share Experience Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          Share Your Interview Experience
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company"
                value={newExperience.company}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Position"
                value={newExperience.position}
                onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Interview Date"
                type="date"
                value={newExperience.date}
                onChange={(e) => setNewExperience({ ...newExperience, date: e.target.value })}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Your Experience"
                value={newExperience.experience}
                onChange={(e) => setNewExperience({ ...newExperience, experience: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography component="legend">Interview Difficulty</Typography>
              <Rating
                value={newExperience.difficulty}
                onChange={(_, newValue) => {
                  setNewExperience({ ...newExperience, difficulty: newValue || 0 });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Tips (comma-separated)"
                value={newExperience.tips}
                onChange={(e) => setNewExperience({ ...newExperience, tips: e.target.value })}
                required
                helperText="Enter tips separated by commas"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InterviewExperiences; 