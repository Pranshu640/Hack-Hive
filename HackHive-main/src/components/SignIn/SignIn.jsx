import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const TECH_SKILLS = [
  'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js',
  'Angular', 'Vue.js', 'Django', 'Flask', 'Spring Boot', 'MongoDB',
  'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'Machine Learning',
  'Artificial Intelligence', 'Blockchain', 'DevOps'
];

const OTHER_SKILLS = [
  'Project Management', 'Team Leadership', 'Problem Solving',
  'UI/UX Design', 'Agile Methodology', 'Communication',
  'Data Analysis', 'System Design', 'Technical Writing'
];

const SignIn = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    email: '',
    password: '',
    // Tech Stack
    technicalSkills: {},  // Changed to object to store skill levels
    otherSkills: {},      // Changed to object to store skill levels
    // Experience
    projects: [{ name: '', description: '', techUsed: '' }],
    competitiveExperience: [{ platform: '', achievement: '', description: '' }]
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = () => {
    console.log('Validating step:', step);
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.password) newErrors.password = 'Password is required';
      if (formData.password && formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    }
    
    if (step === 2) {
      console.log('Validating technical skills:', formData.technicalSkills);
      if (Object.keys(formData.technicalSkills).length === 0) {
        newErrors.technicalSkills = 'Select at least one technical skill';
      }
    }
    
    console.log('Validation errors:', newErrors);
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    console.log('Validation result:', isValid ? 'passed' : 'failed');
    return isValid;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const renderBasicInfo = () => (
    <div className="step-container">
      <h2>Basic Information</h2>
      <div className="form-group">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your name"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Create password"
          required
        />
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );

  const handleSkillToggle = (skill, type) => {
    setFormData(prev => {
      const skillsField = type === 'technical' ? 'technicalSkills' : 'otherSkills';
      const skills = prev[skillsField];
      
      // Get current level (0 if not selected)
      const currentLevel = skills[skill] || 0;
      // Cycle through levels 1-5, or remove if already at level 5
      const newLevel = currentLevel === 5 ? 0 : currentLevel + 1;
      
      return {
        ...prev,
        [skillsField]: {
          ...skills,
          [skill]: newLevel || undefined  // Remove skill if level is 0
        }
      };
    });
  };

  const handleAddProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, { name: '', description: '', techUsed: '' }]
    }));
  };

  const handleAddCompetitiveExp = () => {
    setFormData(prev => ({
      ...prev,
      competitiveExperience: [...prev.competitiveExperience, 
        { platform: '', achievement: '', description: '' }]
    }));
  };

  const handleProjectChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.map((project, i) =>
        i === index ? { ...project, [field]: value } : project
      )
    }));
  };

  const handleCompetitiveExpChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      competitiveExperience: prev.competitiveExperience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const renderTechStack = () => (
    <div className="step-container">
      <h2>Technical Skills</h2>
      <div className="skills-section">
        <div className="skill-legend">
          <div className="skill-level level-1"><div className="skill-level-indicator">1</div>Level 1 - Basic Understanding</div>
          <div className="skill-level level-2"><div className="skill-level-indicator">2</div>Level 2 - Elementary Knowledge</div>
          <div className="skill-level level-3"><div className="skill-level-indicator">3</div>Level 3 - Intermediate Proficiency</div>
          <div className="skill-level level-4"><div className="skill-level-indicator">4</div>Level 4 - Advanced Expertise</div>
          <div className="skill-level level-5"><div className="skill-level-indicator">5</div>Level 5 - Master Level</div>
        </div>
        <h3>Technical Skills</h3>
        <div className="skills-grid">
          {TECH_SKILLS.map(skill => (
            <div
              key={skill}
              className={`skill-item ${formData.technicalSkills[skill] ? `level-${formData.technicalSkills[skill]}` : ''}`}
              onClick={() => handleSkillToggle(skill, 'technical')}
            >
              {skill}
            </div>
          ))}
        </div>
        {errors.technicalSkills && (
          <div className="error-message">{errors.technicalSkills}</div>
        )}

        <h3>Other Skills</h3>
        <div className="skills-grid">
          {OTHER_SKILLS.map(skill => (
            <div
              key={skill}
              className={`skill-item ${formData.otherSkills[skill] ? `level-${formData.otherSkills[skill]}` : ''}`}
              onClick={() => handleSkillToggle(skill, 'other')}
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
      <div className="navigation-buttons">
        <button onClick={handleBack}>Back</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="step-container">
      <h2>Experience</h2>
      
      <div className="experience-section">
        <h3>Projects</h3>
        {formData.projects.map((project, index) => (
          <div key={index} className="project-item">
            <div className="form-group">
              <input
                type="text"
                placeholder="Project Name"
                value={project.name}
                onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Project Description"
                value={project.description}
                onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Technologies Used"
                value={project.techUsed}
                onChange={(e) => handleProjectChange(index, 'techUsed', e.target.value)}
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddProject} className="add-button">
          Add Another Project
        </button>

        <h3>Competitive Experience</h3>
        {formData.competitiveExperience.map((exp, index) => (
          <div key={index} className="competitive-exp-item">
            <div className="form-group">
              <input
                type="text"
                placeholder="Platform (e.g., Hackerrank, CodeChef)"
                value={exp.platform}
                onChange={(e) => handleCompetitiveExpChange(index, 'platform', e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Achievement"
                value={exp.achievement}
                onChange={(e) => handleCompetitiveExpChange(index, 'achievement', e.target.value)}
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) => handleCompetitiveExpChange(index, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddCompetitiveExp} className="add-button">
          Add Another Competition
        </button>
      </div>

      <div className="navigation-buttons">
        <button onClick={handleBack}>Back</button>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Starting form submission...');
    if (!validateStep()) {
      console.log('Form validation failed:', errors);
      return;
    }

    console.log('All validations passed, preparing data for submission...');
    console.log('Form data to be submitted:', formData);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        skills: [
          ...Object.entries(formData.technicalSkills).map(([skill, level]) => `${skill} (Level ${level})`),
          ...Object.entries(formData.otherSkills).map(([skill, level]) => `${skill} (Level ${level})`)
        ],
        projects: formData.projects.map(project => ({
          title: project.name,
          description: project.description,
          technologies: project.techUsed.split(',').map(tech => tech.trim())
        })),
        competitiveExperience: formData.competitiveExperience.map(exp => ({
          platform: exp.platform,
          username: exp.achievement,
          achievements: [exp.description]
        }))
      });

      console.log('Signup successful:', response.data);
      // Store the token and navigate to profile
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        window.dispatchEvent(new Event('auth-change'));
        navigate('/profile');
      } else {
        throw new Error('No token received from server');
      }
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
      setErrors(prev => ({
        ...prev,
        submit: error.response?.data?.message || 'Failed to create account'
      }));
    }
  };

  return (
    <div className="sign-in-container">
      <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
        Already have an account? <Link to="/login" style={{ color: '#007bff', textDecoration: 'none' }}>Login here</Link>
      </div>
      {errors.submit && (
        <div className="error-message" style={{marginBottom: '1rem'}}>
          {errors.submit}
        </div>
      )}
      <div className="steps-indicator">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>Basic Info</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>Tech Stack</div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>Experience</div>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        {step === 1 && renderBasicInfo()}
        {step === 2 && renderTechStack()}
        {step === 3 && renderExperience()}
      </form>
    </div>
  );
};

export default SignIn;