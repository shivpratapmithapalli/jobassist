import { motion } from 'framer-motion';
import { 
  Briefcase, 
  FileText, 
  TrendingUp, 
  Users, 
  Plus,
  Calendar,
  Clock,
  Target
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { GlassCard } from '../components/ui/glass-card';
import { useStore } from '../store/useStore';
import { formatDate } from '../lib/utils';

const quickStats = [
  {
    icon: Briefcase,
    label: 'Applications',
    value: '12',
    change: '+3 this week',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Calendar,
    label: 'Interviews',
    value: '3',
    change: '2 scheduled',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: TrendingUp,
    label: 'Response Rate',
    value: '25%',
    change: '+5% this month',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Target,
    label: 'Goal Progress',
    value: '60%',
    change: '6/10 applications',
    color: 'from-orange-500 to-red-500'
  }
];

const recentActivity = [
  {
    type: 'application',
    title: 'Applied to Senior Frontend Developer at TechCorp Inc.',
    time: '2 hours ago',
    icon: Briefcase
  },
  {
    type: 'interview',
    title: 'Interview scheduled with StartupXYZ',
    time: '1 day ago',
    icon: Calendar
  },
  {
    type: 'resume',
    title: 'Resume updated with new AI suggestions',
    time: '3 days ago',
    icon: FileText
  },
  {
    type: 'network',
    title: 'Connected with 3 new professionals',
    time: '1 week ago',
    icon: Users
  }
];

export function DashboardPage() {
  const { user, jobApplications } = useStore();
  
  const recentApplications = jobApplications
    .sort((a, b) => new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Welcome back, {user?.name || 'User'}! 👋
          </h1>
          <p className="text-gray-400 text-lg">
            Here's what's happening with your job search today
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="p-6 hover:bg-gray-800/60 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                      <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                      <p className="text-sm text-green-400 mt-1">{stat.change}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Applications */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">Recent Applications</h2>
                  <Button size="sm" className="bg-primary-600 hover:bg-primary-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                  </Button>
                </div>

                <div className="space-y-4">
                  {recentApplications.map((application, index) => (
                    <motion.div
                      key={application.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-white">{application.jobTitle}</h3>
                        <p className="text-gray-400 text-sm">{application.company}</p>
                        <p className="text-gray-500 text-xs mt-1">
                          Applied {formatDate(application.applicationDate)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          application.status === 'Applied' ? 'bg-blue-500/20 text-blue-400' :
                          application.status === 'Interview' ? 'bg-yellow-500/20 text-yellow-400' :
                          application.status === 'Rejected' ? 'bg-red-500/20 text-red-400' :
                          application.status === 'Offer' ? 'bg-green-500/20 text-green-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {application.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {recentApplications.length === 0 && (
                    <div className="text-center py-12">
                      <Briefcase className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400 mb-4">No applications yet</p>
                      <Button className="bg-primary-600 hover:bg-primary-700">
                        Add Your First Application
                      </Button>
                    </div>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Activity Feed */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
                
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => {
                    const Icon = activity.icon;
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-8 h-8 bg-primary-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon className="h-4 w-4 text-primary-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white">{activity.title}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Clock className="h-3 w-3 text-gray-500" />
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </GlassCard>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6"
            >
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
                
                <div className="space-y-3">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50"
                  >
                    <Plus className="h-4 w-4 mr-3" />
                    Add New Application
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50"
                  >
                    <FileText className="h-4 w-4 mr-3" />
                    Update Resume
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50"
                  >
                    <Calendar className="h-4 w-4 mr-3" />
                    Schedule Interview
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50"
                  >
                    <Users className="h-4 w-4 mr-3" />
                    Expand Network
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}