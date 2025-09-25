import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  DollarSign,
  Plus,
  X,
  Save,
  Link as LinkIcon,
  GraduationCap
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { GlassCard } from '../components/ui/glass-card';
import { useStore } from '../store/useStore';
import { Education } from '../types';

const experienceLevels = ['Entry', 'Mid', 'Senior', 'Lead'];

const commonSkills = [
  'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Java',
  'AWS', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL', 'GraphQL',
  'Next.js', 'Vue.js', 'Angular', 'PHP', 'Ruby', 'Go', 'Rust'
];

export function ProfilePage() {
  const { user, updateUser } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(user || {
    id: '',
    name: '',
    email: '',
    phone: '',
    location: '',
    currentRole: '',
    experienceLevel: 'Mid',
    salaryExpectation: '',
    education: [],
    skills: [],
    links: {}
  });
  const [newSkill, setNewSkill] = useState('');
  const [newEducation, setNewEducation] = useState<Partial<Education>>({
    degree: '',
    institution: '',
    graduationYear: new Date().getFullYear()
  });

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      updateUser(formData);
      setIsEditing(false);
      setIsSaving(false);
    }, 1000);
  };

  const handleCancel = () => {
    setFormData(user || formData);
    setIsEditing(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addEducation = () => {
    if (newEducation.degree && newEducation.institution && newEducation.graduationYear) {
      const education: Education = {
        id: Date.now().toString(),
        degree: newEducation.degree,
        institution: newEducation.institution,
        graduationYear: newEducation.graduationYear
      };
      
      setFormData(prev => ({
        ...prev,
        education: [...prev.education, education]
      }));
      
      setNewEducation({
        degree: '',
        institution: '',
        graduationYear: new Date().getFullYear()
      });
    }
  };

  const removeEducation = (educationId: string) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== educationId)
    }));
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 mt-10">
              Profile Settings
            </h1>
            <p className="text-gray-400 text-lg">
              Manage your personal information and preferences
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={handleCancel}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800/50"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-primary-600 hover:bg-primary-700"
                >
                  {isSaving ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Saving...
                    </div>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => setIsEditing(true)}
                className="bg-primary-600 hover:bg-primary-700"
              >
                Edit Profile
              </Button>
            )}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Personal Information */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <GlassCard className="p-6 mb-6">
                <h2 className="text-xl font-semibold text-white mb-6">Personal Information</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-3 bg-gray-800/30 rounded-lg">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-white">{formData.name || 'Not specified'}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-3 bg-gray-800/30 rounded-lg">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-white">{formData.email || 'Not specified'}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={formData.phone || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-3 bg-gray-800/30 rounded-lg">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-white">{formData.phone || 'Not specified'}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-gray-300">Location</Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        value={formData.location || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-3 bg-gray-800/30 rounded-lg">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-white">{formData.location || 'Not specified'}</span>
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Professional Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlassCard className="p-6 mb-6">
                <h2 className="text-xl font-semibold text-white mb-6">Professional Information</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentRole" className="text-gray-300">Current Role</Label>
                    {isEditing ? (
                      <Input
                        id="currentRole"
                        value={formData.currentRole || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, currentRole: e.target.value }))}
                        className="bg-gray-800/50 border-gray-700 text-white"
                        placeholder="e.g. Frontend Developer"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-3 bg-gray-800/30 rounded-lg">
                        <Briefcase className="h-4 w-4 text-gray-400" />
                        <span className="text-white">{formData.currentRole || 'Not specified'}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experienceLevel" className="text-gray-300">Experience Level</Label>
                    {isEditing ? (
                      <Select 
                        value={formData.experienceLevel} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, experienceLevel: value as any }))}
                      >
                        <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {experienceLevels.map(level => (
                            <SelectItem key={level} value={level}>{level}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="flex items-center space-x-2 p-3 bg-gray-800/30 rounded-lg">
                        <span className="text-white">{formData.experienceLevel || 'Not specified'}</span>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="salaryExpectation" className="text-gray-300">Salary Expectation</Label>
                    {isEditing ? (
                      <Input
                        id="salaryExpectation"
                        value={formData.salaryExpectation || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, salaryExpectation: e.target.value }))}
                        className="bg-gray-800/50 border-gray-700 text-white"
                        placeholder="e.g. $80,000 - $120,000"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-3 bg-gray-800/30 rounded-lg">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span className="text-white">{formData.salaryExpectation || 'Not specified'}</span>
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Skills & Education */}
          <div>
            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <GlassCard className="p-6 mb-6">
                <h2 className="text-xl font-semibold text-white mb-6">Skills</h2>
                
                {/* Skills Display */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-center bg-primary-600/20 text-primary-400 px-3 py-1 rounded-full text-sm"
                    >
                      <span>{skill}</span>
                      {isEditing && (
                        <button
                          onClick={() => removeSkill(skill)}
                          className="ml-2 hover:text-red-400 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Add Skill */}
                {isEditing && (
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                        placeholder="Add a skill"
                        className="bg-gray-800/50 border-gray-700 text-white text-sm"
                      />
                      <Button 
                        onClick={addSkill}
                        size="sm"
                        className="bg-primary-600 hover:bg-primary-700"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Suggested Skills */}
                    <div className="flex flex-wrap gap-1">
                      {commonSkills
                        .filter(skill => !formData.skills.includes(skill))
                        .slice(0, 6)
                        .map(skill => (
                        <button
                          key={skill}
                          onClick={() => {
                            setNewSkill(skill);
                            setTimeout(addSkill, 0);
                          }}
                          className="text-xs px-2 py-1 bg-gray-800/50 text-gray-400 rounded hover:text-white transition-colors"
                        >
                          + {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </GlassCard>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <GlassCard className="p-6 mb-6">
                <h2 className="text-xl font-semibold text-white mb-6">Education</h2>
                
                <div className="space-y-4 mb-4">
                  {formData.education.map((edu, index) => (
                    <motion.div
                      key={edu.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 bg-gray-800/30 rounded-lg"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <GraduationCap className="h-4 w-4 text-primary-400" />
                            <h3 className="font-medium text-white">{edu.degree}</h3>
                          </div>
                          <p className="text-gray-400 text-sm">{edu.institution}</p>
                          <p className="text-gray-500 text-xs mt-1">Class of {edu.graduationYear}</p>
                        </div>
                        {isEditing && (
                          <button
                            onClick={() => removeEducation(edu.id)}
                            className="text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Add Education */}
                {isEditing && (
                  <div className="space-y-3 p-4 bg-gray-800/20 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-300">Add Education</h4>
                    <Input
                      value={newEducation.degree || ''}
                      onChange={(e) => setNewEducation(prev => ({ ...prev, degree: e.target.value }))}
                      placeholder="Degree (e.g. Bachelor of Computer Science)"
                      className="bg-gray-800/50 border-gray-700 text-white text-sm"
                    />
                    <Input
                      value={newEducation.institution || ''}
                      onChange={(e) => setNewEducation(prev => ({ ...prev, institution: e.target.value }))}
                      placeholder="Institution"
                      className="bg-gray-800/50 border-gray-700 text-white text-sm"
                    />
                    <Input
                      type="number"
                      value={newEducation.graduationYear || ''}
                      onChange={(e) => setNewEducation(prev => ({ ...prev, graduationYear: parseInt(e.target.value) }))}
                      placeholder="Graduation Year"
                      className="bg-gray-800/50 border-gray-700 text-white text-sm"
                    />
                    <Button 
                      onClick={addEducation}
                      size="sm"
                      className="bg-primary-600 hover:bg-primary-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Education
                    </Button>
                  </div>
                )}
              </GlassCard>
            </motion.div>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Professional Links</h2>
                
                <div className="space-y-4">
                  {['linkedin', 'github', 'portfolio'].map((platform) => (
                    <div key={platform} className="space-y-2">
                      <Label className="text-gray-300 capitalize">{platform}</Label>
                      {isEditing ? (
                        <Input
                          value={formData.links[platform as keyof typeof formData.links] || ''}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            links: { ...prev.links, [platform]: e.target.value }
                          }))}
                          placeholder={`Your ${platform} URL`}
                          className="bg-gray-800/50 border-gray-700 text-white text-sm"
                        />
                      ) : (
                        <div className="flex items-center space-x-2 p-3 bg-gray-800/30 rounded-lg">
                          <LinkIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-white text-sm">
                            {formData.links[platform as keyof typeof formData.links] || 'Not specified'}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}