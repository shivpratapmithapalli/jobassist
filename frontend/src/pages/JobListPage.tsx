import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Plus, 
  MapPin,
  Calendar,
  Download,
  Edit3,
  Trash2,
  Building,
  X
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { GlassCard } from '../components/ui/glass-card';
import { useStore } from '../store/useStore';
import { formatDate } from '../lib/utils';
import { JobApplication } from '../types';
import { mockJobApplications } from '../data/mockData';

interface TimelineEvent {
  id: string;
  date: string;
  event: string;
  description: string;
}

export function JobListPage() {
  const { jobApplications, updateJobApplication } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<JobApplication | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<JobApplication>>({});
  const [newTimelineEvent, setNewTimelineEvent] = useState<Omit<TimelineEvent, 'id'>>({ 
    date: new Date().toISOString().split('T')[0],
    event: '',
    description: '' 
  });

  const handleEditClick = (job: JobApplication) => {
    setSelectedJob(job);
    setEditForm({ ...job });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!selectedJob) return;
    updateJobApplication(selectedJob.id, editForm as JobApplication);
    setIsEditing(false);
  };

  const handleTimelineAdd = () => {
    if (!newTimelineEvent.event || !selectedJob) return;
    
    const event: TimelineEvent = {
      id: Date.now().toString(),
      ...newTimelineEvent
    };

    const updatedJob = {
      ...selectedJob,
      timeline: [...selectedJob.timeline, event]
    };

    updateJobApplication(selectedJob.id, updatedJob);
    setSelectedJob(updatedJob);
    setNewTimelineEvent({ date: new Date().toISOString().split('T')[0], event: '', description: '' });
  };

  const handleTimelineDelete = (eventId: string) => {
    if (!selectedJob) return;
    
    const updatedJob = {
      ...selectedJob,
      timeline: selectedJob.timeline.filter(event => event.id !== eventId)
    };

    updateJobApplication(selectedJob.id, updatedJob);
    setSelectedJob(updatedJob);
  };

  // Initialize with mock data if empty
  const allApplications = jobApplications.length > 0 ? jobApplications : mockJobApplications;

  const filteredApplications = allApplications.filter(application => {
    return application.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
           application.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
           application.location.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleExport = () => {
    const csvContent = [
      ['Job Title', 'Company', 'Location', 'Application Date', 'Status'],
      ...allApplications.map(app => [
        app.jobTitle,
        app.company,
        app.location,
        app.applicationDate,
        app.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'job-applications.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };


  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2  mt-10">
              Job Applications 
            </h1>
            <p className="text-gray-400 text-lg">
              Track and manage your job application progress
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline"
              onClick={handleExport}
              className="border-gray-600 text-gray-300 hover:bg-gray-800/50"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button 
              onClick={() => {
                const newJob: JobApplication = {
                  id: Date.now().toString(),
                  jobTitle: '',
                  company: '',
                  location: '',
                  description: '',
                  applicationDate: new Date().toISOString(),
                  timeline: [],
                  notes: '',
                  status: 'Applied' // Default status
                };
                setSelectedJob(newJob);
                setEditForm(newJob);
                setIsEditing(true);
              }}
              className="bg-primary-600 hover:bg-primary-700 text-white flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Job</span>
            </Button>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <GlassCard className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by job title, company, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-primary-500"
              />
            </div>
          </GlassCard>
        </motion.div>

        {/* Applications Grid */}
        <div className="grid gap-6">
          <AnimatePresence>
            {filteredApplications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <GlassCard className="p-12">
                  <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Building className="h-12 w-12 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">
                    {searchTerm ? 'No matching applications' : 'No applications yet'}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {searchTerm 
                      ? 'Try adjusting your search criteria'
                      : 'Start by adding your first job application'
                    }
                  </p>
                  <Button 
                    onClick={() => {
                      const newJob: JobApplication = {
                        id: Date.now().toString(),
                        jobTitle: '',
                        company: '',
                        location: '',
                        description: '',
                        applicationDate: new Date().toISOString(),
                        timeline: [],
                        notes: '',
                        status: 'Applied' // Default status
                      };
                      setSelectedJob(newJob);
                      setEditForm(newJob);
                      setIsEditing(true);
                    }}
                    className="bg-primary-600 hover:bg-primary-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {searchTerm ? 'Add New Application' : 'Add Your First Application'}
                  </Button>
                </GlassCard>
              </motion.div>
            ) : (
              filteredApplications.map((application, index) => (
                <motion.div
                  key={application.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => setSelectedJob(application)}
                  className="cursor-pointer"
                >
                  <GlassCard className="p-6 hover:bg-gray-800/60 transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-1">
                              {application.jobTitle}
                            </h3>
                            <div className="flex items-center space-x-4 text-gray-400 text-sm">
                              <div className="flex items-center space-x-1">
                                <Building className="h-4 w-4" />
                                <span>{application.company}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{application.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>Applied {formatDate(application.applicationDate)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-xs text-gray-400">
                            {formatDate(application.applicationDate)}
                          </div>
                        </div>

                        {application.notes && (
                          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                            {application.notes}
                          </p>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{application.timeline.length} timeline events</span>
                            <span>Last updated {formatDate(application.timeline[application.timeline.length - 1]?.date || application.applicationDate)}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="text-gray-400 hover:text-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (selectedJob) {
                                  handleEditClick(selectedJob);
                                }
                              }}
                            >
                              <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="text-gray-400 hover:text-red-400"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle delete
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Job Detail Modal */}
        <Dialog open={!!selectedJob} onOpenChange={(open) => !open && setSelectedJob(null)}>
          <DialogContent className="max-w-2xl bg-gray-900 border border-gray-700 text-white">
            {selectedJob && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-white flex items-center justify-between">
                    <div>
                      {isEditing ? (
                        <div className="space-y-2">
                          <Input
                            value={editForm.jobTitle || ''}
                            onChange={(e) => setEditForm({...editForm, jobTitle: e.target.value})}
                            placeholder="Job Title"
                            className="text-2xl font-bold bg-gray-800 border-gray-700"
                          />
                          <div className="flex space-x-2">
                            <Input
                              value={editForm.company || ''}
                              onChange={(e) => setEditForm({...editForm, company: e.target.value})}
                              placeholder="Company"
                              className="flex-1 bg-gray-800 border-gray-700"
                            />
                            <Input
                              value={editForm.location || ''}
                              onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                              placeholder="Location"
                              className="flex-1 bg-gray-800 border-gray-700"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center space-x-3">
                            <span>{selectedJob.jobTitle}</span>
                            <div className="text-sm text-gray-400">
                              Applied on {formatDate(selectedJob.applicationDate)}
                            </div>
                          </div>
                          <p className="text-lg text-gray-400 font-normal mt-1">
                            {selectedJob.company} • {selectedJob.location}
                          </p>
                        </>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      {isEditing ? (
                        <Button onClick={handleSave} size="sm">
                          Save
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => handleEditClick(selectedJob)}
                          variant="outline" 
                          size="sm"
                        >
                          <Edit3 className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      )}
                    </div>
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="font-semibold text-white mb-2">Job Description</h3>
                    {isEditing ? (
                      <Textarea
                        value={editForm.description || ''}
                        onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                        className="min-h-[100px] bg-gray-800 border-gray-700 text-gray-300"
                        placeholder="Enter job description..."
                      />
                    ) : (
                      <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                        {selectedJob.description || 'No description provided'}
                      </p>
                    )}
                  </div>

                  {/* Notes */}
                  {selectedJob.notes && (
                    <div>
                      <h3 className="font-semibold text-white mb-2">Notes</h3>
                      <p className="text-gray-300 text-sm">
                        {selectedJob.notes}
                      </p>
                    </div>
                  )}

                  {/* Timeline */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-white">Application Timeline</h3>
                      {isEditing && (
                        <div className="flex space-x-2">
                          <Input
                            type="date"
                            value={newTimelineEvent.date}
                            onChange={(e) => setNewTimelineEvent({...newTimelineEvent, date: e.target.value})}
                            className="h-8 text-xs bg-gray-800 border-gray-700"
                          />
                          <Input
                            value={newTimelineEvent.event}
                            onChange={(e) => setNewTimelineEvent({...newTimelineEvent, event: e.target.value})}
                            placeholder="Event title"
                            className="h-8 text-xs bg-gray-800 border-gray-700"
                          />
                          <Button 
                            onClick={handleTimelineAdd}
                            size="sm"
                            className="h-8"
                            disabled={!newTimelineEvent.event}
                          >
                            Add Event
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="space-y-3">
                      {selectedJob.timeline.length === 0 ? (
                        <p className="text-gray-500 text-sm">
                          {isEditing ? 'Add events to track your application progress' : 'No timeline events yet'}
                        </p>
                      ) : (
                        selectedJob.timeline.map((event, index) => (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="group flex items-start space-x-3"
                          >
                            <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                {isEditing ? (
                                  <div className="flex-1 flex space-x-2">
                                    <Input
                                      value={event.event}
                                      onChange={(e) => {
                                        const updatedTimeline = [...selectedJob.timeline];
                                        updatedTimeline[index] = {
                                          ...event,
                                          event: e.target.value
                                        };
                                        setSelectedJob({
                                          ...selectedJob,
                                          timeline: updatedTimeline
                                        });
                                      }}
                                      className="h-6 text-sm bg-gray-800 border-gray-700"
                                    />
                                  </div>
                                ) : (
                                  <h4 className="font-medium text-white text-sm">{event.event}</h4>
                                )}
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-gray-500">
                                    {formatDate(event.date)}
                                  </span>
                                  {isEditing && (
                                    <button
                                      onClick={() => handleTimelineDelete(event.id)}
                                      className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  )}
                                </div>
                              </div>
                              {isEditing ? (
                                <Input
                                  value={event.description}
                                  onChange={(e) => {
                                    const updatedTimeline = [...selectedJob.timeline];
                                    updatedTimeline[index] = {
                                      ...event,
                                      description: e.target.value
                                    };
                                    setSelectedJob({
                                      ...selectedJob,
                                      timeline: updatedTimeline
                                    });
                                  }}
                                  className="mt-1 h-8 text-xs bg-gray-800 border-gray-700"
                                  placeholder="Event description (optional)"
                                />
                              ) : (
                                <p className="text-gray-400 text-sm">{event.description}</p>
                              )}
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                    <Button 
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800/50"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Application
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-red-600 text-red-400 hover:bg-red-600/10"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}