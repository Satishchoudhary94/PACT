import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Tabs,
  Tab,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Assessment as AssessmentIcon,
  Event as EventIcon,
  Work as WorkIcon,
  People as PeopleIcon,
} from '@mui/icons-material';

// Mock data - Replace with API calls
const mockStats = {
  totalStudents: 1500,
  placedStudents: 1200,
  activeJobs: 45,
  upcomingEvents: 8,
  placementRate: 80,
};

const mockStudents = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    department: 'Computer Science',
    status: 'Placed',
    company: 'Tech Solutions Inc.',
    package: '$80,000',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    department: 'Information Technology',
    status: 'Not Placed',
    company: '-',
    package: '-',
  },
  // Add more mock students
];

const mockJobs = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Tech Solutions Inc.',
    postedDate: '2024-03-01',
    deadline: '2024-03-15',
    applications: 25,
    status: 'Active',
  },
  {
    id: 2,
    title: 'Data Analyst',
    company: 'Data Insights Co.',
    postedDate: '2024-03-02',
    deadline: '2024-03-20',
    applications: 18,
    status: 'Active',
  },
  // Add more mock jobs
];

const mockEvents = [
  { id: 1, title: 'Career Fair 2024', date: '2024-03-15', type: 'Career Fair', status: 'Upcoming' },
  { id: 2, title: 'Resume Workshop', date: '2024-03-10', type: 'Workshop', status: 'Completed' },
];

const mockResumes = [
  { id: 1, student: 'John Doe', score: 85, feedback: 'Strong technical skills' },
  { id: 2, student: 'Jane Smith', score: 78, feedback: 'Good communication skills' },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const AdminDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'event' | 'job' | 'student'>('event');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (type: 'event' | 'job' | 'student') => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const renderStats = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <PeopleIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h4">{mockStats.totalStudents}</Typography>
          <Typography color="text.secondary">Total Students</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <WorkIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h4">{mockStats.placedStudents}</Typography>
          <Typography color="text.secondary">Placed Students</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <EventIcon color="warning" sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h4">{mockStats.activeJobs}</Typography>
          <Typography color="text.secondary">Active Jobs</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <AssessmentIcon color="info" sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h4">{mockStats.placementRate}%</Typography>
          <Typography color="text.secondary">Placement Rate</Typography>
        </Paper>
      </Grid>
    </Grid>
  );

  const renderStudentsTable = () => (
    <TableContainer component={Paper}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Student Records</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog('student')}
        >
          Add Student
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Package</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.department}</TableCell>
              <TableCell>
                <Chip
                  label={student.status}
                  color={student.status === 'Placed' ? 'success' : 'warning'}
                />
              </TableCell>
              <TableCell>{student.company}</TableCell>
              <TableCell>{student.package}</TableCell>
              <TableCell>
                <IconButton color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderJobsTable = () => (
    <TableContainer component={Paper}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Job Postings</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog('job')}
        >
          Add Job
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Posted Date</TableCell>
            <TableCell>Deadline</TableCell>
            <TableCell>Applications</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockJobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell>{job.postedDate}</TableCell>
              <TableCell>{job.deadline}</TableCell>
              <TableCell>{job.applications}</TableCell>
              <TableCell>
                <Chip
                  label={job.status}
                  color={job.status === 'Active' ? 'success' : 'default'}
                />
              </TableCell>
              <TableCell>
                <IconButton color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderEventsTable = () => (
    <TableContainer component={Paper}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Events</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog('event')}
        >
          Add Event
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockEvents.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.title}</TableCell>
              <TableCell>{event.date}</TableCell>
              <TableCell>{event.type}</TableCell>
              <TableCell>
                <Chip
                  label={event.status}
                  color={event.status === 'Upcoming' ? 'primary' : 'default'}
                />
              </TableCell>
              <TableCell>
                <IconButton size="small">
                  <EditIcon />
                </IconButton>
                <IconButton size="small">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderResumesTable = () => (
    <TableContainer component={Paper}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Resume Analysis</Typography>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Student</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Feedback</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockResumes.map((resume) => (
            <TableRow key={resume.id}>
              <TableCell>{resume.student}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={resume.score}
                    sx={{ width: 100 }}
                  />
                  <Typography>{resume.score}%</Typography>
                </Box>
              </TableCell>
              <TableCell>{resume.feedback}</TableCell>
              <TableCell>
                <IconButton size="small">
                  <AssessmentIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>

      {renderStats()}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Events" />
          <Tab label="Jobs" />
          <Tab label="Students" />
          <Tab label="Resume Analysis" />
        </Tabs>
      </Box>

      <Box sx={{ mt: 3 }}>
        {tabValue === 0 && renderEventsTable()}
        {tabValue === 1 && renderJobsTable()}
        {tabValue === 2 && renderStudentsTable()}
        {tabValue === 3 && renderResumesTable()}
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {dialogType === 'event' ? 'Add New Event' : dialogType === 'job' ? 'Add New Job' : 'Update Student Status'}
        </DialogTitle>
        <DialogContent>
          {dialogType === 'event' && (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Event Title"
                fullWidth
                variant="outlined"
              />
              <TextField
                margin="dense"
                label="Date"
                type="date"
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                margin="dense"
                label="Type"
                fullWidth
                variant="outlined"
              />
              <TextField
                margin="dense"
                label="Status"
                fullWidth
                variant="outlined"
              />
            </>
          )}
          {dialogType === 'job' && (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Job Title"
                fullWidth
                variant="outlined"
              />
              <TextField
                margin="dense"
                label="Company"
                fullWidth
                variant="outlined"
              />
              <TextField
                margin="dense"
                label="Deadline"
                type="date"
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </>
          )}
          {dialogType === 'student' && (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Status"
                fullWidth
                variant="outlined"
              />
              <TextField
                margin="dense"
                label="Company"
                fullWidth
                variant="outlined"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            {dialogType === 'event' ? 'Add Event' : dialogType === 'job' ? 'Add Job' : 'Update Status'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard; 