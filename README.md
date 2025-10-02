# JobHive - AI-Powered Job Application Assistant

A comprehensive job application management platform built with React, TypeScript, and modern web technologies. JobHive helps job seekers track applications, get AI-powered resume suggestions, and manage their career journey with a beautiful glassmorphism dark theme.

## ✨ Features

### Core Functionality
- **Dashboard Overview**: Quick stats, recent activity, and application tracking
- **Profile Management**: Comprehensive user profiles with skills, education, and links
- **Resume AI Assistant**: Upload resumes and get intelligent optimization suggestions
- **Job Application Tracking**: Complete application lifecycle management with timelines
- **Authentication System**: Secure login/signup with form validation

### Design & User Experience
- **Dark Glassmorphism Theme**: Modern aesthetic with backdrop blur effects
- **Responsive Design**: Mobile-first approach with optimized breakpoints
- **Smooth Animations**: Framer Motion powered micro-interactions
- **Professional UI**: shadcn/ui components with consistent design system

### Technical Highlights
- **TypeScript**: Full type safety across the application
- **State Management**: Zustand with persistent storage
- **File Upload**: React Dropzone for resume processing
- **Modern React**: Hooks, Context API, and functional components
- **Performance**: Optimized with proper code splitting and lazy loading

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd job-application-assistant
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Default Login Credentials
For testing purposes, you can use any email/password combination. The app uses mock authentication.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── Layout.tsx          # Main layout wrapper
│   ├── Navbar.tsx          # Navigation component
│   └── common/             # Reusable components
├── pages/
│   ├── LandingPage.tsx     # Marketing landing page
│   ├── LoginPage.tsx       # Authentication
│   ├── DashboardPage.tsx   # Main dashboard
│   ├── ProfilePage.tsx     # User profile management
│   ├── ResumeSuggestionsPage.tsx  # AI resume analysis
│   └── JobListPage.tsx     # Application tracking
├── store/
│   └── useStore.ts         # Zustand state management
├── types/
│   └── index.ts            # TypeScript interfaces
├── data/
│   └── mockData.ts         # Sample data for demo
├── lib/
│   └── utils.ts            # Utility functions
└── styles/
    └── index.css           # Global styles
```

## 🎨 Design System

### Colors
- **Primary**: Deep blue (#4F46E5) - Professional and trustworthy
- **Secondary**: Teal (#14B8A6) - Fresh and modern
- **Accent**: Orange (#F97316) - Calls attention to important actions
- **Background**: Dark grays with gradients for depth

### Typography
- **Font Family**: Inter for readability and modern appeal
- **Font Weights**: Light (300), Medium (500), Bold (700)
- **Line Heights**: 150% for body text, 120% for headings

### Components
- **Glass Cards**: Semi-transparent backgrounds with backdrop blur
- **Animations**: Fade, slide, and scale transitions
- **Responsive**: Breakpoints at 768px (tablet) and 1024px (desktop)

## 🔧 Technologies Used

- **React 18+** - Modern React with hooks and functional components
- **TypeScript** - Type safety and enhanced developer experience  
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for smooth interactions
- **shadcn/ui** - High-quality, accessible UI components
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing
- **React Dropzone** - File upload functionality
- **Lucide React** - Beautiful icon library

## 📱 Responsive Breakpoints

- **Mobile**: < 768px - Stack layouts, simplified navigation
- **Tablet**: 768px - 1024px - Optimized for touch interactions
- **Desktop**: > 1024px - Full feature layouts with sidebars

## 🎯 Key Features Detail

### 1. Dashboard
- Application statistics and progress tracking
- Recent activity timeline
- Quick action buttons
- Visual progress indicators

### 2. Profile Management
- Personal and professional information
- Dynamic skill and education management
- Professional links integration
- Auto-save functionality

### 3. Resume AI Assistant
- Drag-and-drop file upload
- AI-powered analysis simulation
- Categorized suggestions (Skills, Experience, Keywords, etc.)
- Impact level indicators (High, Medium, Low)

### 4. Job Application Tracking
- Complete application lifecycle
- Status-based filtering and search
- Detailed timeline views
- Export functionality (CSV)

### 5. Authentication
- Form validation with real-time feedback
- Password visibility toggles
- Social login placeholders
- Responsive design

## 🔒 Security & Privacy

- Client-side form validation
- Secure state management
- No sensitive data persistence
- HTTPS ready for production deployment

## 🚀 Production Deployment

The application is production-ready with:
- Optimized build process
- Environment variable support
- SEO-friendly structure
- Progressive Web App capabilities

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- **shadcn/ui** for the excellent component library
- **Tailwind CSS** for the utility-first approach
- **Framer Motion** for smooth animations
- **Lucide** for beautiful icons
- **React Community** for continuous innovation

---

Built with ❤️ for job seekers worldwide. Good luck with your job search! 🚀