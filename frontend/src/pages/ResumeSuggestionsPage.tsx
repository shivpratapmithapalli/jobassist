import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { 
  Upload, 
  FileText, 
  Brain, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Download,
  RefreshCw,
  Zap,
  Target
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { GlassCard } from '../components/ui/glass-card';
import { useStore } from '../store/useStore';
import { getImpactColor } from '../lib/utils';
import { mockAISuggestions } from '../data/mockData';
import { UploadedResume, AIsuggestion } from '../types';

const categoryIcons = {
  Skills: Target,
  Experience: TrendingUp,
  Education: Brain,
  Formatting: FileText,
  Keywords: Zap
};

export function ResumeSuggestionsPage() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { uploadedResume, setUploadedResume } = useStore();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadProgress(0);
      setIsAnalyzing(true);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            
            // Simulate AI analysis delay
            setTimeout(() => {
              const newResume: UploadedResume = {
                file,
                uploadDate: new Date().toISOString(),
                suggestions: mockAISuggestions
              };
              setUploadedResume(newResume);
              setIsAnalyzing(false);
            }, 2000);
            
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);
    }
  }, [setUploadedResume]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1
  });

  const handleReanalyze = () => {
    if (uploadedResume) {
      setIsAnalyzing(true);
      
      setTimeout(() => {
        const updatedResume: UploadedResume = {
          ...uploadedResume,
          suggestions: [...mockAISuggestions, ...mockAISuggestions.slice(0, 2)] // Add more suggestions
        };
        setUploadedResume(updatedResume);
        setIsAnalyzing(false);
      }, 3000);
    }
  };

  const getSuggestionsByCategory = (suggestions: AIsuggestion[]) => {
    const grouped = suggestions.reduce((acc, suggestion) => {
      if (!acc[suggestion.category]) {
        acc[suggestion.category] = [];
      }
      acc[suggestion.category].push(suggestion);
      return acc;
    }, {} as Record<string, AIsuggestion[]>);
    
    return grouped;
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Resume AI Assistant 🤖
          </h1>
          <p className="text-gray-400 text-lg">
            Upload your resume to get intelligent suggestions powered by AI
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Upload Panel */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Resume
                </h2>

                {!uploadedResume ? (
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
                      isDragActive
                        ? 'border-primary-500 bg-primary-500/10'
                        : 'border-gray-600 hover:border-gray-500 bg-gray-800/20'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-primary-600/20 rounded-full flex items-center justify-center mb-4">
                        <Upload className="h-8 w-8 text-primary-400" />
                      </div>
                      <h3 className="text-lg font-medium text-white mb-2">
                        {isDragActive ? 'Drop your resume here' : 'Upload your resume'}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Supports PDF and DOCX files up to 10MB
                      </p>
                      <Button className="bg-primary-600 hover:bg-primary-700">
                        Choose File
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Current Resume */}
                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <FileText className="h-8 w-8 text-primary-400" />
                        <div className="flex-1">
                          <h3 className="font-medium text-white">{uploadedResume.file.name}</h3>
                          <p className="text-sm text-gray-400">
                            {(uploadedResume.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-xs text-green-400">Analyzed</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-800/50"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button 
                          size="sm"
                          onClick={handleReanalyze}
                          disabled={isAnalyzing}
                          className="bg-primary-600 hover:bg-primary-700"
                        >
                          {isAnalyzing ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Re-analyze
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Upload Progress */}
                    <AnimatePresence>
                      {uploadProgress > 0 && uploadProgress < 100 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2"
                        >
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">Uploading...</span>
                            <span className="text-gray-300">{Math.round(uploadProgress)}%</span>
                          </div>
                          <Progress value={uploadProgress} className="bg-gray-800" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Upload New File */}
                    <div className="pt-4 border-t border-gray-700">
                      <div
                        {...getRootProps()}
                        className="border border-dashed border-gray-700 rounded-lg p-4 text-center cursor-pointer hover:border-gray-600 transition-colors"
                      >
                        <input {...getInputProps()} />
                        <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-400">
                          Upload a new resume to replace the current one
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          </div>

          {/* Suggestions Panel */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <Brain className="h-5 w-5 mr-2" />
                    AI Suggestions
                  </h2>
                  {uploadedResume && (
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>{uploadedResume.suggestions.length} suggestions found</span>
                    </div>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {isAnalyzing ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-16"
                    >
                      <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mb-6" />
                      <h3 className="text-lg font-medium text-white mb-2">Analyzing your resume...</h3>
                      <p className="text-gray-400 text-center max-w-md">
                        Our AI is examining your resume for optimization opportunities. This usually takes a few moments.
                      </p>
                    </motion.div>
                  ) : !uploadedResume ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-16"
                    >
                      <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mb-6">
                        <FileText className="h-12 w-12 text-gray-500" />
                      </div>
                      <h3 className="text-lg font-medium text-white mb-2">No resume uploaded yet</h3>
                      <p className="text-gray-400 text-center max-w-md">
                        Upload your resume to the left to get personalized AI-powered suggestions for improvement.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      {/* Summary */}
                      <div className="p-4 bg-gradient-to-r from-primary-900/20 to-secondary-900/20 rounded-lg border border-primary-500/30">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                            <TrendingUp className="h-4 w-4 text-white" />
                          </div>
                          <h3 className="font-semibold text-white">Resume Analysis Summary</h3>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-red-400">
                              {uploadedResume.suggestions.filter(s => s.impact === 'High').length}
                            </div>
                            <div className="text-xs text-gray-400">High Impact</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-400">
                              {uploadedResume.suggestions.filter(s => s.impact === 'Medium').length}
                            </div>
                            <div className="text-xs text-gray-400">Medium Impact</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">
                              {uploadedResume.suggestions.filter(s => s.impact === 'Low').length}
                            </div>
                            <div className="text-xs text-gray-400">Low Impact</div>
                          </div>
                        </div>
                      </div>

                      {/* Suggestions by Category */}
                      {Object.entries(getSuggestionsByCategory(uploadedResume.suggestions)).map(([category, suggestions], categoryIndex) => {
                        const Icon = categoryIcons[category as keyof typeof categoryIcons];
                        
                        return (
                          <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                          >
                            <div className="p-4 bg-gray-800/30 rounded-lg">
                              <div className="flex items-center space-x-3 mb-4">
                                <Icon className="h-5 w-5 text-primary-400" />
                                <h3 className="font-medium text-white">{category}</h3>
                                <span className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full">
                                  {suggestions.length} suggestions
                                </span>
                              </div>

                              <div className="space-y-3">
                                {suggestions.map((suggestion, index) => (
                                  <motion.div
                                    key={suggestion.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.05 }}
                                    className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
                                  >
                                    <div className="flex items-start space-x-3">
                                      <AlertCircle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${getImpactColor(suggestion.impact)}`} />
                                      <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                          <h4 className="font-medium text-white text-sm">{suggestion.recommendation}</h4>
                                          <span className={`text-xs font-medium ${getImpactColor(suggestion.impact)}`}>
                                            {suggestion.impact}
                                          </span>
                                        </div>
                                        <p className="text-gray-400 text-sm">{suggestion.description}</p>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}