import { SignUp } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { BarChart, PieChart, TrendingUp, Target, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-satoshi relative overflow-hidden">
      <motion.div
        className="lg:w-1/2 bg-primary relative overflow-hidden min-h-screen"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="/placeholder.svg?height=1080&width=1920"
          alt="Abstract background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 flex flex-col items-center justify-center">
          <motion.img
            src="/logo/SWEVEN_LOGO.png"
            alt="Sweven Logo"
            className="w-64 h-auto mb-8"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.h1
            className="text-white text-5xl font-bold text-center px-4 leading-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Join Our
          </motion.h1>
          <motion.span
            className="text-white text-6xl font-extrabold text-center px-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-secondary to-warning"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            AdTech Platform
          </motion.span>
        </div>
      </motion.div>

      <motion.div
        className="flex-1 flex items-center justify-center p-4 lg:p-8 bg-gray-2"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="w-full max-w-125 p-7.5 rounded-2xl relative z-10">
          <h2 className="text-title-md2 font-bold text-center mb-6 text-black">
            Sign Up for Your Sweven Dashboard
          </h2>
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary:
                  'bg-primary hover:bg-primary/90 text-sm normal-case',
                card: 'shadow-none',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                socialButtonsBlockButton:
                  'border-2 border-stroke hover:bg-gray-2 dark:border-strokedark dark:hover:bg-boxdark-2',
                formFieldInput:
                  'rounded-md border-2 border-stroke focus:border-primary focus:ring-primary dark:border-strokedark dark:bg-boxdark',
                footerActionLink: 'hidden',
              },
            }}
            redirectUrl="/login-options"
          />
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{' '}
            </span>
            <Link
              to="/auth/sign-in"
              className="text-sm text-primary hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </motion.div>

      {/* AdTech-themed background elements */}
      <motion.div
        className="hidden lg:block absolute top-10 left-10 text-secondary opacity-20"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <BarChart size={60} />
      </motion.div>
      <motion.div
        className="hidden lg:block absolute bottom-10 right-10 text-warning opacity-20"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <PieChart size={60} />
      </motion.div>
      <motion.div
        className="hidden lg:block absolute top-1/2 right-10 text-meta-5 opacity-20"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <TrendingUp size={40} />
      </motion.div>

      <motion.div
        className="hidden lg:block absolute top-1/4 left-1/4 text-secondary opacity-10"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Target size={80} />
      </motion.div>
      <motion.div
        className="hidden lg:block absolute bottom-1/4 right-1/4 text-warning opacity-10"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Zap size={50} />
      </motion.div>

      {/* AdTech-themed SVG shapes */}
      <svg
        className="hidden lg:block absolute top-20 right-1/4"
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30 0L60 30L30 60L0 30L30 0Z"
          fill="#3056D3"
          fillOpacity="0.1"
        />
      </svg>

      <svg
        className="hidden lg:block absolute bottom-20 left-1/4"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M40 0C62.0914 0 80 17.9086 80 40C80 62.0914 62.0914 80 40 80C17.9086 80 0 62.0914 0 40C0 17.9086 17.9086 0 40 0ZM40 20C28.9543 20 20 28.9543 20 40C20 51.0457 28.9543 60 40 60C51.0457 60 60 51.0457 60 40C60 28.9543 51.0457 20 40 20Z"
          fill="#F59E0B"
          fillOpacity="0.1"
        />
      </svg>
    </div>
  );
};

export default SignUpPage;
