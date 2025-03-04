import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  School as SchoolIcon,
  CalendarToday as CalendarIcon,
  Edit as EditIcon,
  Upload as UploadIcon,
  Description as DescriptionIcon,
  Delete as DeleteIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  department: Yup.string().required('Department is required'),
  graduationYear: Yup.string().required('Graduation year is required'),
  studentId: Yup.string().required('Student ID is required'),
});

const Profile = () => {
  const navigate = useNavigate();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeName, setResumeName] = useState<string>('');
  
  // Get user info from localStorage
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // Get resume info from localStorage
  const savedResume = localStorage.getItem('userResume');
  if (savedResume && !resumeName) {
    setResumeName(savedResume);
  }

  const formik = useFormik({
    initialValues: {
      name: userInfo.name || '',
      email: userInfo.email || '',
      department: userInfo.department || '',
      graduationYear: userInfo.graduationYear || '',
      studentId: userInfo.studentId || '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Update user info in localStorage
      const updatedUserInfo = {
        ...userInfo,
        ...values,
      };
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
      setOpenEditDialog(false);
      // Force a re-render to show updated info
      window.location.reload();
    },
  });

  const handleEditProfile = () => {
    setOpenEditDialog(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userResume');
    navigate('/login');
  };

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
      setResumeName(file.name);
      localStorage.setItem('userResume', file.name);
    }
  };

  const handleResumeDelete = () => {
    setResumeFile(null);
    setResumeName('');
    localStorage.removeItem('userResume');
  };

  const handleAdminPanel = () => {
    navigate('/admin');
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              mr: 3,
              bgcolor: isAdmin ? 'secondary.main' : 'primary.main',
            }}
          >
            {userInfo.name?.charAt(0) || 'U'}
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {userInfo.name || 'User'}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={handleEditProfile}
              >
                Edit Profile
              </Button>
              {isAdmin && (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<AdminIcon />}
                  onClick={handleAdminPanel}
                >
                  Admin Panel
                </Button>
              )}
              <Button
                variant="outlined"
                color="error"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Email"
                  secondary={userInfo.email}
                />
              </ListItem>
              {!isAdmin && (
                <>
                  <ListItem>
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Department"
                      secondary={userInfo.department}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Graduation Year"
                      secondary={userInfo.graduationYear}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Student ID"
                      secondary={userInfo.studentId}
                    />
                  </ListItem>
                </>
              )}
            </List>
          </Grid>
        </Grid>

        {!isAdmin && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Resume
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <input
                accept="application/pdf"
                style={{ display: 'none' }}
                id="resume-upload"
                type="file"
                onChange={handleResumeUpload}
              />
              <label htmlFor="resume-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<UploadIcon />}
                >
                  Upload Resume
                </Button>
              </label>
              {resumeName && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <DescriptionIcon color="primary" />
                  <Typography>{resumeName}</Typography>
                  <Tooltip title="Delete Resume">
                    <IconButton onClick={handleResumeDelete} color="error" size="small">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              Upload your resume in PDF format. This will be visible to recruiters.
            </Typography>
          </Box>
        )}

        {isAdmin && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Admin Features
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Manage Users"
                  secondary="Add, edit, or remove user accounts"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Manage Events"
                  secondary="Create and manage campus events"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Manage Jobs"
                  secondary="Post and manage job listings"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="View Analytics"
                  secondary="Access system analytics and reports"
                />
              </ListItem>
            </List>
          </Box>
        )}
      </Paper>

      {/* Edit Profile Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Full Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name?.toString()}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email?.toString()}
              margin="normal"
              required
            />
            {!isAdmin && (
              <>
                <TextField
                  fullWidth
                  id="department"
                  name="department"
                  label="Department"
                  value={formik.values.department}
                  onChange={formik.handleChange}
                  error={formik.touched.department && Boolean(formik.errors.department)}
                  helperText={formik.touched.department && formik.errors.department?.toString()}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  id="graduationYear"
                  name="graduationYear"
                  label="Graduation Year"
                  value={formik.values.graduationYear}
                  onChange={formik.handleChange}
                  error={formik.touched.graduationYear && Boolean(formik.errors.graduationYear)}
                  helperText={formik.touched.graduationYear && formik.errors.graduationYear?.toString()}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  id="studentId"
                  name="studentId"
                  label="Student ID"
                  value={formik.values.studentId}
                  onChange={formik.handleChange}
                  error={formik.touched.studentId && Boolean(formik.errors.studentId)}
                  helperText={formik.touched.studentId && formik.errors.studentId?.toString()}
                  margin="normal"
                  required
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default Profile; 