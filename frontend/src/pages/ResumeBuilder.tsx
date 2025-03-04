import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import CodeIcon from '@mui/icons-material/Code';

const steps = [
  'Personal Information',
  'Education',
  'Experience',
  'Skills',
  'Projects',
  'Preview',
];

interface FormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    summary: string;
  };
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string;
    link: string;
  }>;
}

const ResumeBuilder = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      summary: '',
    },
    education: [
      {
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: '',
      },
    ],
    experience: [
      {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ],
    skills: [],
    projects: [
      {
        name: '',
        description: '',
        technologies: '',
        link: '',
      },
    ],
  });

  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const [atsScore, setAtsScore] = useState(0);
  const [atsFeedback, setAtsFeedback] = useState('');

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handlePersonalInfoChange = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [field]: event.target.value,
      },
    });
  };

  const handleAddEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          gpa: '',
        },
      ],
    });
  };

  const handleAddExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        {
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    });
  };

  const handleAddProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        {
          name: '',
          description: '',
          technologies: '',
          link: '',
        },
      ],
    });
  };

  const handleAddSkill = (skill: string) => {
    if (skill.trim()) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill.trim()],
      });
    }
  };

  const handleRemoveSkill = (index: number) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index),
    });
  };

  const calculateATSScore = () => {
    // Simple ATS scoring algorithm
    let score = 0;
    const keywords = ['experience', 'skills', 'education', 'projects', 'technologies'];
    
    // Check for keywords in summary
    keywords.forEach(keyword => {
      if (formData.personalInfo.summary.toLowerCase().includes(keyword)) {
        score += 10;
      }
    });

    // Check for skills match
    formData.skills.forEach(skill => {
      if (formData.personalInfo.summary.toLowerCase().includes(skill.toLowerCase())) {
        score += 5;
      }
    });

    // Check for proper formatting
    if (formData.personalInfo.summary.length > 100) score += 10;
    if (formData.experience.length > 0) score += 10;
    if (formData.education.length > 0) score += 10;
    if (formData.skills.length > 5) score += 10;

    // Cap score at 100
    score = Math.min(score, 100);
    setAtsScore(score);

    // Generate feedback
    let feedback = '';
    if (score < 50) {
      feedback = 'Your resume needs significant improvements for better ATS compatibility.';
    } else if (score < 75) {
      feedback = 'Your resume has moderate ATS compatibility. Consider adding more relevant keywords.';
    } else {
      feedback = 'Your resume has good ATS compatibility.';
    }
    setAtsFeedback(feedback);
  };

  const handleDownload = (format: string) => {
    // Here you would implement the actual download logic
    // For now, we'll just show a success message
    alert(`Downloading resume in ${format} format...`);
    setDownloadDialogOpen(false);
  };

  const handleOpenDownloadDialog = () => {
    calculateATSScore();
    setDownloadDialogOpen(true);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={formData.personalInfo.firstName}
                onChange={handlePersonalInfoChange('firstName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={formData.personalInfo.lastName}
                onChange={handlePersonalInfoChange('lastName')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.personalInfo.email}
                onChange={handlePersonalInfoChange('email')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.personalInfo.phone}
                onChange={handlePersonalInfoChange('phone')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Address"
                value={formData.personalInfo.address}
                onChange={handlePersonalInfoChange('address')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Professional Summary"
                value={formData.personalInfo.summary}
                onChange={handlePersonalInfoChange('summary')}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Box>
            {formData.education.map((edu, index) => (
              <Paper key={index} sx={{ p: 2, mb: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Institution"
                      value={edu.institution}
                      onChange={(e) => {
                        const newEducation = [...formData.education];
                        newEducation[index].institution = e.target.value;
                        setFormData({ ...formData, education: newEducation });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Degree"
                      value={edu.degree}
                      onChange={(e) => {
                        const newEducation = [...formData.education];
                        newEducation[index].degree = e.target.value;
                        setFormData({ ...formData, education: newEducation });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Field of Study"
                      value={edu.field}
                      onChange={(e) => {
                        const newEducation = [...formData.education];
                        newEducation[index].field = e.target.value;
                        setFormData({ ...formData, education: newEducation });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Start Date"
                      type="date"
                      value={edu.startDate}
                      onChange={(e) => {
                        const newEducation = [...formData.education];
                        newEducation[index].startDate = e.target.value;
                        setFormData({ ...formData, education: newEducation });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="End Date"
                      type="date"
                      value={edu.endDate}
                      onChange={(e) => {
                        const newEducation = [...formData.education];
                        newEducation[index].endDate = e.target.value;
                        setFormData({ ...formData, education: newEducation });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="GPA"
                      value={edu.gpa}
                      onChange={(e) => {
                        const newEducation = [...formData.education];
                        newEducation[index].gpa = e.target.value;
                        setFormData({ ...formData, education: newEducation });
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddEducation}
              variant="outlined"
            >
              Add Education
            </Button>
          </Box>
        );

      case 2:
        return (
          <Box>
            {formData.experience.map((exp, index) => (
              <Paper key={index} sx={{ p: 2, mb: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Company"
                      value={exp.company}
                      onChange={(e) => {
                        const newExperience = [...formData.experience];
                        newExperience[index].company = e.target.value;
                        setFormData({ ...formData, experience: newExperience });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Position"
                      value={exp.position}
                      onChange={(e) => {
                        const newExperience = [...formData.experience];
                        newExperience[index].position = e.target.value;
                        setFormData({ ...formData, experience: newExperience });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Start Date"
                      type="date"
                      value={exp.startDate}
                      onChange={(e) => {
                        const newExperience = [...formData.experience];
                        newExperience[index].startDate = e.target.value;
                        setFormData({ ...formData, experience: newExperience });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="End Date"
                      type="date"
                      value={exp.endDate}
                      onChange={(e) => {
                        const newExperience = [...formData.experience];
                        newExperience[index].endDate = e.target.value;
                        setFormData({ ...formData, experience: newExperience });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Description"
                      value={exp.description}
                      onChange={(e) => {
                        const newExperience = [...formData.experience];
                        newExperience[index].description = e.target.value;
                        setFormData({ ...formData, experience: newExperience });
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddExperience}
              variant="outlined"
            >
              Add Experience
            </Button>
          </Box>
        );

      case 3:
        return (
          <Box>
            <TextField
              fullWidth
              label="Add Skill"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddSkill((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = '';
                }
              }}
            />
            <List>
              {formData.skills.map((skill, index) => (
                <ListItem key={index}>
                  <ListItemText primary={skill} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemoveSkill(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>
        );

      case 4:
        return (
          <Box>
            {formData.projects.map((project, index) => (
              <Paper key={index} sx={{ p: 2, mb: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Project Name"
                      value={project.name}
                      onChange={(e) => {
                        const newProjects = [...formData.projects];
                        newProjects[index].name = e.target.value;
                        setFormData({ ...formData, projects: newProjects });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Description"
                      value={project.description}
                      onChange={(e) => {
                        const newProjects = [...formData.projects];
                        newProjects[index].description = e.target.value;
                        setFormData({ ...formData, projects: newProjects });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Technologies Used"
                      value={project.technologies}
                      onChange={(e) => {
                        const newProjects = [...formData.projects];
                        newProjects[index].technologies = e.target.value;
                        setFormData({ ...formData, projects: newProjects });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Project Link"
                      value={project.link}
                      onChange={(e) => {
                        const newProjects = [...formData.projects];
                        newProjects[index].link = e.target.value;
                        setFormData({ ...formData, projects: newProjects });
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddProject}
              variant="outlined"
            >
              Add Project
            </Button>
          </Box>
        );

      case 5:
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Resume Preview
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Alert severity="info" sx={{ mb: 2 }}>
                Preview your resume before downloading. Make sure all information is accurate and well-formatted.
              </Alert>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={handleOpenDownloadDialog}
                sx={{ mb: 2 }}
              >
                Download Resume
              </Button>
            </Box>
            <Box sx={{ border: '1px solid #ddd', p: 3, borderRadius: 1 }}>
              <Typography variant="h5" gutterBottom>
                {formData.personalInfo.firstName} {formData.personalInfo.lastName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {formData.personalInfo.email} | {formData.personalInfo.phone}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {formData.personalInfo.address}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Professional Summary
              </Typography>
              <Typography variant="body1" paragraph>
                {formData.personalInfo.summary}
              </Typography>
            </Box>
          </Paper>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Resume Builder
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mb: 4 }}>
        {renderStepContent(activeStep)}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
        >
          Next
        </Button>
      </Box>

      <Dialog open={downloadDialogOpen} onClose={() => setDownloadDialogOpen(false)}>
        <DialogTitle>Download Resume</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              ATS Compatibility Score: {atsScore}%
            </Typography>
            <Alert severity={atsScore >= 75 ? "success" : atsScore >= 50 ? "warning" : "error"}>
              {atsFeedback}
            </Alert>
          </Box>
          <Typography variant="body1" gutterBottom>
            Choose your preferred format:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<PictureAsPdfIcon />}
                onClick={() => handleDownload('PDF')}
              >
                Download as PDF (ATS Optimized)
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<DescriptionIcon />}
                onClick={() => handleDownload('DOCX')}
              >
                Download as DOCX (ATS Optimized)
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<CodeIcon />}
                onClick={() => handleDownload('TXT')}
              >
                Download as Plain Text (ATS Optimized)
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDownloadDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ResumeBuilder; 