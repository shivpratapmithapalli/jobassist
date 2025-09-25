import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Mail, ArrowLeft, Briefcase } from 'lucide-react';
import { GlassCard } from '../components/ui/glass-card';
import { Button } from '../components/ui/button';

export function EmailConfirmationPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || 'your email';
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-6">
      {/* Background elements */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-secondary-900/20 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md relative z-10"
      >
        <GlassCard className="p-8 text-center">
          {/* Logo */}
          <div className="mb-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Briefcase className="h-5 w-5 text-primary-400" />
              <span className="text-xl font-bold text-white">JobAssist</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-4">
              Check Your Email
            </h1>
            <p className="text-gray-300 mb-4">
              We've sent a confirmation link to:
            </p>
            <p className="text-primary-400 font-medium mb-6 break-all">
              {email}
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Please check your email and click the confirmation link to activate your account. 
              Don't forget to check your spam or junk folder if you don't see the email in your inbox.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <div className="text-sm text-gray-500 mb-4">
              Didn't receive the email? Check your spam folder or try signing up again.
            </div>
            
            <Link to="/login" replace>
              <Button 
                variant="outline"
                className="w-full border-gray-600 bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Button>
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-8 pt-6 border-t border-gray-700/50">
            <p className="text-xs text-gray-500">
              Need help? Contact us at{' '}
              <a href="mailto:support@jobassist.com" className="text-primary-400 hover:text-primary-300">
                support@jobassist.com
              </a>
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}